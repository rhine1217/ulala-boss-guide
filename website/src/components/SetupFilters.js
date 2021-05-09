import React, { useState } from 'react'
import { Collapse, Tag, Row, Col } from 'antd'
const { Panel } = Collapse

const SetupFilters = ({filters, charClassChoices, teamClassChoices, bossNameChoices, toggleFilter}) => {
  const filterChoices = {
    user: ['Me', 'Others'],
    status: ['Published', 'Draft'],
    bossName: bossNameChoices.sort(),
    charClass: charClassChoices,
    teamClass: teamClassChoices.map(choice => choice.join(', ')).sort(),
  }

  const filterNames = {
    user: 'Created by',
    status: 'Status',
    bossName: 'Boss Name',
    charClass: 'Character Class',
    teamClass: 'Team Classes'
  }

  return (
    <Collapse ghost expandIconPosition='left'>
      {filters.map((filter, idx) => (
        <Panel header={filterNames[filter]} key={idx}>
          <Row gutter={[4, 12]}>
          {filterChoices[filter].map((choice, idx) => (
            <Col key={idx}>
              <Tag onClick={() => toggleFilter(filter, choice)}>{choice}</Tag>
            </Col>
          ))}
          </Row>
        </Panel>
      ))}
    </Collapse>
  )
}

export default SetupFilters