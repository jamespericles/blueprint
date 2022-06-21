import React, { useEffect } from 'react'

import { Form, Row, Col, Select } from 'antd'
import Title from '../Title'
import Subtitle from '../Subtitle'

import { useQuery } from '@apollo/client'
import getScreener from '../../ApolloClient/Queries/getScreener'

const ScreenerForm = () => {
  const { data } = useQuery(getScreener)
  console.log('~ data', data)

  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({
      total: 0
    })
  })

  return (
    <>
      <Row>
        <Title>{data?.screener?.full_name}</Title>
      </Row>
      <Row>
        <Subtitle>Disorder: {data?.screener?.disorder}</Subtitle>
      </Row>
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal">
        {data?.screener?.content.sections[0]?.questions.map(question => {
          return (
            <Form.Item>
              <Subtitle key={question.question_id}>{question.title}</Subtitle>
              <Select>
                {data?.screener?.content?.sections[0]?.answers.map(answer => {
                  return <Select.Option key={answer.title}>{answer.title}</Select.Option>
                })}
              </Select>
            </Form.Item>
          )
        })}
      </Form>
    </>
  )
}

export default ScreenerForm