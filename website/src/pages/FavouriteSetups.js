import React, { useEffect, useState } from 'react'
import SetupResult from '../components/SetupResult'
import { Select, Row, Col, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import Setup from '../Models/Setup'
import Interaction from '../Models/Interaction'
import { userState } from '../states/atoms'
import { useRecoilValue } from 'recoil'

const FavouriteSetups = () => {

  function handleSortChange(e) {
      console.log(e)
  }

  const currUser = useRecoilValue(userState)
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(true)

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
    console.log('got to useractions')
    e.stopPropagation()
    const interactionData = {boss_setup: id, user: currUser.uid}
    console.log(currUser)
    console.log(interactionData)
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
      console.log(response)
      updateResults(id, response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getFavourites = async() => {
      try {
        const results = await Setup.Favourite()
        setResults(results.data)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    getFavourites()
  }, [])

  return (
      <>
      {isLoading ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /> :
      <>
      <div style={{padding: '0px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <div>{results.length} Results</div>
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

export default FavouriteSetups