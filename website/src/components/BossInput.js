import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Input, AutoComplete } from 'antd'
import Ulala from '../Models/Ulala'

const BossInput = ( {context}) => {

  const [bossList, setBossList] = useState([])
  const [options, setOptions] = useState([]);
  let history = useHistory()

  useEffect(() => {
    const getBossData = async () => {
      try {
        const bossListApi = await Ulala.BossList();
        const newList = []
        bossListApi.data.forEach( item => {
            newList.push({ value: item.name })
        })
        setBossList(newList.sort((a,b) => (a.value > b.value) ? 1 : -1))
      } catch (error) {
        console.log(error)
      }
    }

    getBossData()
    
  }, [])

  const onSelect = (data) => {
    if (context === 'search') {
      history.push(`/boss?name=${encodeURI(data)}`)
    } 
  }
  
  const onSearch = (text) => {
    !text ? setOptions([]) : setOptions(bossList || ['Loading...'])
  }

  return (
    <AutoComplete
      style={{ width: 500, maxWidth: '100%' }}
      options={options}
      onSelect={onSelect}
      onSearch={onSearch}
      filterOption={(inputValue, option) =>
        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
    }>
      {context === 'search' ? 
        <Input.Search size="large" placeholder="Type in Boss name to search for setup" /> :
        <Input placeholder="Type in Boss name and select from dropdown" />
      }
    </AutoComplete>
  
  )

}

export default BossInput