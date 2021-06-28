import React from "react";
import {
  Grid,
  Paper,
  Container,
  Box,
  makeStyles,
  Typography,
  LinearProgress,
} from "@material-ui/core";
import Helmet from "react-helmet";
import PageHeader from "../components/PageHeader";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import ProductImage from "src/components/product/ProductImage";
import ProductDetailRightSide from "src/components/product/ProductDetailRightSide";
import Comment from "src/components/product/Comment";
import CommentIcon from "@material-ui/icons/Comment";
import { useQuery } from "@apollo/client";
import { GET_ONE_PRODUCT } from "../graphql/product";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  let { pro_id } = useParams();

  const { data, error, loading, refetch } = useQuery(GET_ONE_PRODUCT, {
    variables: { id: pro_id },
  });

  if (error) return null;
  return (
    <>
      <Helmet>
        <title>Product Detail | GO GLOBAL MART</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 2,
        }}
      >
        <Container maxWidth={false}>
          <PageHeader
            title="Product Detail "
            subTitle="The Detail of the product"
            icon={<ShoppingBasketIcon color="primary" fontSize="large" />}
          />
        </Container>
        <Box
          sx={{
            marginTop: 1,
            px: 3,
            mt: 2,
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12} md={5}>
              <ProductImage pro_id={pro_id} refetch={refetch} image={data?.getProductById?.productImage} />
              <Box
                sx={{
                  marginTop: 1,
                }}
              >
                <Typography variant="subtitle1" color="primary">
                  {" "}
                  <CommentIcon /> Client Comments{" "}
                </Typography>
                <Comment
                  data={data?.getProductById?.review}
                  refetch={refetch}
                  pro_id={pro_id}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              <ProductDetailRightSide
                data={data?.getProductById}
                refetch={refetch}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default ProductDetail;
