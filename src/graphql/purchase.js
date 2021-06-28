import { gql } from "@apollo/client";
export const GET_ALL_PURCHASES = gql`
  query allPurchases {
    allPurchases {
      qty
      price
      id
      createdAt
      updatedAt
      supplier {
        id
        firstName
        lastName
      }
      product {
        id
        productName
        productImage
      }
    }
  }
`;

/// get the total budget from the purchases 
export const BUDGET = gql`
  query budgets{
    budgets{
      sum
    }
  }
`
export const GET_ALL_WITH_PAGINATE = gql`
  query getPurchaseWithPagination($page: Int, $limit: Int,$keyword:String) {
    getPurchaseWithPagination(page: $page, limit: $limit,keyword:$keyword) {
      purchases {
        qty
        price
        id
        createdAt
        updatedAt
        supplier {
          id
          firstName
          lastName
        }
        product {
          id
          productName
          productImage
        }
      }
      paginator {
      hasPrevPage
      hasNextPage
      perPage
      next
      slNo
      totalPages
      currentPage
      totalPages
      totalDocs
      }
    }
  }
`;

export const DELETE_PURCHASE = gql`
  mutation deletePurchase($id: ID!) {
    deletePurchase(id: $id) {
      success
      message
    }
  }
`;

export const UPDATE_PURCHASE = gql`
  mutation UpdatePurchase(
    $qty: Int!
    $price: Int!
    $supplier: String!
    $product: String!
    $id: ID!
  ) {
    updatePurchase(
      updatedPurchase: {
        qty: $qty
        price: $price
        supplier: $supplier
        product: $product
      }
      id: $id
    ) {
      success
      message
    }
  }
`;

export const CREATE_PURCHASE = gql`
  mutation createPurchase(
    $qty: Int!
    $price: Int!
    $supplier: String!
    $product: String!
  ) {
    createPurchase(
      newPurchase: {
        qty: $qty
        price: $price
        supplier: $supplier
        product: $product
      }
    ) {
      success
      message
    }
  }
`;
