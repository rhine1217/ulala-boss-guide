import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import SetupResult from '../components/SetupResult'
import { PageHeader, Select, Row, Col, Card, Spin, Drawer, Button } from 'antd'
import { LoadingOutlined, MenuOutlined } from '@ant-design/icons'
import Setup from '../Models/Setup'
import Interaction from '../Models/Interaction'
import { userState } from '../states/atoms'
import { useRecoilValue } from 'recoil'
import SetupFilters from '../components/SetupFilters'
import { getFilterValues, filterMethods, filterNames, getFilterChoices, sortMethods } from '../utils/setupFilterSort'

const SetupResults = ({context}) => {

  let history = useHistory(), location = useLocation()
  const [searchParams, setSearchParams] = useState(new URLSearchParams(location.search))
  const [filterValues, setFilterValues] = useState(getFilterValues(searchParams))
  const currentUser = useRecoilValue(userState)
  const [results, setResults] = useState([])
  const [filteredResults, setFilteredResults] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDrawerVisible, setIsDrawerVisible] = useState(false)
  const bossName = searchParams.get("name") || ""
  const [sortValue, setSortValue] = useState('most-recent')

  const pageHeader = {
    favourites: 'Favourite Setups',
    searchName: bossName,
    allSetups: 'All Setups'
  }

  const setupFilters = {
    favourites: ['user', 'status', 'bossNames', 'charClass', 'teamClass'],
    searchName: ['user', 'charClass', 'teamClass'],
    allSetups: ['user', 'bossNames', 'charClass', 'teamClass'],
  }

  const filterResults = (results, filterValues) => {
    const newResults = [...results]
    for (const [key, value] of Object.entries(filterValues)) {
      if (value.length > 0) {
        setFilteredResults(sortMethods[sortValue](filterMethods[key](newResults, value, currentUser)))
      }
    }
  }

  const sortResults = (results, sortValue) => {
    const newResults = [...results]
    sortMethods[sortValue](newResults)
    setFilteredResults(newResults)
  }

  const handleSortChange = (value) => {
    setSortValue(value)
    sortResults(filteredResults, value)
  }

  const refreshResultsState = (results, filterValues) => {
    if (Object.values(filterValues).every(item => item.length === 0)) {
      sortResults(results, sortValue)
    } else {
      filterResults(results, filterValues)
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
    setSearchParams(searchParams)
    const newFilterValues = getFilterValues(searchParams)
    setFilterValues(newFilterValues)
    refreshResultsState(results, newFilterValues)
  }

  const resetFilters = () => {
    history.push({pathname: location.pathname})
    window.location.reload()
  }

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
    refreshResultsState(newResults, filterValues)
  }

  const userActions = async (e, id, action) => {
    e.stopPropagation()
    const interactionData = {boss_setup: id, user: currentUser.id}
    const actionList = {
      onPublish: async () => Setup.Edit(id, {bossSetup: { id, status: 'P', published_on: new Date() }, playerSetups: null}),
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
      searchName: async() => Setup.ListByName(bossName),
      allSetups: async() => Setup.List(),
    }
    try {
      const response = await queryList[context]()
      setResults(response.data)
      refreshResultsState(response.data, filterValues)
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
      <PageHeader 
        title={pageHeader[context]} 
        subTitle={isLoading ? <Spin indicator={<LoadingOutlined spin />} /> : `${filteredResults.length} Result${filteredResults.length > 1 ? 's' : ''}` }
        backIcon={<MenuOutlined />}
        onBack={() => setIsDrawerVisible(true)}
        extra={[
          <div key="1">Sort by: 
          <Select value={sortValue} style={{width: 120, fontSize: '1em'}} onChange={handleSortChange} bordered={false}>
              <Select.Option value="most-recent">Most Recent</Select.Option>
              <Select.Option value="most-popular">Most Popular</Select.Option>
          </Select>
          </div>
        ]} />
      <div style={{padding: '16px 24px'}}>
        <Row gutter={[16, 16]}>
          {isLoading ? 
          <>
          {new Array(8).fill('').map((item, idx) => (
            <Col xs={24} sm={12} lg={8} key={idx}>
              <Card loading={true} />
            </Col>
          ))}</> : <>
            {filteredResults.map(result => (
              <Col xs={24} sm={12} lg={8} key={result.id} >
                <SetupResult context={context} result={result} userActions={userActions} currentUser={currentUser}/>
              </Col>
            ))}</>}
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
          filterNames={filterNames}
          charClassChoices={results ? getFilterChoices['charClass'](filteredResults) : []}
          teamClassChoices={results ? getFilterChoices['teamClass'](filteredResults) : []}
          bossNamesChoices={context !== 'searchName' && filteredResults ? getFilterChoices['bossNames'](filteredResults) : []}
          toggleFilter={toggleFilter}
          filterValues={filterValues}
        />
        <div style={{padding: '12px 16px'}}>
          <Button onClick={resetFilters} type="default">Reset all filters</Button>
        </div>
      </Drawer>
      </>
  )
}

export default SetupResults