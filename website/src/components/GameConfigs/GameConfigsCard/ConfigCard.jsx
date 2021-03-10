import React from 'react'
import { Row, Col, Divider } from 'antd'

import BossPic from './BossTestData/HermitCrab.jpeg'

const testData = {

    boss: {
        name: 'Hermit Crab',
        picture: BossPic,
    },
    characters: [
        {
            class: 'Warlock',
            skills: ['Soul Seal', 'Soul Twins', 'Soul Wave', 'Summon Violent Frog'],
            toys: ['Black Moblin', 'Sabre Tiger King', 'Brown Bear', 'Unicorn Gorilla']
        },   
        {
            class: 'Hunter',
            skills: ['Aimed Shot', 'Quick Shot', 'Piercing Shot', 'Sunder Armor Shot'],
            toys: ['Black Moblin', 'Brown Bear', 'Sabre Tiger King', 'Marmot'],
        },
        {
            class: 'Druid',
            skills: ['Natural Aegis', 'Song of Protection', 'Ukaka Transform', 'Force of Bud'],
            toys: ['Sheep', 'Marmot', 'Moblin', 'Unicorn Gorilla'],
        },
        {
            class: 'Warrior',
            skills: ['StockPile', 'Fearless Shield', 'Powerful Knock up II', 'Call to Arms'],
            toys: ['Narwhal King', 'irish Elk', 'White Camel', 'Marmot'],
        }

    ]
}

const sequence = ['1st', '2nd', '3rd', '4th']

const ConfigCard = (props) => (
    <>
    <Row>
        <Col span={3}>
            <div>{testData.boss.name}</div>
        <img src={testData.boss.picture} alt="Boss Pic" />
        </Col>

        <Col span={1}>
            <Divider type='vertical' />
        </Col>

        <Col span={20}>

            <Row>
                <Col span={3}></Col>
                <Col span={21}>
                    <Row>
                        {testData.characters.map( (character, idx) => (
                            <Col key={`character-class-${idx}`} span={6}>
                                <div>{character.class}</div>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>

            {new Array(4).fill('').map( (item, idx) => (
                <Row>
                    <Col span={3}>
                        <div>{sequence[idx]}</div>
                    </Col>
                    <Col span={21}>
                        <Row>
                            {testData.characters.map( (character) => (
                                <Col span={6}>
                                    <div>{character.skills[idx]}</div>
                                </Col>
                        ))}
                        </Row>
                    </Col>
                </Row>
            ))}

        </Col>

    </Row>

    </>

)

export default ConfigCard