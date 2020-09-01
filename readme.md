# **Grocery List**

(68248247cd23ebffaa256f583e0e4ce05b4a0b86)

 - The repository is a "monorepo" with two modules `api` and `frontend`.
 - The modules have separate `package.json` files.  We can run tests or
   start commands in both modules from the main folder using commands 
   `npm start` and `npm test`.
 - `npm install` in the main folder will install all the dependencies in
   both modules.

## Frontend

 - Frontend boilerplate has been generated using [Create React
   App](https://create-react-app.dev/).
 - I used [Redux](https://react-redux.js.org/) for state management and
   [Redux Thunk](redux-thunk) to manage side effects (api calls).
 - There are unit tests for main reducer + tests using React Testing
   Library for all the components.
 - There is only minimal styling using basic CSS.
 - The frontend adhere to [optimistic UI](https://www.smashingmagazine.com/2016/11/true-lies-of-optimistic-user-interfaces/) principles.

To improve:

 - more advanced styling (Styled Components or Sass)
 - use PropTypes for prop checks.
 - better handling of server errors (and side effects of optimistic updates )
   (rollback,  api calls queuing )

## Api

 - Api uses simple node [express](http://expressjs.com/) server to serve the api
 - Data is stored in memory. 
 - It includes Unit tests.
 - There is no docker, and The api is served via localhost.

