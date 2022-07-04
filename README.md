# Blueprint

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

I wanted to challenge myself without compromising my ability to complete this project on time, so I just to use a mixture of technologies that were both new and old to me. I'll start with the decision most far reaching impact on this finished project, [React](https://reactjs.org/docs/getting-started.html). I've had enough time working with Vue and Angular to feel strongly that React is superior. From their documentation, huge community support, and to, what I believe to be, the most intuitive syntax. React is incredibly comfortable to me, as is it's sister project React Native, which I've become familiar with over the last few weeks.

I coupled React with my favorite component library [Antd](https://ant.design/). Besides being a fan of their syntax and design, I'm also very familiar with the components themselves and their APIs.

For my backend solution, I chose a combination of [GraphQL](https://graphql.org/learn/), [ApolloGQL](https://www.apollographql.com/docs/react/), and [Express](https://expressjs.com/). I've worked with GraphQl and Apollo for about a year now, albeit in a slightly different way than this implementation. I haven't used Express since my time in my Bootcamp. I actually came across [Nodemon](https://nodemon.io/) while working through my projects then! As I said before, I wanted to revisit some technologies I've used in the past to make this project slightly more challenging as I've never worked with GraphQL and Express in conjunction this way before.

### Design Process

Given that this assessment is to give you a better idea of my process, I felt it would be best to explain my entire routine from start to finish.

With all major projects, I feel like to physically write out the key points of the problem, followed by breaking each key point down into actionable tasks. This gives me a clear direction while also serving as a convenient checklist for later.

From there, I draw a crude diagram with what will likely be my first of many designs. This diagram includes everything from the layout and locations of different components, as well as a diagram of different data and states that I expect to be passed between components. I find that besides a checklist, having an image to work against is a huge help.

I chose to start with the backend as that is what I have the least experience in. Ultimately, it was fairly straight forward. The only major stumbling block I came up against was a pesky CORS issue I ran into. Once I was successfully querying my backend and retrieving the screener, it was on to my favorite portion.

I followed the same directory structure I'm used to for the frontend. I like keeping things as organized as possible, so keeping all components in their own directory is important. Another reason I like React, if you export all your components from an index file at the root of your components folder, you're able to import multiple components inline rather than individually from each of their index files.

```
import { Button, Row, Col } from 'components'
                ---vs---
import Button from '../../../Button'
import Row from '../../../Row'
...
```

I initially planned on taking advantage of this before deciding that my `Form` component had become so specialized it wouldn't have made much sense to split it off and instead chose to use that as my `App.js` file essentially.

The biggest challenge came from my Form component actually. I felt the cleanest solution to handle each question would be to map over the questions returned from my `getScreener` query and return a `Form.Item` for each, while subsequently mapping over the each possible answer to render each `Radio.Button`. Here's my first solution:

```
src/Components/ScreenerForm/index.js:L120
 <Form form={form} onFinish={(values) => handleFinish(values)}>
  {data?.screener?.content?.sections[0]?.questions.map((question, i) => {
    return (
      {activeQuestion === i
        ? // REST OF COMPONENTS
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

---

## Regrets / Desired Improvements

## Final Response

As I'm sure you can tell, ultimately I was unable to finish the project. There's a few reasons this is the case. The biggest reason is that I was just put in charge of mobile development this past week. I had heard rumors that we were going to get started, but I didn't expect to be made the lead or to start so soon.

Due to the fact that I was unable to finish, there are a lot of things that go without saying as to what I have done differently if I had additional time to spend on this project. Above all, it most certainly would not look like this. As a frontend developer, I pride myself in creating the most beautiful and pleasing-to-use experiences I can. This is obviously far from what I would describe as even a workable UI/UX.

Beyond the design, the next big thing I would have liked to accomplish was connecting my GraphQL server to an actual database rather that storing everything locally. This was also related to the time constraint my job added to the equation, as I've worked with several databases in the past. I chose to start with my GraphQL server written the way it is now so that I'd have something workable in the hopes that if I had enough time, I could easily extend it's functionality through a server.

Lastly, besides a proper front and backend, I would have liked have hosted the project as well. Again, this is something I have experience with (albeit not much beyond heroku), but I just didn't have the time to get it done.

---

## Links

- [GitHub](https://github.com/jamespericles)
- [LinkedIn](https://www.linkedin.com/in/jamespericlesii/)
- Checkout out my [portfolio](https://jamespericles.github.io/Portfolio/) which contains the code I'm most proud of, excluding the last year of production code I've written, which are in private repositories

---
