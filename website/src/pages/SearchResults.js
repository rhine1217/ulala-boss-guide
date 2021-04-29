import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import BossInput from '../components/BossInput'
import ClassSelection from '../components/ClassSelection'
import SearchResult from '../components/SearchResult'
import { Select, Row, Col } from 'antd'
import Setup from '../Models/Setup'

const SearchResults = () => {

    function useQuery() {
        return new URLSearchParams(useLocation().search)
    }

    function handleSortChange(e) {
        console.log(e)
    }

    let query = useQuery()
    const bossName = query.get("name")

    const [results, setResults] = useState([])

    useEffect(() => {
      const searchByName = async(name) => {
        try {
          const results = await Setup.BossSetupList(name)
          setResults(results.data)
        } catch (error) {
          console.log(error)
        }
      }
      searchByName(bossName)
    }, [])

    return (
        <>
        <div style={{width: '100%', paddingTop: '2rem'}}><BossInput context="search" /></div>
        <ClassSelection context="search" />
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div>{results.length} Results for {bossName}</div>
            <div>Sort: 
        <Select defaultValue="top-rated" style={{width: 120}} onChange={handleSortChange}>
            <Select.Option value="top-rated">Top Rated</Select.Option>
            <Select.Option value="most-recent">Most Recent</Select.Option>
        </Select></div>
            </div>
        <Row>
            <Col xs={24} sm={12} lg={8}>
              {results.map(result => (
                <SearchResult key={result.id} bossName={bossName} result={result} />
              ))}
            </Col>
        </Row>
        </>
    )

}

export default SearchResults