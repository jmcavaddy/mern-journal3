import logo from './logo.svg';
import './App.css';

import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from "./components/Navbar/index.js";
import SingleEntry from "./components/SingleEntry/index.js";
import Notes from "./components/pages/index.js";


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path='/' element={<Navbar />} />
          <Route path='/homepage' element={<Notes />} />

          <Route 
                path="/entry/:entryId"
                element={<SingleEntry />}
              />

        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
