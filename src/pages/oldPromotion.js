import { Helmet } from "react-helmet";
import React from "react";
import { Box, Container, Grid, Pagination } from "@material-ui/core";
import PromotionListToolbar from "src/components/promotion/PromotionListToolbar";
import ProductCard from "src/components/product//ProductCard";
import products from "src/__mocks__/products";
import PageHeader from "src/components/PageHeader";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";

const PromotionList = () => (
  <>
    <Helmet>
      <title>Promotion | GO GLOBAL MART</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        py: 3,
      }}
    >
      <Container maxWidth={false}>
      <PageHeader
        title="New Promotion "
        subTitle="the Data about the Promotion"
        icon={<PeopleOutlineTwoToneIcon fontSize="small" />}
      />
        <PromotionListToolbar />
        <Box sx={{ pt: 3 }}>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item key={product.id} lg={4} md={6} xs={12}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 3,
          }}
        >
          <Pagination color="primary" count={3} size="small" />
        </Box>
      </Container>
    </Box>
  </>
);

export default PromotionList;
