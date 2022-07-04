import styled from 'styled-components'

const Title = styled.span`
  font-size: ${p => p.large ? '42px' : '26px'};
  font-weight: ${p => p.large ? 600 : 200};
  display: block;
  line-height: 1.5;
  color: #fff;
  text-align: center;
`

Title.defaultProps = {
  style: {},
  size: null,
  util: null,
  hover: false,
}

export default Title
