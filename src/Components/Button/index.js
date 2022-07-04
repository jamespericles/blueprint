import { Button as AntdButton} from 'antd'
import styled from 'styled-components'

const Button = styled(AntdButton)`
  width: 70px;
  height: 36px ;
  font-size: 14px ;
  max-width: 100% ;
  text-align: center ;
  padding: 0px ;
  margin: auto;
  border-radius: 10px ;
  background-color: white ;
  border: white ;
  color: black ;
  cursor: pointer;
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`

export default Button
