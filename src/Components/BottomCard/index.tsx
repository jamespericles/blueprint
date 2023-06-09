import * as React from 'react'
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import Button from '../Button'
import Card from '../Card'

interface BottomCardProps {
  activeQuestion: number
  setActiveQuestion: (arg0: number) => void
  questionLength: number
  submitButton: JSX.Element
}

const BottomCard = ({
  activeQuestion,
  setActiveQuestion,
  questionLength,
  submitButton,
}: BottomCardProps) => {
  const shifter = (direction: 'left' | 'right') => {
    setActiveQuestion(
      direction === 'left'
        ? activeQuestion - 1
        : direction === 'right'
        ? activeQuestion + 1
        : activeQuestion
    )
  }

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          onClick={() => shifter('left')}
          disabled={activeQuestion === 0}
          icon={<CaretLeftOutlined />}
        />
        {submitButton && <div>{submitButton}</div>}
        <Button
          onClick={() => shifter('right')}
          disabled={activeQuestion === questionLength - 1}
          icon={<CaretRightOutlined />}
        />
      </div>
    </Card>
  )
}

export default BottomCard
