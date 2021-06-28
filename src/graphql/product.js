import { gql } from "@apollo/client";


export const GET_ALL_PRODUCTS = gql`
  query getAllProducts ($type:String,$keyword:String){
    allProducts (type:$type,keyword:$keyword){
      id
      productName
      countInStock
      rating
      numOfReview
      productImage
      category
      description
      price
      review {
        name
        rating
        comment
      }
    }
  }
`;

export const GET_ALL_PRODUCTS_WITH_PAGINATION = gql`
  query getProductsWithPagination ($keyword:String,$page:Int, $limit:Int,){
    getProductsWithPagination (keyword:$keyword,page:$page,limit:$limit){
      products{
        id
      productName
      countInStock
      rating
      numOfReview
      productImage
      category
      description
      price
      review {
        name
        rating
        comment
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


export const GET_TOTAL = gql`
  query totalProduct{
    totalProduct
  }
`;


export const GET_TOP_PRODUCTS = gql`
  query getTopProducts{
    getTopProducts {
      id
      productName
      countInStock
      rating
      numOfReview
      productImage
      category
      description
      review {
        name
        rating
        comment
      }
    }
  }
`;
export const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $productName: String!
    $productImage: String!
    $category: String!
    $description: String
  ) {
    createProduct(
      newProduct: {
        productName: $productName
        productImage: $productImage
        category: $category
        description: $description
      }
    ) {
      success
      message
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $id:ID!
    $productName: String!
    $productImage: String!
    $category: String!
    $description: String
  ) {
    updateProduct(
      updatedProduct: {
        productName: $productName
        productImage: $productImage
        category: $category
        description: $description
      },id:$id
    ) {
      success
      message
    }
  }
`;
export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      success
      message
    }
  }
`;

export const UPDATE_COUNT_IN_STOCK = gql`
  mutation updateProductCountInstock($id: ID!,$countInStock: Int!){
    updateProductCountInstock(id:$id,countInStock:$countInStock){
      success
      message 
    }
  }
`  
export const UPDATE_PRICE = gql`
  mutation updateProductPrice($id: ID!,$price: Int!){
    updateProductPrice(id:$id,price:$price){
      success 
      message 
    }
  }
`


export const DELETE_COMMENT = gql`
  mutation deleteReview($id: ID!,$user_id:ID!){
    deleteReview(id:$id,user_id:$user_id){
      success
      message 
    }
  }
`


export const GET_ONE_PRODUCT = gql`
  query getProductById($id:ID!){
    getProductById(id:$id){
      id
    productName
    countInStock
    rating 
    numOfReview 
    productImage 
    category 
    description
    price
    createdAt
    updatedAt
    review{
      id
      name
    rating
    comment
    user{
      id
    }
    }
    }
  }
`
export const UPDATE_IMAGE_URL =gql`
  mutation updateproductImage($id:ID!,$file:String!){
    updateproductImage(id:$id,file:$file){
      success
      message
    }
  }

`

// input ProductInput{
//     productName :String!
//     productImage :String!
//     category :String!
//     description :String
//     }

// id:ID!
// productName
// countInStock: Int!
// rating :Int!
// numOfReview :Int!
// productImage :String!
// category :String!
// description :String!
// review: [Review!]!

// type Review{
//     name:String!
//     rating:Int
//     comment: String!
//     user : User!

// }
