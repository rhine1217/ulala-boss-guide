import React, { useEffect, useState } from 'react'
import SetupResult from '../components/SetupResult'
import { Select, Row, Col, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import Setup from '../Models/Setup'

const FavouriteSetups = () => {

    function handleSortChange(e) {
        console.log(e)
    }

    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(true)

  const onPublish = async (id) => {
    try {
      const response = await Setup.Edit(id, {
        bossSetup: {
          id,
          status: 'P'
        },
        playerSetups: null,
      })
      console.log(response)
      if (response.status === 200) {
        const newResults = [...results]
        const idxToUpdate = newResults.findIndex(result => result.id === id)
        newResults[idxToUpdate] = response.data
        setResults(newResults)
      } else {
        console.log(response.status)
      }
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
                  <SetupResult result={result} onPublish={onPublish} />
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