import { gql } from '@apollo/client';

//profile mutation

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      profile {
        _id
      }
    }
  }
`;

export const ADD_PROFILE = gql`
  mutation addProfile($username: String!, $password: String!) {
    addProfile(username: $username, password: $password) {
      token
      profile {
        _id
        username
      }
    }
  }
`;

export const ADD_ENTRY = gql`
mutation  AddEntry($entryTitle: String!, $entryContent: String!) {
  addEntry(entryTitle: $entryTitle, entryContent: $entryContent) {
    _id
    createdAt
    entryAuthor
    entryContent
    entryTitle
  }
}
`;

export const EDIT_ENTRY = gql`
mutation EditEntry($entryId: ID!, $entryTitle: String!, $entryContent: String!) {
  editEntry(entryId: $entryId, entryTitle: $entryTitle, entryContent: $entryContent) {
    _id
    createdAt
    entryAuthor
    entryContent
    entryTitle
  }
}
`;

export const REMOVE_ENTRY = gql`
mutation removeEntry($entryId: ID!) {
  removeEntry(entryId: $entryId) {
    _id
  }
}
`;