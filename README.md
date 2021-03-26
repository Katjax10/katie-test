# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

## Run npm install to instal node modules

### To run app -> run  `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Notes

- I would have implemented querying with graphql, but for sake of time, I used the built in fetchAPI
- There is a common data table component that takes in props. The details page, and intial Github search page uses this component
- I ran out of time to write unit tests, but if I had time I would test the business logic around the table
    ex:sorting the right way, the error states are rendered when theres no data
- Known issue - github api throws 403 when there are too many queries on search. Just wait a few seconds
on the table page and refresh. There is a default query so that the page is populate on load.
