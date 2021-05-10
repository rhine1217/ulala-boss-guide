import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Row, Skeleton } from 'antd'
import Setup from '../Models/Setup'
import Interaction from '../Models/Interaction'
import ClassTabs from '../components/ClassTabs'
import SetupComments from '../components/SetupComments'
import SetupDetailPageHeader from '../components/SetupDetailPageHeader'
import SetupDetailCarousel from '../components/SetupDetailCarousel'
import SetupDetailNote from '../components/SetupDetailNote'
import { userState } from '../states/atoms'
import { useRecoilValue } from 'recoil'

const SetupDetails = (props) => {

  const setupId = props.match.params.id
  const context = 'result'
  const [bossSetup, setBossSetup] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [activeClassIdx, setActiveClassIdx] = useState(0)
  const [activeSetup, setActiveSetup] = useState(null)
  const currentUser = useRecoilValue(userState)
  const [isAddCommentLoading, setIsAddCommentLoading] = useState(false) 
  const [commentValue, setCommentValue] = useState('')

  const changeActiveClass = (idx) => {
    setActiveClassIdx(idx)
    setActiveSetup(bossSetup['player_setup'][idx])
  }

  const getDetails = async () => {
    try {
      const response = await Setup.Retrieve(setupId, true)
      setBossSetup(response.data)
      setActiveSetup(response.data['player_setup'][0])
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const userActions = async (id, action) => {
    const interactionData = { boss_setup: id, user: currentUser.id }
    const actionList = {
      onLike: async() => Interaction.Like(interactionData, true),
      onUnlike: async() => Interaction.Unlike(id, true), // setup id
      onFavourite: async() => Interaction.Favourite(interactionData, true),
      onUnfavourite: async() => Interaction.Unfavourite(id, true), // setup id
    }
    try {
      const response = await actionList[action]()
      setBossSetup(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => setCommentValue(e.target.value)

  const handleSubmit = async (e, value) => {
    e.preventDefault()
    setIsAddCommentLoading(true)
    const commentData = {
      boss_setup: bossSetup.id,
      user: currentUser.id,
      comment: value,
      posted_date: new Date()
    }
    try {
      const response = await Interaction.PostComment(commentData)
      setBossSetup(response.data)
      setIsAddCommentLoading(false)
      setCommentValue('')
    } catch (error) {
      console.log(error)
    }
  }

  const deleteComment = async (commentId) => {
    try {
      const response = await Interaction.DeleteComment(commentId)
      setBossSetup(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDetails()
  }, [])

  return (
    <>
    { isLoading ? <div style={{paddingTop: '20%'}}><Skeleton active /></div> : 
    <>
      <SetupDetailPageHeader bossSetup={bossSetup} userActions={userActions} currentUser={currentUser} />
      <div style={{padding: '0px 24px 24px'}}>
        <Row gutter={[16,16]}>
          <ClassTabs result={bossSetup} activeClassIdx={activeClassIdx} changeActiveClass={changeActiveClass}/>
        </Row>
      </div>
      <div style={{padding: '0px 24px 24px'}}>
        <SetupDetailCarousel activeSetup={activeSetup} context={context} />
      </div>
      <div style={{padding: '0px 24px 8px'}}>
        <SetupDetailNote bossSetup={bossSetup} />
      </div>
      <div style={{padding: '0px 24px 24px'}}>
        <SetupComments 
          comments={bossSetup.comments} 
          currentUser={currentUser} 
          isAddCommentLoading={isAddCommentLoading}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          commentValue={commentValue}
          deleteComment={deleteComment}
        />
      </div>
    </>
    }
    </>
  )

}

export default withRouter(SetupDetails)