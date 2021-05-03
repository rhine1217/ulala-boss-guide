import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ClassSelection from '../components/ClassSelection'
import SearchResult from '../components/SearchResult'
import { Select, Row, Col } from 'antd'
import Setup from '../Models/Setup'

const SearchResults = () => {

    function handleSortChange(e) {
        console.log(e)
    }

    let query = new URLSearchParams(useLocation().search)
    const bossName = query.get("name")

    const [results, setResults] = useState([])

    useEffect(() => {
      const searchByName = async(name) => {
        try {
          const results = await Setup.List(name)
          console.log(results)
          setResults(results.data)
        } catch (error) {
          console.log(error)
        }
      }
      searchByName(bossName)
    }, [])

    return (
        <>
        <div style={{padding: '16px 24px 0px'}}><ClassSelection context="search" /></div>
        <div style={{padding: '0px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div>{results.length} Results for {bossName}</div>
          <div>Sort by: 
            <Select defaultValue="top-rated" style={{width: 120, fontSize: '1em'}} onChange={handleSortChange} bordered={false}>
                <Select.Option value="top-rated">Top Rated</Select.Option>
                <Select.Option value="most-recent">Most Recent</Select.Option>
            </Select>
          </div>
        </div>
        <div style={{padding: '16px 24px'}}>
          <Row>
              <Col xs={24} sm={12} lg={8}>
                {results.map(result => (
                  <SearchResult key={result.id} bossName={bossName} result={result} />
                  ))}
              </Col>
          </Row>
        </div>
        </>
    )

}

export default SearchResults