import { gql } from "@apollo/client";

export const GET_LATEST_ORDERS = gql`
  query getLatestOrder {
    getLatestOrder {
      id
      createdAt
      totalPrice
      isDelivered
      orderConfirmed
      isPaid
      customer {
        name
        id
      }
      orderItems {
        name
      }
    }
  }
`;

export const CREATE_NEW_ORDER =gql`
  mutation createOrderItem(
      $user_id:ID!,
      $orderItems:[OrderItemInput!]!
      $paymentMethod:String!
      $taxPrice: Int!
      $shippingPrice: Int!
      $totalPrice: Int!
      $address:String!
      $tel:String!
      $email:String
      $long:Float!
      $lat:Float!
    ){
    createOrderItem(user_id:$user_id,
    newOrder: {
      paymentMethod:$paymentMethod
      taxPrice:$taxPrice
      shippingPrice: $shippingPrice
      totalPrice: $totalPrice
      orderItems:$orderItems
      shippingAddress:{
      address:$address
      tel:$tel
      email:$email
      long:$long
      lat:$lat
    }
    }){
      id
    }
  }

  `

export const GET_PRODUCT_SOLD_BY_CATEGORY = gql`
  query classifyNumberOfProductSold{
    classifyNumberOfProductSold{
      grocery,
      drink,
      food
    }
  }
`

export const GET_ALL_ORDERS = gql`
  query getAllOrders {
    allOrders {
      id
      createdAt
      totalPrice
      isDelivered
      orderConfirmed
      isPaid
      customer {
        name
        id
      }
      orderItems {
        name
      }
    }
  }
`;

export const GET_ALL_ORDERS_WITH_PAGINATION = gql`
  query getAllOrderWithPagination( $page:Int!,$limit:Int,$keyword:String,$start_date:String,$end_date:String) {
    getAllOrderWithPagination (limit:$limit,page:$page,keyword:$keyword,start_date:$start_date,end_date:$end_date){
      orders{
      id
      createdAt
      totalPrice
      isDelivered
      orderConfirmed
      isPaid
      customer {
        name
        id
      }
      orderItems {
        name
      }
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

export const GET_ONE_ORDER = gql`
  query getOrderById($id: ID!) {
    getOrderById(id: $id) {
      id
      orderItems {
        name
        qty
        productImage
        salePrice
      }
      customer {
        name
      }
      paymentMethod
      shippingPrice
      totalPrice
      shippingAddress {
        tel
        email
        long
        lat
      }
      taxPrice
      paidAt
      isPaid
      isDelivered
      deliveredAt
      orderConfirmed
      orderConfirmedAt
      createdAt
      updatedAt
    }
  }
`;

export const GET_NEW_ORDER = gql`
  query getNewOrder{
    getNewOrder{
      num
    }
  }
`

export const UPDATE_CONFIRM_ORDER = gql`
  mutation updateOrderConfirmed($id: ID!, $data: Boolean!) {
    updateOrderConfirmed(id: $id, data: $data) {
      success
      message
    }
  }
`;
export const UPDATE_PAID_ORDER = gql`
  mutation updateOrderPaid($id: ID!, $data: Boolean!) {
    updateOrderPaid(id: $id, data: $data) {
      success
      message
    }
  }
`;

export const UPDATE_DELIVER_ORDER = gql`
  mutation updateOrderDelivered($id: ID!, $data: Boolean!) {
    updateOrderDelivered(id: $id, data: $data) {
      success
      message
    }
  }
`;


export const NEW_ORDER = gql`
  subscription newOrder{
    newOrder{
      id
    }
  }
`;

// subscription{
//   newOrder{
//   paymentMethod
//     isPaid
//     id
// }
    
//   }


export const ORDER_STATE_CHANGE = gql`
  subscription orderStateChange($orderId: ID!) {
    orderStateChange(orderId: $orderId) {
      id
      createOrderAt
      title
      description
    }
  }
`;