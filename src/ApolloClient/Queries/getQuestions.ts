import { gql } from '@apollo/client'

const getQuestions = gql`
  {
    questions {
      question_id
      title
    }
  }
`

export default getQuestions
