import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { PageHeader, Row, Col, Card } from 'antd'
import { LikeOutlined, StarOutlined, LikeFilled, StarFilled } from '@ant-design/icons'
import Setup from '../Models/Setup'
import ClassTabs from '../components/ClassTabs'
import SkillIcon from '../components/SkillIcon'
import ToyIcon from '../components/ToyIcon'
import SetupDesc from '../components/SetupDesc'
import SetupComments from '../components/SetupComments'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { userState } from '../states/atoms'
import { useRecoilValue } from 'recoil'
import Interaction from '../Models/Interaction'

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

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      partialVisibilityGutter: 90
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      partialVisibilityGutter: 60 
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 60 
    }
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

  // const userActions = async (e, id, action, comment) => {
  //   e.stopPropagation()
  //   const interactionData = { boss_setup: id, user: currentUser.id }
  //   const commentData = {}
  //   const actionList = {
  //     onLike: async() => Interaction.Like(interactionData, true),
  //     onUnlike: async() => Interaction.Unlike(id, true),
  //     onFavourite: async() => Interaction.Favourite(interactionData, true),
  //     onUnfavourite: async() => Interaction.Unfavourite(id, true),
  //     postComment: async() => Interaction.PostComment(id, true),
  //     deleteComment: async() => Interaction.DeleteComment(id, true)
  //   }
  //   try {
  //     const response = await actionList[action]()
  //     setBossSetup(response.data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const handleChange = (e) => setCommentValue(e.target.value)

  const handleSubmit = async (value) => {
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
    { isLoading ? <div>Loading</div> : 
    <>
      <PageHeader 
        title={bossSetup.boss.name}
        subTitle={`Submitted by ${bossSetup['created_by']}`}
        extra={[
          <LikeOutlined key='like' />,
          <StarOutlined key='star' />,
        ]} />
      <div style={{padding: '0px 24px 24px'}}>
        <Row gutter={[16,16]}>
          <ClassTabs result={bossSetup} activeClassIdx={activeClassIdx} changeActiveClass={changeActiveClass}/>
        </Row>
      </div>
      <div style={{padding: '0px 24px 24px'}}>
      <Carousel responsive={responsive} arrows={false} partialVisible={true}>
        <div style={{marginRight: '16px'}}>
        <Card>
          <Row gutter={[16,16]}>
            {activeSetup['skills'].map((skill, idx) => (
            <Col span={24} key={idx}>
              <div style={{display: 'flex', alignItems: 'start'}}>
                <SkillIcon skill={skill} context={context} activeClass={activeSetup['player_class']} />
                <SetupDesc value={skill} context={'skill'} activeClass={activeSetup['player_class']} />
              </div>
            </Col>
            ))}
          </Row>
        </Card>        
        </div>
        <Card>
          <Row gutter={[16,16]}>
            {activeSetup['toys'].map((toy, idx) => (
              <Col span={24} key={idx}>
                <div style={{display: 'flex', alignItems: 'start'}}>
                  <ToyIcon toy={toy} context={context} />
                  <SetupDesc value={toy} context={'toy'} activeClass={activeSetup['player_class']} />
                </div>
              </Col>
            ))}
          </Row>
        </Card>    
      </Carousel>
      </div>
      <div style={{padding: '0px 24px 8px'}}>
      <Card>
        {bossSetup.note ? 
        <div>{bossSetup.note}</div> :
        <i style={{color: 'grey'}}>This user is lazy and didn't leave anything behind.</i>}
      </Card>
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