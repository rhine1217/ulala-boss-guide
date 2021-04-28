import React from 'react'
import { useLocation } from 'react-router-dom'
import BossInput from '../components/BossInput'
import ClassSelection from '../components/ClassSelection'
import { Select, Card, Tag, Row, Col } from 'antd'
import { ShareAltOutlined, LikeOutlined, StarOutlined, LikeFilled, StarFilled} from '@ant-design/icons';

const SearchResults = () => {

    function useQuery() {
        return new URLSearchParams(useLocation().search)
    }

    function handleSortChange(e) {
        console.log(e)
    }

    let query = useQuery()

    return (
        <>
        <div style={{width: '100%', paddingTop: '2rem'}}><BossInput context="search" /></div>
        <ClassSelection context="search" />
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div>100 Results for {query.get("name")}</div>
            <div>Sort: 
        <Select defaultValue="top-rated" style={{width: 120}} onChange={handleSortChange}>
            <Select.Option value="top-rated">Top Rated</Select.Option>
            <Select.Option value="most-recent">Most Recent</Select.Option>
        </Select></div>
            </div>
        <Row>
            <Col xs={24} sm={12} lg={8}>
        <Card>
            <Row gutter={[16,16]}>
                <Col span={24}>
            <div>Thunder King Dragon</div>
                </Col>
                <Col span={24}>
            <Tag color="magenta">magenta</Tag>
            <Tag color="red">red</Tag>
            <Tag color="volcano">volcano</Tag>
            <Tag color="orange">orange</Tag>
                </Col>
                    {new Array(4).fill('').map(item => (
                    <Col span={6}>
                    <img style={{width: '100%'}} src='https://s3-us-west-1.amazonaws.com/s3.ulalagame.app/DLY_BianShenWuKeKe.png' alt="skill" />
                </Col>
                    ))}


                    {new Array(4).fill('').map(item => (
                    <Col span={6}>
                    <img style={{width: '100%'}} src='https://s3-us-west-1.amazonaws.com/s3.ulalagame.app/DLY_BianShenWuKeKe.png' alt="skill" />
                </Col>
                    ))}
                <Col span={24}>lorem ipsum dolor sit amet, consectetur adip</Col>
                <Col span={24}>
                <div>Submitted by user1234</div>
            <LikeOutlined />
            <StarOutlined />
            <ShareAltOutlined />
                </Col>
                </Row>
        </Card>

            </Col>
        </Row>
        </>
    )

}

export default SearchResults