import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation loginUser($password: String!, $username: String!) {
    loginUser(username: $username, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;

export const SIGNUP = gql`
  mutation signup($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

// local only
export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const GET_ALL_USER = gql`
  query allUsers {
    allUsers {
      id
      firstName
      lastName
      email
      username
      tel
      createdAt
      image
      roles {
        role
      }
    }
  }
`;

export const GET_ALL_USER_WITH_PAGINATION = gql`
  query getUserWithPagination($page: Int, $limit: Int,$keyword:String) {
    getUserWithPagination(page: $page, limit: $limit,keyword:$keyword) {
      users {
        id
        firstName
        lastName
        email
        username
        tel
        createdAt
        image
        roles {
          role
        }
      }
      paginator {
        slNo
        currentPage
        totalPages
        hasPrevPage
        hasNextPage
        perPage
        prev
        next
        totalDocs
      }
    }
  }
`;

export const UPDATE_PROFILE_IMAGE = gql`
  mutation updateProfileImage($userId: ID!, $image: String!) {
    updateProfileImage(userId: $userId, image: $image) {
      success
      message
    }
  }
`;

export const GET_ONE_USER = gql`
  query getUserById($userId: String!) {
    getUserById(userId: $userId) {
      id
      firstName
      lastName
      email
      username
      tel
      createdAt
      image
      roles {
        id
        role
      }
    }
  }
`;
export const UPDATE_USER_DETAIL = gql`
  mutation updateUserDetail(
    $userId: ID!
    $email: String!
    $lastName: String!
    $firstName: String!
    $tel: String!
  ) {
    updateUserDetail(
      userId: $userId
      email: $email
      firstName: $firstName
      lastName: $lastName
      tel: $tel
    ) {
      success
      message
    }
  }
`;

export const UPDATE_USER_ACCOUNT = gql`
  mutation updateAccount($userId: ID!, $password: String!, $username: String!) {
    updateAccount(userId: $userId, password: $password, username: $username) {
      success
      message
    }
  }
`;

export const ADD_ROLE = gql`
  mutation addRole($userId: ID!, $role: String!) {
    addRole(userId: $userId, role: $role) {
      success
      message
    }
  }
`;

export const DELETE_ROLE = gql`
  mutation deleteRole($userId: ID!, $roleId: ID!) {
    deleteRole(userId: $userId, roleId: $roleId) {
      success
      message
    }
  }
`;

export const REGISTER_USER = gql`
  mutation registerUser(
    $username: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $email: String!
    $role: String!
    $tel: String!
  ) {
    registerUser(
      newUser:{
        username: $username
        password: $password
        firstName: $firstName
        email: $email
        lastName: $lastName
        role: $role
        tel: $tel
      }
    ) {
      success
      message
    }
  }
`;


export const DELETE_USER = gql`
mutation deleteUser($userId:ID!){
  deleteUser(userId:$userId){
    success 
    message 
  }
  }

`