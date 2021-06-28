import { gql } from "@apollo/client";
export const GET_ALL_SUPPLIERS = gql`
  query allSuppliers {
    allSuppliers {
      id
      firstName
      lastName
      tel
      houseNumber
      village
      commune
      district
      province
      createdAt
      updatedAt
      imageUrl
      email
      gender
    }
  }
`;

export const GET_ALL_SUPPLIERS_WITH_PAGINATION = gql`
  query getSupplierWithPagination ($page:Int!, $limit:Int!, $keyword:String){
    getSupplierWithPagination (page:$page,limit:$limit, keyword:$keyword){

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

suppliers{
    id
    firstName,
    lastName,
    tel,
    houseNumber,
     village,
     commune,
     district,
     province,
    createdAt,
    updatedAt,
    imageUrl,
    email,
    gender
}
    }
  }
`;

export const DELETE_SUPPLIER = gql`
  mutation deleteSupplier($id: ID!) {
    deleteSupplier(id: $id) {
      success
      message
    }
  }
`;

export const UPDATE_SUPPLIER = gql`
  mutation UpdateSupplier(
    $firstName: String!
    $lastName: String!
    $tel: String!
    $houseNumber: Int
    $village: String!
    $commune: String!
    $district: String!
    $province: String!
    $imageUrl: String
    $email: String
    $gender: String
    $id: ID!
  ) {
    updateSupplier(
      updatedSupplier: {
        firstName: $firstName
        lastName: $lastName
        tel: $tel
        houseNumber: $houseNumber
        village: $village
        commune: $commune
        district: $district
        province: $province
        email: $email
        imageUrl: $imageUrl
        gender: $gender
      }
      id: $id
    ) {
      success
      message
    }
  }
`;

export const CREATE_SUPPLIER = gql`
  mutation createSupplier(
    $firstName: String!
    $lastName: String!
    $tel: String!
    $houseNumber: Int
    $village: String!
    $commune: String!
    $district: String!
    $province: String!
    $imageUrl: String
    $email: String
    $gender: String
  ) {
    createSupplier(
      newSupplier: {
        firstName: $firstName
        lastName: $lastName
        tel: $tel
        houseNumber: $houseNumber
        village: $village
        commune: $commune
        district: $district
        province: $province
        email: $email
        imageUrl: $imageUrl
        gender: $gender
      }
    ) {
      id
    }
  }
`;

// export const CREATE_POST = gql`
// mutation CreatePost($title:String!,$content:String!){
//     createPost(
//           newPost:{
//               title: $title,
//               content: $content
//           }
//         ){
//             title
//         }
//     }
//   `
