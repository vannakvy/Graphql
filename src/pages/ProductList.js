import { Helmet } from "react-helmet";
import React from "react";
import { Box, Container, Grid, Pagination } from "@material-ui/core";
import ProductListToolbar from "src/components/product/ProductListToolbar";
// import ProductCard from "src/components/product//ProductCard";
import PageHeader from "src/components/PageHeader";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_ALL_PRODUCTS,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  GET_ALL_PRODUCTS_WITH_PAGINATION
} from "../graphql/product";
import Popup from "../components/Popup";
import ConfirmDialog from "../components/ConfirmDialog";
import Notify from "../components/Notify";
import FormProduct from "../components/product/FormProduct";
import ProductListResult from "src/components/product/ProductListResult";
import ReactLoading from "react-loading";




const ProductList = () => {
  const [popup, openPopUp] = React.useState(false);
  const [page, setPage] = React.useState(1)
  const [limit, setLimit] = React.useState(5)
  const [keyword, setKeyword] = React.useState("")
  const [recordForEdit, setRecordForEdit] = React.useState(null);
  const [confirmDialog, setConfirmDialog] = React.useState({
    isOpen: false,
    title: "",
    subTitle: "",
    onConfirm: () => {},
  });
  const [notify, setNotify] = React.useState({
    isOpen: false,
    message: "",
    type: "",
  });


  // const { data, error, loading, refetch } = useQuery(GET_ALL_PRODUCTS,{variables:{type:"",keyword:""}});
  const { data:productData,error,loading,refetch } = useQuery(  GET_ALL_PRODUCTS_WITH_PAGINATION,{variables:{type:"" ,keyword:keyword,limit:limit,page:page}});

  const [createProduct, { data: resData }] = useMutation(CREATE_PRODUCT);
  const [deleteProduct, { data: deleteData }] = useMutation(DELETE_PRODUCT);
  const [updateProduct, { data: updateData }] = useMutation(UPDATE_PRODUCT);
console.log(resData)
  // handle submit for adding the product


  const handleSubmit = (values) => {
    const { productName, productImage, description, category, id } = values;
    if (recordForEdit === null) {
      createProduct({
        variables: {
          productName,
          productImage,
          description,
          category,
        },
        refetchQueries: [{ query: GET_ALL_PRODUCTS_WITH_PAGINATION,variables:{type:"",keyword:keyword,limit:limit,page:page} }],
      });
    } else {
      updateProduct({
        variables: {
          productName,
          productImage,
          description,
          category,
          id,
        },
        refetchQueries: [{ query: GET_ALL_PRODUCTS_WITH_PAGINATION,variables:{type:"",keyword:keyword,limit:limit,page:page} }],
      });
    }
 
    setNotify({
      isOpen: true,
      message: "updated successfully",
      type: resData?.success,
    });
    openPopUp(false)
    refetch();
   
  };

  const handleDelete = (id) => {
    setConfirmDialog({
      isOpen: true,
      title: "Are you sure to delete this record?",
      subTitle: "You can't undo this operation",
      onConfirm: () => {
        deleteProduct({
          variables: { id: id },
          refetchQueries:  [{ query: GET_ALL_PRODUCTS_WITH_PAGINATION,variables:{type:"",keyword:keyword,limit:limit,page:page} }],
        });
        setNotify({
          isOpen: true,
          message: deleteData?.message,
          type: deleteData?.success,
        });
        setConfirmDialog({
          ...confirmDialog,
          isOpen: false,
        });
      },
    });

    refetch();
  };
  const handleEdit = (product) => {
    setRecordForEdit(product);
    openPopUp(true);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  
  };

  const handleChangeRowsPerPage = (event) => {
    setLimit(+event.target.value);
    // setPage(1);
  };

  
  React.useEffect(() =>{
    refetch()
  },[page,keyword,limit])
{error && <ReactLoading color="red" type="spinningBubbles" />}
{error && <h4>Cannot access the data , please contact the admin</h4>}
{loading && <ReactLoading color="blue" type="spinningBubbles" />}
  return (
    <>
      <Helmet>
        <title>Products | GO GLOBAL MART</title>
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
            title="New Product "
            subTitle="the Data about the Product"
            icon={<ShoppingBasketIcon fontSize="large" />}
          />
          <ProductListToolbar openPopup={openPopUp} setKeyword={setKeyword} />
          <Box sx={{ pt: 3 }}>
            <ProductListResult
              data={productData?.getProductsWithPagination}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              limit={limit}
              page={page}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Box>
        </Container>
      </Box>
      <Popup title="Product Form" openPopup={popup} setOpenPopup={openPopUp}>
        <FormProduct 
          submitProduct={handleSubmit}
          setRecordForEdit={setRecordForEdit}
          recordForEdit={recordForEdit}
        />
      </Popup>
      <ConfirmDialog
        setConfirmDialog={setConfirmDialog}
        confirmDialog={confirmDialog}
      />
      <Notify notify={notify} setNotify={setNotify} />
    </>
  );
};

export default ProductList;
