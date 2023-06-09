# Blueprint

## Foreword

Hello again! I'm very excited to be in this position again, with another chance to show off my skills. I left the majority of this README the same as it was in my previous submission, with the exception of fleshing out the [Deployment](#deployment) section a bit more.

## Getting Started

In order to get the project working locally, you'll first need to run `yarn` to install all necessary packages. Then execute `yarn start` to spin up the frontend on port `3000`. Lastly, open a second terminal and run `yarn server` to spin up the backend on port `4000`.

The "backend" in this case is a simple GraphQL server. The server itself is an instance of express, and is executed using [nodemon](https://www.npmjs.com/package/nodemon) instead of node, as I find it more convenient for the server to automatically refresh when it detects code changes. The server itself can be found in `./server` with all related queries found in `./src/ApolloClient/`.

---

## The Problem

--- Part 1 ---

"Build a small API with a single endpoint which accepts a patient's answers to the screener as JSON. Then, score the answers and return the appropriate assessments."

--- Part 2 ---
Build an API to serve the given screener. Build a UI that displays the following:

- The prompt for the user (the `title` of the first `section`)
- The assessment `display_name`
- The question title
- All answer options for the given assessment, as buttons that just display the answer title as text
- The question number out of the total number of questions in all assessments (e.g. 1 out of 8)
- A progress bar that indicates where the user is in the overall assessment experience that updates with each completed section

Tapping on an answer should advance the user to the next section, and upon submission log the user's answers.

## The Solution

### Technical Choices

I wanted to challenge myself without compromising my ability to complete this project on time, so I decided to use a mixture of technologies that were both new and old to me. I'll start with the decision that had the most far reaching impact on this finished project, [React](https://reactjs.org/docs/getting-started.html). I've had enough time working with Vue and Angular to feel strongly that React is superior. From their documentation, widespread community support, and to, what I believe to be, the most intuitive syntax, React is incredibly comfortable to me, as is it's sister framework React Native, which I've become familiar with over the last few weeks.

I coupled React with my favorite component library [Antd](https://ant.design/). Besides being a fan of their syntax and design, I'm also very familiar with the components themselves and their APIs.

For my backend solution, I chose a combination of [GraphQL](https://graphql.org/learn/), [ApolloGQL](https://www.apollographql.com/docs/react/), and [Express](https://expressjs.com/). I've worked with GraphQL and Apollo for about a year now, albeit in a slightly different way than this implementation. I haven't used Express since my time in my Bootcamp. As I said before, I wanted to revisit some technologies I've used in the past to make this project slightly more challenging as I've never worked with GraphQL and Express in conjunction this way before.

### Design Process

Given that this assessment is to give you a better idea of my abilities, I felt it would be best to explain my entire process from start to finish.

With all major projects, I like to physically write out the key points of the problem, followed by breaking each key point down into actionable tasks. This gives me a clear direction while also serving as a convenient checklist for later.

From there, I draw a crude diagram with what will likely be my first of many designs. This diagram includes everything from the layout and locations of different components, as well as a diagram of different data and states that I expect to be passed between components. I find that besides a checklist, having an image to work against is a huge help.

I chose to start with the backend as that is what I have the least experience in. Ultimately, it was fairly straight forward. The only major stumbling block I came up against was a pesky CORS issue I ran into. Once I was successfully querying my backend and retrieving the screener, it was on to my favorite portion (the frontend).

I followed the same directory structure I'm used to for the frontend. I like keeping things as organized as possible, so keeping all components in their own directory is important. Another reason I like React: if you export all your components from an index file at the root of your components folder, you're able to import multiple components inline rather than individually from each of their index files.

```
import { Button, Row, Col } from 'components'
                ---vs---
import Button from '../../../Button'
import Row from '../../../Row'
...
```

I initially planned on taking advantage of this before deciding that my `Form` component had become so specialized it wouldn't have made much sense to split it off and instead chose to use that as my `App.js` file essentially.

The biggest challenge came from my Form component actually. I felt the cleanest solution to handle each question would be to map over the questions returned from my `getScreener` query and return a `Form.Item` for each, while subsequently mapping over each possible answer to render each `Radio.Button`. Here's my first solution:

```
--src/Components/ScreenerForm/index.js:L120--

 <Form form={form} onFinish={(values) => handleFinish(values)}>
  {data?.screener?.content?.sections[0]?.questions.map((question, i) => {
    return (
      {activeQuestion === i
        ? // RENDER QUESTION
          // REST OF COMPONENTS
        : <></>
        })
      })}
    })}
<BottomCard />
</Form>
```

Another reason why I chose to iterate over the questions like I did was so that I would have access to my `question` object, and an iterator I could use to compare against a stateful variable to determine which question to show. This accomplished rendering only a single question at a time, but because the other `Form.Item` comps hadn't rendered, they essentially weren't connected to the `Form's` store. The [docs](https://ant.design/components/form/#API) are a bit confusing but essentially each `Form` is an instance initialized by calling `use.Form()` on the component imported from Antd. This creates a store that simplifies a lot of handy features, such as storing the selected answer for each question. You essentially add different stateful variables with each instance of `Form.Item` within a `Form` parent component and passing it a `name` prop. This is stored as an array of objects with the following shape: `{ name: question0, value: 3 }`. By not having these `Form.Items` rendered, upon hitting submit, the only object in the array was for whatever question the user just answered last.

The way I got around this is a bit hacky, but unfortunately I don't think there's another solution. Similar to my first solution, I now compare my `activeQuestion` variable against the iterator within my style prop like so:

```
<Card style={{ display: activeQuestion === i ? '' : 'none' }}>
...
<Form.Item
  key={i}
  style={{ display: activeQuestion === i ? '' : 'none' }}
...
```

Obviously the biggest flaw here is we're rendering items that aren't actually visible. Realistically this isn't the biggest issue, but they do still exist on the DOM so it isn't ideal. By hiding both the `Card` and `Form.Item`, I was able to accomplish rendering only a single question at a time while still storing the responses for questions not visible to the user.

Once I found a solution to render only one question at a time without losing the responses to previously answered questions, the rest of the requirements were fairly straight forward. However, there are a couple more things I feel I compromised on. First, I had no problem making it so that answering a question progressed the user to the next question automatically, however, I felt it looked very jarring how quickly this transition was occurring. I believe the cause of this is because every question is already rendered, so it's able to transition to the next almost instantly. To slow it down a bit, I decided to use `setTimeout` and pass in `500ms` before transitioning. This isn't ideal obviously, but I think the tradeoff is worth a slightly better user experience.

The other area I felt I cut corners was in the overall design. I expected it would look fairly bare-bones given how little there was to actually build, but I can't lie and say I'm a fan of how it looks. I went back and forth on filling it out with some dumby content that wasn't requested, such as a footer and nav bar and maybe some cards on the side to break up the white-space. I ultimately decided against this though.

---

## Regrets / Desired Improvements

I don't have too many regrets or improvements I would have liked to make if I had the time. Besides hosting the application somewhere and connecting it to an actual database rather than retrieving the screener locally, I'm pleased with how it turned out. I'm not the biggest fan of it visually, but it was a rather simple design.

If I had more time, I would have also loved to have built this using TypeScript and React Native. I recently transitioned into being the lead on my company's mobile development efforts so I'm excited to be using TypeScript again and learning React Native. I felt that taking this project in that direction may have been a bit much given I only had this long weekend to finish it, though.

---

## Deployment

Describe how you would deploy this as a true production app on the platform of your choice:

- How would you ensure the application is highly available and performs well?

  - I would use a close-based hosting provider. Cloud-based hosting providers such as AWS, Google Cloud, and Microsoft Azure off high availability and scalability of the box. They also provide tools for loading balancing, auto-scaling, and failover which can help ensure that the application is always available and performs well.

  I'd also consider the use of a CDN to help with performance. A CDN can help with performance by caching static assets and serving them from a location closer to the user. This can help reduce latency and improve performance.

  Beyond that, I'd consider database availability and tools that can help with that. I'd consider database replication, clustering, and sharding to help with availability and performance.

- How would you secure it?

  - There are numerous ways to ensure the application is secure in production. I'd start by ensuring that the application is served over HTTPS. This can be done by using a reverse proxy such as Nginx or Apache. I'd also consider using a Web Application Firewall (WAF) to help protect against common attacks such as SQL injection, cross-site scripting, and cross-site forgery.

- What would you add to make it easier to troubleshoot problems while it is running live?
  - I'd consider using a logging service such as Loggly or Papertrail to help with troubleshooting. I'd also consider using a monitoring service such as New Relic or Datadog to help with monitoring the application and alerting on issues. Beyond that, it'd be very important to have automated tests in place to try and prevent errors before they happen.

---

## Links

- [GitHub](https://github.com/jamespericles)
- [LinkedIn](https://www.linkedin.com/in/jamespericlesii/)
- Checkout out my [portfolio](https://jamespericles.github.io/Portfolio/) which contains the code I'm most proud of, excluding the last year of production code I've written, which are in private repositories

---
