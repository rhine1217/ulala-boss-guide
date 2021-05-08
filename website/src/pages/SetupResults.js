import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SetupResult from '../components/SetupResult'
import { Select, Row, Col, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import Setup from '../Models/Setup'
import Interaction from '../Models/Interaction'
import { userState } from '../states/atoms'
import { useRecoilValue } from 'recoil'
import ClassSelection from '../components/ClassSelection'

const SetupResults = ({context}) => {

  function handleSortChange(e) {
      console.log(e)
  }

  const currentUser = useRecoilValue(userState)
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const bossName = new URLSearchParams(useLocation().search).get("name") || ""

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
    const interactionData = {boss_setup: id, user: currentUser.uid}
    const actionList = {
      onPublish: async () => Setup.Edit(id, {bossSetup: { id, status: 'P' }, playerSetups: null}),
      onDelete: async() => Setup.Destroy(id),
      onLike: async() => Interaction.Like(interactionData),
      onUnlike: async() => Interaction.Unlike(id),
      onFavourite: async() => Interaction.Favourite(interactionData),
      onUnfavourite: async() => Interaction.Unfavourite(id)
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
      {context === 'searchName' ? <div style={{padding: '16px 24px 0px'}}><ClassSelection context="search" /></div> : <></>}
      <div style={{padding: '0px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <div>
          {results.length} Result{results.length > 1 ? 's' : ''}
          {context === 'searchName' ? <span> for {bossName}</span> : <></>}
        </div>
        <div>Sort by: 
          <Select defaultValue="top-rated" style={{width: 120, fontSize: '1em'}} onChange={handleSortChange} bordered={false}>
              <Select.Option value="top-rated">Top Rated</Select.Option>
              <Select.Option value="most-recent">Most Recent</Select.Option>
          </Select>
        </div>
      </div>
      <div style={{padding: '16px 24px'}}>
        <Row gutter={[16, 16]}>
            {results.map(result => (
              <Col xs={24} sm={12} lg={8} key={result.id} >
                <SetupResult result={result} userActions={userActions} />
              </Col>
            ))}
        </Row>
      </div>
      </>
      }
      </>
  )

}

export default SetupResults