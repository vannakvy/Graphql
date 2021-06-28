import PropTypes from "prop-types";

import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Controls from "../controls/Controls";
import CloseIcon from "@material-ui/icons/Close";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { makeStyles } from "@material-ui/core/styles";
import {useNavigate} from 'react-router-dom'

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import GetAppIcon from "@material-ui/icons/GetApp";

const ProductCard = ({handleEdit, handleDelete,product, ...rest }) => {
  const navigate = useNavigate()
  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
        {...rest}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pb: 1,
            }}
          >
            <img
              src="http://96.9.90.104:5000/Screenshot_-5--1621317265353.png"
              alt="image"
              width={"20%"}
              height={"30%"}
            />
          </Box>
          <Typography
            align="center"
            color="textPrimary"
            gutterBottom
            variant="h4"
          >
            {product.productName}
          </Typography>
          <Typography align="center" color="textPrimary" variant="body1">
            {product.description}
          </Typography>
        </CardContent>
        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ p: 2 }}>
          <Grid container spacing={2} sx={{ justifyContent: "flex-end" }}>
            <Grid
              item
              sx={{
                alignItems: "center",
                display: "flex",
              }}
            >
              <Controls.ActionButton color="primary" onClick={()=>handleEdit(product)}>
                <EditOutlinedIcon fontSize="small" />
              </Controls.ActionButton>
              <Controls.ActionButton color="secondary" onClick={()=>handleDelete(product.id)}>
                <CloseIcon fontSize="small" />
              </Controls.ActionButton>
              <Controls.ActionButton onClick={()=>navigate(`/app/productDetail/${product.id}`, { replace: true })}>
                <MoreVertIcon size="small" />
              </Controls.ActionButton>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductCard;
