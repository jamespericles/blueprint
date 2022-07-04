import React from 'react'
import styled from 'styled-components'

const CardOuter = styled.div`
  margin-bottom: 10px;
  position: relative;
`

const CardContainer = styled.div`
background: linear-gradient(180deg, #2d54e8 17%, #1f3bc2);
padding: 20px;
border-radius: 10px;
margin-left: 25%;
margin-right: 25%;
margin-bottom: 25px;
padding: 10px;
`

const Card = ({ tabs, activeTabId, activeTabChanged, sideText, children, alternate, minHeight, noMargin, padding, ...rest }) => {
  return (
    <CardOuter noMargin={noMargin}>
      <CardContainer sideText={sideText} alternate={alternate} minHeight={minHeight} padding={padding} {...rest}>
        {children}
      </CardContainer>
    </CardOuter>
  )
}

export default Card
