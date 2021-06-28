import { gql } from "@apollo/client";

export const GET_TOTAL_CUSTOMER = gql`
  query totalCustomer {
    totalCustomer
  }
`;

export const ALL_CUSTOMER = gql`
  query allCustomers {
    allCustomers {
      address
      createdAt
      customerImage
      email
      id
      lat
      long
      name
      tel
      token
      uid

      createdAt
    }
  }
`;

export const ALL_CUSTOMER_WITH_PAGINATION = gql`
  query getCustomerWithPagination ($page:Int,$limit:Int,$keyword:String){
    getCustomerWithPagination (page:$page, limit:$limit,keyword:$keyword){
      customers{
        address
      createdAt
      customerImage
      email
      id
      lat
      long
      name
      tel
      token
      uid
      createdAt
      }
      paginator{
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

export const GET_MY_ORDER = gql`
  query getMyOrder($user_id: ID!) {
    getMyOrder(user_id: $user_id) {
        createdAt
        id
        isDelivered
        isPaid
        orderConfirmed
        taxPrice
        shippingPrice
        deliveredAt
        totalPrice
        createdAt
 

    }
  }
`;


export const GET_CUSTOMER_BY_ID = gql`
   query getCustomerById($id:ID!){
        getCustomerById(id:$id){
    id
    name
    email
    tel
    uid
    token

  }
    }

`

export const UPDATE_CUSTOMER_BY_ID = gql`
  mutation updateCustomer(
    $id: ID!
    $name: String
    $tel: String
    $email: String
    $customerImage: String
  ) {
    updateCustomer(
      id: $id
      updatedCustomer: {
        name: $name
        tel: $tel
        email: $email
        customerImage: $customerImage
      }
    ){
      success
      message 
    }
  }
`;