import {gql} from '@apollo/client'


export const GET_ALL_SUPPLIERS = gql`
query allSuppliers {
    allSuppliers{
        id
    }

}
 
`

// export const GET_ALL_PRODUCT = gql`
// query allProducts{
//     allProducts{
//         id,
//         productName
//     }
// }
 

