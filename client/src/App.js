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
import 'bootstrap/dist/css/bootstrap.min.css';


import LandingPage from "./pages/LandingPage/index.js";
import EditEntry from "./pages/EditEntry/index.js";
import Profile from "./pages/Profile/index.js";



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
            <Route path='/' element={<LandingPage />} />
            <Route path='/homepage' element={<Profile />} />
            <Route 
                  path="/entry/:entryId"
                  element={<EditEntry />}
                />
          </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
