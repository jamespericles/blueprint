import React, { useState } from 'react'

import { Form, Row, Col, Radio } from 'antd'
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import Title from '../Title'
import Card from '../Card'
import Button from '../Button'
import ProgressBar from '../ProgressBar'

import { useQuery } from '@apollo/client'
import getScreener from '../../ApolloClient/Queries/getScreener'

const ScreenerForm = () => {
  const { data, error, loading } = useQuery(getScreener)

  // Used to determine which question to render, as well as allow for the use of buttons to move between different questions.
  const [activeQuestion, setActiveQuestion] = useState(0)

  const questionLength = data?.screener?.content?.sections[0]?.questions.length

  const [form] = Form.useForm()

  const answers = []
  if (!error && !loading) {
    for (let i = 0; i < data?.screener?.content?.sections[0]?.answers.length; i++) {
      answers.push({
        value: data?.screener?.content?.sections[0]?.answers[i]?.value,
        title: data?.screener?.content?.sections[0]?.answers[i]?.title
      })
    }
  }

  // One function to control the 'direction' each button moves between questions, left being back, right being forward
  const shifter = (direction) => {
    if (direction === 'left' && activeQuestion > 0) {
      setActiveQuestion(activeQuestion -1)
    } else if (direction === 'right' && activeQuestion < questionLength - 1) {
      setActiveQuestion(activeQuestion + 1)
    }
  }

  // Helper function to append the correct ID as requested in the directions
  const appendID = (key) => {
    switch (key) {
      case 'question0':
        return 'question_a'
      case 'question1':
        return 'question_b'
      case 'question2':
        return 'question_c'
      case 'question3':
        return 'question_d'
      case 'question4':
        return 'question_e'
      case 'question5':
        return 'question_f'
      case 'question6':
        return 'question_g'
      case 'question7':
        return 'question_h'
      default:
        break
    }
  }

  const handleFinish = (values) => {
    let answers = []

    for (const key in values) {
      answers.push({
        value: values[key],
        question_id: appendID(key)
      })
    }
    console.log(answers)
  }

  const TitleCard = () => {
    return (
      <Card>
        <Row>
          <Title large>{data?.screener?.full_name}</Title>
        </Row>
        <Row>
          <Title>Disorder: {data?.screener?.disorder}</Title>
        </Row>
        <Row>
          <p style={{ lineHeight: '28px', fontSize: '18px', color: '#fff', textAlign: 'center', marginLeft: '12%', marginRight: '12%' }}>
            Hello and thank you for continuing your mental health journey with Blueprint! Below there are several questions your health care provider has asked that you complete in order to assess how you are feeling this past week. Please answer them to the best of your ability.
          </p>
        </Row>
      </Card>
    )
  }

  const BottomCard = () => {
    return (
      <Card style={{ textAlign: 'center' }}>
        <Button onClick={() => shifter('left')}
          disabled={activeQuestion === 0}
          icon={<CaretLeftOutlined />}
          style={{ float: 'left' }}
        />
        <Button onClick={() => shifter('right')}
          disabled={activeQuestion === questionLength - 1}
          icon={<CaretRightOutlined />}
          style={{ float: 'right' }}
        />
        <Form.Item>
          <Button type={'primary'} htmlType={'submit'}>
            Submit
          </Button>
        </Form.Item>
      </Card>
    )
  }

  return (
    <>
      <ProgressBar completed={((activeQuestion + 1) / 8) * 100} />
      <TitleCard />
      <Form form={form} onFinish={(values) => handleFinish(values)}>
        {data?.screener?.content?.sections[0]?.questions.map((question, i) => {
          return (
              // We only want to render one question at a time. Below isn't the best solution as we're still rendering the other cards...
              // but unfortunately it doesn't seem like Antd has a solution for this case that doesn't prevent answers from being lost
              // More at https://ant.design/components/form/
            <Card style={{ display: activeQuestion === i ? '' : 'none' }}>
              <Title>{question.title}</Title>
                <Row justify='space-between'>
                <Form.Item
                  key={i}
                  style={{ display: activeQuestion === i ? '' : 'none' }} // Both <Form.Item /> and the parent <Card /> element need this ternary to hide appropriately without losing submitted responses
                  name={`question${i}`}
                  label={<div style={{ color: '#fff'}}>Question: {activeQuestion + 1} of {questionLength}</div>}
                  rules={[{ required: true, message: 'Please select the option you feel is most accurate' }]}>
                <Radio.Group
                  name={`question${i}`}
                  style={{ color: '#fff', padding: '10px', margin: '10px' }}
                  onChange={() => {
                    setTimeout(() => {
                      if (activeQuestion < questionLength + 1 &&
                        activeQuestion !== questionLength - 1) { // This case prevents the activeQuestion from being greater than the number of actual questions
                        setActiveQuestion(activeQuestion + 1)
                      }
                    }, 500)}}>
                      {answers.map((answers) => {
                        return (
                          <Col>
                            <Radio key={answers.value} value={answers.value}>
                              {answers.title}
                            </Radio>                 
                          </Col>
                        )
                      })}
                    </Radio.Group>
                  </Form.Item>
                </Row>
              </Card>
            )
        })}
      <BottomCard />
      </Form>
    </>
  )
}

export default ScreenerForm