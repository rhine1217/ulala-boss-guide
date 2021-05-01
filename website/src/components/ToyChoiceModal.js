import React from 'react'
import { Modal, Card, Button, Row, Col } from 'antd'
import { useRecoilValue, useRecoilState } from 'recoil'
import { currCharSelectionsState, isToyChoiceModalVisibleState, toysToSelectFromState, toyToChangeIdxState } from '../states/atoms'
import ToyIcon from './ToyIcon'
import SetupDesc from './SetupDesc'

const ToyChoiceModal = () => {

  const [isToyChoiceModalVisible, setIsToyChoiceModalVisible] = useRecoilState(isToyChoiceModalVisibleState)
  const toysToSelectFrom = useRecoilValue(toysToSelectFromState)
  const [toyToChangeIdx, setToyToChangeIdx] = useRecoilState(toyToChangeIdxState)
  const [currCharSelections, setCurrCharSelections] = useRecoilState(currCharSelectionsState)

  const updateToy = (newToy) => {
    setIsToyChoiceModalVisible(false)
    const refreshedCurrCharSelectionsToys = [ ...currCharSelections.toys ]
    refreshedCurrCharSelectionsToys[toyToChangeIdx] = newToy
    setCurrCharSelections(selections => {
      return {
        skills: selections.skills,
        toys: refreshedCurrCharSelectionsToys
      }
    })
    setToyToChangeIdx(-1)
  }

  const onCancel = () => {
    setIsToyChoiceModalVisible(false)
    setToyToChangeIdx(-1)
  }

  return (
    <Modal
      title="Toy list"
      centered
      visible={isToyChoiceModalVisible}
      footer={null}
      onCancel={onCancel}
      bodyStyle={{height: '500px', overflow: 'scroll'}}
    >
      <div style={{paddingBottom: '16px'}}>Can't equip same type of toys in one setup</div>
      <Row gutter={[16, 16]}>
      {toysToSelectFrom.map((toy, idx) => (
      <Col span={24} key={idx}>
        <Card>
          <div style={{display: 'flex', alignItems: 'start'}}>
            <ToyIcon toy={toy} context='choiceModal' />
            <SetupDesc value={toy} context='choiceModal' />
            <Button type="primary" onClick={() => updateToy(toy)}>Swap</Button>
          </div>
        </Card>      
      </Col>
      ))}
      </Row>
    </Modal>
  )
}

export default ToyChoiceModal