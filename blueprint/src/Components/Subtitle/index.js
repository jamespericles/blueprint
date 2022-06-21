import styled from 'styled-components'

const Subtitle = styled.span`
  margin: 0px;
  font-size: 16px;
  line-height: 1;
  font-weight: 400;
  color: 'black';
  display: 'inline';
`

Subtitle.defaultProps = {
  style: {},
  size: null,
}

export default Subtitle
