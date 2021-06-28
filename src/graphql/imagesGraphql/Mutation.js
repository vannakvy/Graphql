import {gql} from '@apollo/client'

export const UploadImage = gql`
  mutation UploadFile($file: Upload!) {
    imageUploader(file: $file)
  }
`;
