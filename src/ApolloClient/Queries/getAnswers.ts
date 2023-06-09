import { gql } from '@apollo/client';

const getAnswers = gql`
  {
    answers {
      value
      title
    }
  }
`;

export default getAnswers;
