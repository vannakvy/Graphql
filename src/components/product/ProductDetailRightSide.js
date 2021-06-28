import React, { useState } from "react";
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  TextField,
  Grid,
  Button,
} from "@material-ui/core";

import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import StarIcon from "@material-ui/icons/Star";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Popup from "../Popup";
import Notify from '../Notify'
import moment from 'moment'

//
import {useMutation} from '@apollo/client'
import {UPDATE_COUNT_IN_STOCK,UPDATE_PRICE} from '../../graphql/product'


//
const ProductDetailRightSide = ({ data,refetch }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [editValue, setEditValue] = useState(0)
  const [input, setInput] = useState("");
  const [notify, setNotify] = React.useState({
    isOpen: false,
    message: "",
    type: "",
  });
 


const [updateProductPrice,{data:priceData}] = useMutation(UPDATE_PRICE)
const [updateProductCountInstock,{data:stockData}] = useMutation(UPDATE_COUNT_IN_STOCK)

console.log(priceData?.updateProductPrice)
  // 
  const handleEdit = (value,type) => {
    setInput(type)
    setEditValue(value)
    setOpenPopup(true);
    console.log(editValue)
  };

  const handleSubmit = async(e)=>{
    e.preventDefault()
    if(input==="" || editValue===""){
        setNotify({
            isOpen: true,
            message: 'The cannot be empty',
            type: 'error'
        })
   
    }else if(input==="stock"){
      await  updateProductCountInstock({variables:{id:data?.id,countInStock: parseInt(editValue)}})
        setNotify({
            isOpen: true,
            message: 'Count In Stock Updated Successfully !',
            type: 'success'
        })
        refetch()
        setOpenPopup(false)
        setEditValue(0)
    }else if(input==="price"){
       await updateProductPrice({variables:{id:data?.id,price:parseInt(editValue)}})

     
           setNotify({
            isOpen: true,
            message: `${priceData?.updateProductPrice.message}`,
            type: `${priceData?.updateProductPrice.success}`
        })

        refetch()
        setOpenPopup(false)
        setEditValue(0)
    }
  
}
  return (
    <>
      <Box sx={{ p: 1 }}>
        <Typography variant="h2">Product Title one </Typography>
      </Box>
      <Box
        sx={{
          p: 1,
        }}
      >
        <List component="nav" aria-label="main">
          <ListItem button>
            <ListItemIcon>Rate</ListItemIcon>
            <ListItemText>
              <StarIcon color="secondary" />
              <StarIcon color="secondary" />
              <StarIcon color="secondary" />
              <StarHalfIcon color="secondary" />
              <StarBorderIcon color="secondary" />
            </ListItemText>
          </ListItem>
          <ListItem button onClick={() => handleEdit(data?.price,"price")}>
            <ListItemIcon>
              <EditOutlinedIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={`Price ${data?.price}`} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>Date</ListItemIcon>
            <ListItemText primary={ moment(data?.createdAt).format('DD/MM/YYYY')} />
          </ListItem>
          <ListItem
            button
            onClick={() => handleEdit(data?.countInStock,"stock")}
          >
            <ListItemIcon>
              <EditOutlinedIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={`InStock ${data?.countInStock}`} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>Cate.</ListItemIcon>
            <ListItemText primary={data?.category} />
          </ListItem>
          <ListItem button>
            <ListItemText>{data?.description}</ListItemText>
          </ListItem>
        </List>
      </Box>
      <Popup
        size="sm"
        title={`Edit ${input}`}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label={input}
                name={input}
                value={editValue}
                onChange={(e)=>setEditValue(e.target.value)}
                variant="outlined"
                type="number"
                size="small"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <Button variant="contained" color="primary" size="small" type="submit">
                Edit {input}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Popup>
      <Notify notify={notify} setNotify={setNotify} />
    </>
  );
};

export default ProductDetailRightSide;
