import React, { useState } from 'react'
import { Collapse, Tag, Row, Col } from 'antd'
const { Panel } = Collapse

const SetupFilters = ({filters, charClassChoices, teamClassChoices, bossNameChoices, toggleFilter, filterValues}) => {
  const filterChoices = {
    user: ['Me', 'Others'],
    status: ['Published', 'Draft'],
    bossNames: bossNameChoices.sort(),
    charClass: charClassChoices,
    teamClass: teamClassChoices.sort(),
  }

  const filterNames = {
    user: 'Created by',
    status: 'Status',
    bossNames: 'Boss Name',
    charClass: 'Character Class',
    teamClass: 'Team Classes'
  }
  console.log(filterValues)

  return (
    <Collapse ghost expandIconPosition='left'>
      {filters.map((filter, idx) => (
        <Panel header={filterNames[filter]} key={idx}>
          <Row gutter={[4, 12]}>
          {filterChoices[filter].map((choice, idx) => (
            <Col key={idx}>
              <Tag 
                color={filterValues[filter].includes(choice) ? '#1890ff' : 'default'}
                onClick={() => toggleFilter(filter, choice)}
              >
                {choice}
              </Tag>
            </Col>
          ))}
          </Row>
        </Panel>
      ))}
    </Collapse>
  )
}

export default SetupFilters