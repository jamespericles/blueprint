import { gql } from '@apollo/client'

const getQuestions = gql`
  {questions {
  value
  questionID
  domain
  body
}}
`

export default getQuestions