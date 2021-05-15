import React from 'react'
import { Collapse, Tag, Row, Col } from 'antd'
const { Panel } = Collapse

const SetupFilters = ({filters, bossNamesChoices, charClassChoices, teamClassChoices, filterNames, toggleFilter, filterValues}) => {

  const filterChoices = {
    user: ['Me', 'Others'],
    status: ['Published', 'Draft'],
    bossNames: bossNamesChoices.sort(),
    charClass: charClassChoices,
    teamClass: teamClassChoices.sort(),
  }

  return (
    <Collapse ghost expandIconPosition='left'>
      {filters.map((filter, idx) => (
        <Panel header={filterNames[filter]} key={idx}>
          <Row gutter={[4, 12]}>
          {filterChoices[filter].map((choice, idx) => (
            <Col key={idx}>
              <Tag 
                className="app-tag"
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