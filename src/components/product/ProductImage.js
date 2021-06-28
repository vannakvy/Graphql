import {makeStyles} from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import React from 'react'
import {UploadImage} from '../../graphql/imagesGraphql/Mutation'
import { useMutation } from '@apollo/client';
import {UPDATE_IMAGE_URL,GET_ONE_PRODUCT} from '../../graphql/product'
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme=>({
    root:{
        maxWidth: 600,
    },
    btn:{
        backgroundColor: theme.palette.primary
    },
    input: {
      display: 'none',
    },
}))

const ProductImage = ({pro_id,refetch,image}) => {
  const [imageUploader,{data,error}] = useMutation(UploadImage)
  const [updateproductImage,{data:newData}] = useMutation(UPDATE_IMAGE_URL);


    const classes = useStyles()

    const handleUploadImage = (e)=>{
      if(e.target.files.length>0){
        imageUploader({variables:{
          file: e.target.files[0]
        }})
        refetch()
        }
    }

    const editUrl = ()=>{
      if(data?.imageUploader){
        updateproductImage(
          {
            variables:{id:pro_id,file: data?.imageUploader}, refetchQueries: [
              {
            query: GET_ONE_PRODUCT,
            variables: { id: pro_id },
          }]})
      }else{
      }
    refetch()
    }


    return <>
        <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Product Image"
            height="500"
            image={image}
            title="Product Image"
          />
        </CardActionArea>
        <CardActions>
        <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={handleUploadImage}
      />
      <label htmlFor="contained-button-file">
        <Button variant="outlined" color="primary" component="span" >
          Edit  <EditIcon color="primary"/>
        </Button>
      </label>

      <Button onClick={()=>editUrl()} >
        Change
      </Button>
      </CardActions>
      </Card>
    </>
}

export default ProductImage

