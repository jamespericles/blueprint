import { useQuery } from '@apollo/client'
import getQuestions from './ApolloClient/Queries/getQuestions'

const App = () => {
  const { data } = useQuery(getQuestions)
  console.log('~ data', data)

  return (
    <></>
  );
}

export default App;
