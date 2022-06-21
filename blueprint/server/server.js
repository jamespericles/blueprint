const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const cors = require('cors')

const port = 4000

const typeDefs = buildSchema(`
 type Question {
    question_id: String
    title: String
  }

  type Answer {
    value: Int
    title: String
  }

  type Section {
    type: String
    title: String
    answers: [Answer]
    questions: [Question]
  }

  type Content {
    display_name: String
    sections: [Section]
  }

  type Screener {
    id: String
    name: String
    disorder: String
    full_name: String
    content: Content
  }

  type Query {
    questions: [Question]
    answers: [Answer]
    screener: Screener
  }
`);

const screener = {
  id: "abcd-123",
  name: "BPDS",
  disorder: "Cross-Cutting",
  content: {
    display_name: "BDS",
    sections: [
      {
        type: "standard",
        title: "During the past TWO (2) WEEKS, how much (or how often) have you been bothered by the following problems?",
        answers : [
          {
            title: "Not at all",
            value: 0
          },
          {
            title: "Rare, less than a day or two",
            value: 1
          },
          {
            title: "Several days",
            value: 2
          },
          {
            title: "More than half the days",
            value: 3
          },
          {
            title: "Nearly every day",
            value: 4
          }
        ],
        questions : [
          {
            question_id: "question_a",
            title: "Little interest or pleasure in doing things?"
          },
          {
            question_id: "question_b",
            title: "Feeling down, depressed, or hopeless?"
          },
          {
            question_id: "question_c",
            title: "Sleeping less than usual, but still have a lot of energy?"
          },
          {
            question_id: "question_d",
            title: "Starting lots more projects than usual or doing more risky things than usual?"
          },
          {
            question_id: "question_e",
            title: "Feeling nervous, anxious, frightened, worried, or on edge?"
          },
          {
            question_id: "question_f",
            title: "Feeling panic or being frightened?"
          },
          {
            question_id: "question_g",
            title: "Avoiding situations that make you feel anxious?"
          },
          {
            question_id: "question_h",
            title: "Drinking at least 4 drinks of any kind of alcohol in a single day?"
          }
        ]
      }
    ],
  },
  full_name: "Blueprint Diagnostic Screener"
}

const resolvers = {
  // questions: () => { return questions },
  // answers: () => { return answers },
  screener: () => { return screener }
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