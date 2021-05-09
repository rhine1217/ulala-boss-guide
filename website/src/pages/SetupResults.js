import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import SetupResult from '../components/SetupResult'
import { PageHeader, Select, Row, Col, Spin, Drawer } from 'antd'
import { LoadingOutlined, MenuOutlined } from '@ant-design/icons'
import Setup from '../Models/Setup'
import Interaction from '../Models/Interaction'
import { userState } from '../states/atoms'
import { useRecoilValue } from 'recoil'
import ClassSelection from '../components/ClassSelection'
import SetupFilters from '../components/SetupFilters'

const SetupResults = ({context}) => {

  function handleSortChange(e) {
      console.log(e)
  }

  let history = useHistory(), location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const currentUser = useRecoilValue(userState)
  const [results, setResults] = useState([])
  const [filteredResults, setFilteredResults] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDrawerVisible, setIsDrawerVisible] = useState(false)
  const bossName = searchParams.get("name") || ""
  const filterValues = {
    user: searchParams.get("createdBy") ? searchParams.get("createdBy").split(';') : [],
    status: searchParams.get("status") ? searchParams.get("status").split(';') : [],
    bossNames: searchParams.get("bossNames") ? searchParams.get("bossNames").split(';') : [],
    charClass: searchParams.get("charClass") ? searchParams.get("charClass").split(';') : [],
    teamClass: searchParams.get("teamClass") ? searchParams.get("teamClass").split(';') : [],
  }

  const filterMethods = {
    user: (results, filterValues) => {
      switch(filterValues) {
        case ['Me']:
          return results.filter(result => result['created_by'] === currentUser.username)
        case ['Others']:
          return results.filter(result => result['created_by'] !== currentUser.username)
        default:
          return results
      }
    },
    status: (results, filterValues) => results.filter(result => filterValues.includes(result.status)),
    bossNames: (results, filterValues) => results.filter(result => filterValues.includes(result.boss.name)),
    charClass: (results, filterValues) => results.filter(result => result['player_classes'].some(playerClass => filterValues.includes(playerClass))),
    teamClass: (results, filterValues) => results.filter(result => filterValues.includes(result['player_classes'].join(', ').sort()))
  }

  const pageHeader = {
    favourites: 'Favourite Setups',
    searchName: bossName,
  }
  const setupFilters = {
    favourites: ['user', 'status', 'bossName', 'charClass', 'teamClass'],
    searchName: ['user', 'charClass', 'teamClass']
  }

  const filterResults = () => {
    const newResults = [...results]
    for (const [key, value] of Object.entries(filterValues)) {
      if (value.length > 0) {
        setFilteredResults(filterMethods[key](newResults, value))
      }
    }
  }

  const toggleFilter = (filter, choice) => {
    let oldParamsStr = searchParams.get(filter) || ''
    let oldParams = [], newParams = []
    if (oldParamsStr) {
      oldParams = oldParamsStr.split(';')
      let idx = oldParams.indexOf(choice)
      idx === -1 ? oldParams.push(choice) : oldParams.splice(idx)
      newParams = oldParams
    } else {
      newParams.push(choice)
    }
    if (newParams.length === 0) {
      searchParams.delete(filter)
    } else {
      searchParams.set(filter, newParams.join(';'))
    }
    history.push({
      pathname: location.pathname,
      search: "?" + searchParams.toString()
    })
  }

  const getCharClassChoices = (results) => [...new Set(results.map(result => result['player_classes']).flat())]
  const getTeamClassChoices = (results) => [...new Set(results.map(result => result['player_classes']))]
  const getBossNameChoices = (results) => [...new Set(results.map(result => result['boss']['name']))]

  const updateResults = (id, response) => {
    const status = response.status
    const data = response.data
    const newResults = [...results]
    const idxToUpdate = newResults.findIndex(result => result.id === id)
    if (status === 200 || status === 201) {
      newResults[idxToUpdate] = data
    } else if (status === 204) {
      newResults.splice(idxToUpdate, 1)
    }
    setResults(newResults)
  }

  const userActions = async (e, id, action) => {
    e.stopPropagation()
    const interactionData = {boss_setup: id, user: currentUser.id}
    const actionList = {
      onPublish: async () => Setup.Edit(id, {bossSetup: { id, status: 'P' }, playerSetups: null}),
      onDelete: async() => Setup.Destroy(id),
      onLike: async() => Interaction.Like(interactionData, false),
      onUnlike: async() => Interaction.Unlike(id, false),
      onFavourite: async() => Interaction.Favourite(interactionData, false),
      onUnfavourite: async() => Interaction.Unfavourite(id, false)
    }
    try {
      const response = await actionList[action]()
      updateResults(id, response)
    } catch (error) {
      console.log(error)
    }
  }

  const getSetups = async (context) => {
    const queryList = {
      favourites: async() => Setup.Favourite(),
      searchName: async() => Setup.List(bossName)
    }
    try {
      const response = await queryList[context]()
      setResults(response.data)
      setFilteredResults(response.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getSetups(context)
  }, [])

  return (
      <>
      {isLoading ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /> :
      <>
      <PageHeader 
        title={pageHeader[context]} 
        subTitle={`${results.length} Result${results.length > 1 ? 's' : ''}`}
        backIcon={<MenuOutlined />}
        onBack={() => setIsDrawerVisible(true)}
        extra={[
          <div key="1">Sort by: 
          <Select defaultValue="top-rated" style={{width: 120, fontSize: '1em'}} onChange={handleSortChange} bordered={false}>
              <Select.Option value="top-rated">Top Rated</Select.Option>
              <Select.Option value="most-recent">Most Recent</Select.Option>
          </Select>
          </div>
        ]} />
      {context === 'searchName' ? <div style={{padding: '16px 24px 0px'}}><ClassSelection context="search" /></div> : <></>}
      <div style={{padding: '16px 24px'}}>
        <Row gutter={[16, 16]}>
            {results.map(result => (
              <Col xs={24} sm={12} lg={8} key={result.id} >
                <SetupResult result={result} userActions={userActions} />
              </Col>
            ))}
        </Row>
      </div>
      <Drawer
        title="Filter by"
        placement="right"
        closable={false}
        onClose={() => setIsDrawerVisible(false)}
        visible={isDrawerVisible}
        width={300}
      >
        <SetupFilters 
          filters={setupFilters[context]}
          charClassChoices={results ? getCharClassChoices(results) : []}
          teamClassChoices={results ? getTeamClassChoices(results) : []}
          bossNameChoices={context === 'favourites' && results ? getBossNameChoices(results) : []}
          toggleFilter={toggleFilter}
        />
        <div style={{padding: '12px 16px'}}>
          Reset all filters
        </div>
      </Drawer>
      </>
      }
      </>
  )

}

export default SetupResults