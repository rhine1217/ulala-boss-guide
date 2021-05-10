import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Card, Row, Badge } from 'antd'
import { renderCardActions } from './SetupResultCardActions'
import SetupResultCardMeta from './SetupResultCardMeta'
import SetupResultCardIcons from './SetupResultCardIcons'
import { SetupResultUser, SetupResultSharing } from './SetupResultUserSharing'

const SetupResult = ({context, result, userActions, currentUser}) => {

  const [activeClassIdx, setActiveClassIdx] = useState(0)
  const [activeSetup, setActiveSetup] = useState(result['player_setup'][0])
  const [isSharingModalVisible, setisSharingModalVisible] = useState(false)
  const [isLinkCopied, setIsLinkCopied] = useState(false)
  const [copyLinkBtnType, setCopyLinkBtnType] = useState('default')

  const setupLink = `${process.env.REACT_APP_HOST_NAME}/setup/${result.id}`
  const history = useHistory()

  const changeActiveClass = (idx) => {
    setActiveClassIdx(idx)
    setActiveSetup(result['player_setup'][idx])
  }

  const showLinkToShare = () => setisSharingModalVisible(true)

  const goToSetupDetail = () => history.push(`/setup/${result.status === 'Draft'? 'edit/' : ''}${result.id}`)

  const handleModalCancel = () => {
    setisSharingModalVisible(false)
    setIsLinkCopied(false)
    setCopyLinkBtnType('default')
  }

  const copyLink = () => {
    setIsLinkCopied(true)
    setCopyLinkBtnType('primary')
    navigator.clipboard.writeText(setupLink)
  }

  const SetupResultCard = (
    <Card hoverable
      onClick={goToSetupDetail}
      actions={renderCardActions(result, userActions, currentUser)}>
      <Row gutter={[16,16]}>
        <SetupResultCardMeta result={result} activeClassIdx={activeClassIdx} changeActiveClass={changeActiveClass} />
        <SetupResultCardIcons activeSetup={activeSetup} />
        <SetupResultUser result={result} showLinkToShare={showLinkToShare} />
      </Row>
    </Card>
  )

  return (
    <>
      {context === 'favourites' ? 
      <Badge.Ribbon text={result.status} color={result.status === 'Published' ? 'blue' : 'gold'}>
        {SetupResultCard}
      </Badge.Ribbon> : SetupResultCard
      }
    <SetupResultSharing 
      setupLink={setupLink}
      isSharingModalVisible={isSharingModalVisible}
      handleModalCancel={handleModalCancel}
      copyLinkBtnType={copyLinkBtnType}
      copyLink={copyLink}
      isLinkCopied={isLinkCopied} />
    </>
  )
}

export default SetupResult