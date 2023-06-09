import React, { ReactNode } from 'react'
import styled from 'styled-components'

interface Tab {
  id: string
  label: string
}

interface CardProps {
  tabs?: Tab[]
  activeTabId?: string
  activeTabChanged?: (tabId: string) => void
  sideText?: string
  children?: ReactNode
  alternate?: boolean
  minHeight?: string
  noMargin?: boolean
  padding?: string
}

const CardOuter = styled.div`
  margin-bottom: 10px;
  position: relative;
`

interface CardContainerProps extends CardProps {
  sideText?: string
  alternate?: boolean
  minHeight?: string
  padding?: string
}

const CardContainer = styled.div<CardContainerProps>`
  background: linear-gradient(180deg, #2d54e8 17%, #1f3bc2);
  padding: 20px;
  border-radius: 10px;
  margin-left: 25%;
  margin-right: 25%;
  margin-bottom: 25px;
  padding: 10px;
`

const Card: React.FC<CardProps> = ({
  tabs,
  activeTabId,
  activeTabChanged,
  sideText,
  children,
  alternate,
  minHeight,
  noMargin,
  padding,
  ...rest
}) => {
  return (
    <CardOuter>
      <CardContainer
        sideText={sideText}
        alternate={alternate}
        minHeight={minHeight}
        padding={padding}
        {...rest}>
        {children}
      </CardContainer>
    </CardOuter>
  )
}

export default Card
