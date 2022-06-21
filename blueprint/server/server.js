const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const cors = require('cors')

const port = 4000

const typeDefs = buildSchema(`
 type Question {
    value: Int
    questionID: String
    domain: String
    body: String
  }
  type Query {
    questions: [Question]
  }
`);

const questions = [
  {
    value: 1,
    questionID: 'question_a',
    body: 'This is question A',
    domain: 'depression',
  },
  {
    value: 0,
    questionID: 'question_b',
    body: 'This is question B',
    domain: 'depressions',
  },
  {
    value: 2,
    questionID: 'question_c',
    body: 'This is question C',
    domain: 'mania',
  },
  {
    value: 3,
    questionID: 'question_d',
    body: 'This is question D',
    domain: 'mania',
  },
  {
    value: 1,
    questionID: 'question_e',
    body: 'This is question E',
    domain: 'anxiety',
  },
  {
    value: 0,
    questionID: 'question_f',
    body: 'This is question F',
    domain: 'anxiety',
  },
  {
    value: 1,
    questionID: 'question_g',
    body: 'This is question G',
    domain: 'anxiety',
  },
  {
    value: 0,
    questionID: 'question_h',
    body: 'This is question H',
    domain: 'substance_use',
  },
]

const resolvers = {
  questions: () => { return questions }
};

const app = express()

app.use(cors())

app.use(
  '/graphql',
  graphqlHTTP({
    schema: typeDefs,
    rootValue: resolvers,
    graphiql: true,
  })
)

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`)
})