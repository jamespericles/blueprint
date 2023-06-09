import React, { useState } from 'react'
import { Form, Row, Col, Radio } from 'antd'
import {
  Title,
  Card,
  Button,
  ProgressBar,
  TitleCard,
  BottomCard,
} from '../index'
import { useQuery } from '@apollo/client'
import getScreener from '../../ApolloClient/Queries/getScreener'

interface Answer {
  [key: string]: string
}

interface Question {
  title: string
}

const ScreenerForm = () => {
  const { data } = useQuery(getScreener)
  const [activeQuestion, setActiveQuestion] = useState<number>(0)
  const [answers, setAnswers] = useState<Answer>({})
  const questionLength = data?.screener?.content?.sections[0]?.questions?.length
  const [form] = Form.useForm()

  const isSubmitDisabled = Object.keys(answers).length !== questionLength

  const idMap: { [key: string]: string } = {
    question0: 'question_a',
    question1: 'question_b',
    question2: 'question_c',
    question3: 'question_d',
    question4: 'question_e',
    question5: 'question_f',
    question6: 'question_g',
    question7: 'question_h',
  }

  const appendID = (key: string) => idMap[key]

  const handleFinish = () => {
    const formattedAnswers = Object.entries(answers).map(([key, value]) => ({
      value,
      question_id: appendID(key),
    }))
    console.log(formattedAnswers)
  }

  return (
    <>
      <ProgressBar
        completed={(Object.keys(answers).length / questionLength) * 100}
      />
      <TitleCard
        fullName={data?.screener?.full_name}
        disorder={data?.screener?.disorder}
      />
      <Form form={form} onFinish={handleFinish}>
        <Card
          style={{ display: activeQuestion === 0 ? undefined : 'none' }}
          // The following spread attribute with a value of null as any is a workaround to allow for the style prop to be passed down
          // eslint-disable-next-line
          {...(null as any)}>
          <Title>
            {data?.screener?.content.sections[0]?.questions[0]?.title}
          </Title>
          <Row justify='space-between'>
            <Form.Item
              name={`question0`}
              label={
                <div style={{ color: '#fff' }}>
                  Question: 1 of {questionLength}
                </div>
              }
              rules={[
                {
                  required: true,
                  message: 'Please select the option you feel is most accurate',
                },
              ]}
              style={{ display: activeQuestion === 0 ? '' : 'none' }}>
              <Radio.Group
                name={`question0`}
                style={{ color: '#fff', padding: '10px', margin: '10px' }}
                onChange={(e) => {
                  setAnswers({ ...answers, question0: e.target.value })
                  setTimeout(() => {
                    setActiveQuestion(activeQuestion + 1)
                  }, 500)
                }}>
                {data?.screener?.content?.sections[0]?.answers.map(
                  (answer: Answer) => (
                    <Col key={answer.value}>
                      <Radio value={answer.value}>{answer.title}</Radio>
                    </Col>
                  )
                )}
              </Radio.Group>
            </Form.Item>
          </Row>
        </Card>
        {data?.screener?.content?.sections[0]?.questions
          .slice(1)
          .map((question: Question, i: number) => (
            <Card
              key={i + 1}
              style={{ display: activeQuestion === i + 1 ? undefined : 'none' }}
              // The following spread attribute with a value of null as any is a workaround to allow for the style prop to be passed down
              // eslint-disable-next-line
              {...(null as any)}>
              <Title>{question.title}</Title>
              <Row justify='space-between'>
                <Form.Item
                  name={`question${i + 1}`}
                  label={
                    <div style={{ color: '#fff' }}>
                      Question: {i + 2} of {questionLength}
                    </div>
                  }
                  rules={[
                    {
                      required: true,
                      message:
                        'Please select the option you feel is most accurate',
                    },
                  ]}
                  style={{ display: activeQuestion === i + 1 ? '' : 'none' }}>
                  <Radio.Group
                    name={`question${i + 1}`}
                    style={{ color: '#fff', padding: '10px', margin: '10px' }}
                    onChange={(e) => {
                      setAnswers({
                        ...answers,
                        [`question${i + 1}`]: e.target.value,
                      })
                      setTimeout(() => {
                        if (
                          activeQuestion < questionLength + 1 &&
                          activeQuestion !== questionLength - 1
                        ) {
                          setActiveQuestion(activeQuestion + 1)
                        }
                      }, 500)
                    }}>
                    {data?.screener?.content?.sections[0]?.answers.map(
                      (answer: Answer) => (
                        <Col key={answer.value}>
                          <Radio value={answer.value}>{answer.title}</Radio>
                        </Col>
                      )
                    )}
                  </Radio.Group>
                </Form.Item>
              </Row>
            </Card>
          ))}
        <BottomCard
          activeQuestion={activeQuestion}
          setActiveQuestion={setActiveQuestion}
          questionLength={questionLength}
          submitButton={
            <Form.Item style={{ margin: 0 }}>
              <Button
                type={'primary'}
                htmlType={'submit'}
                disabled={isSubmitDisabled}
                onClick={() => {
                  handleFinish()
                }}>
                Submit
              </Button>
            </Form.Item>
          }
        />
      </Form>
    </>
  )
}

export default ScreenerForm
