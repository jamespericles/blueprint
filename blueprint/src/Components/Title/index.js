import styled from 'styled-components'

const Title = styled.span`
  font-size: 36px;
  font-weight: 600;
  display: block;
  line-height: 1.5;
`

Title.defaultProps = {
  style: {},
  size: null,
  util: null,
  hover: false,
}

export default Title
