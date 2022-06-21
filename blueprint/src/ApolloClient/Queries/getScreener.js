import { gql } from '@apollo/client'

const getScreener = gql`{
  screener {
    id
    name
    disorder
    full_name
    content {
      display_name
      sections {
        type
        title
        answers {
          value
          title
        }
        questions {
          question_id
          title
        }
      }
    }
  }
}
`

export default getScreener