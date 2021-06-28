import { gql } from "@apollo/client";
export const GET_ALL_NOTIFICATIONS = gql`
  query allNotifications {
    allNotifications {
      id
      eventType
      user{
          id
          username
      }
      message
    }
  }
`;


export const DELETE_NOTIFICATION = gql`
  mutation deleteNotification($id: ID!) {
    deleteNotification(id: $id) {
      success
      message
    }
  }
`;

export const UPDATE_NOTIFICATION = gql`
  mutation UpdateNotification(
    $eventType: String!
    $user: String!
    $message: String!
    $id: ID!
  ) {
    updateNotification(
      updatedSupplier: { eventType: $eventType, message: $message, user: $user }
      id: $id
    ) {
      success
      message
    }
  }
`;


export const GET_ONE_NOTIFICATION = gql`
  query getNotificationById($id:ID!){
    getNotificationById(id:$id){
          id
          eventType
          message
          allClient
          user{
            id
            username
          }
      }
  }
`