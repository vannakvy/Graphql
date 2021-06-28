import React from "react";
import { Helmet } from "react-helmet";
import { Box, Container, CircularProgress } from "@material-ui/core";
// import SupplierListResults from "src/components/supplier/SupplierListResults";
// import SupplierListToolbar from "src/components/supplier/SupplierListToolbar";

import PageHeader from "../components/PageHeader";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import Popup from "../components/Popup";
import { useMutation, useQuery } from "@apollo/client";
import PurchaseListToolbar from '../components/purchase/PurchaseListToolbar'
import PurchaseListResults from '../components/purchase/PurchaseListResults'
import {
  CREATE_PURCHASE,
  GET_ALL_PURCHASES,
  DELETE_PURCHASE,
  UPDATE_PURCHASE,
  GET_ALL_WITH_PAGINATE
} from "../graphql/purchase";
import PurchaseFormModal from '../components/purchase/PurchaseFormModal'
import ConfirmDialog from "../components/ConfirmDialog";
import Notify from "src/components/Notify";
const Purchase = () => {
const [page,setPage] = React.useState(1)
const [limit , setLimit] = React.useState(10) 
const [keyword, setKeyword] = React.useState("")
  const [popup, openPopUp] = React.useState(false);
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

  const [recordForEdit, setRecordForEdit] = React.useState(null)

  const { data, loading,error, refetch } =
    useQuery(GET_ALL_PURCHASES);

    const [createPurchase,{data:createData}] = useMutation(CREATE_PURCHASE)
    const [updatePurchase,{data:updateData,error: updateError}] = useMutation(UPDATE_PURCHASE)
    const [deletePurchase,{data:deleteData}] = useMutation(DELETE_PURCHASE)
    const {data:paginatorData} = useQuery(GET_ALL_WITH_PAGINATE,{variables:{
      page:page,
      limit:limit,
      keyword:keyword
    }});

    console.log(paginatorData)
  const handleSubmit = async (values) => {
    const {
      qty,
      price,
      product,
      supplier
    } = values;
    if(recordForEdit!==null){
      updatePurchase({
        variables: {
          qty :parseInt(qty),
          product ,
          price:parseInt(price) ,
          supplier,
        id:recordForEdit.id
        },
        refetchQueries: [{ query: GET_ALL_PURCHASES }],
      });
      setNotify({
        isOpen: true,
        message: "Message updated",
        type: "success",
      });
    }else{
      createPurchase({
        variables: {
          qty :parseInt(qty),
          product ,
          price:parseInt(price) ,
          supplier
        },
        refetchQueries: [{ query: GET_ALL_PURCHASES }],
      });
      refetch()
      setNotify({
        isOpen: true,
        message: "Purchase  Created",
        type: "success",
      });
    }
    openPopUp(false);
   
  };



  //for editing the form
  const openInPopup = (item) => {
    setRecordForEdit(item);
    openPopUp(true);
  };


  const handleDelete = async (id) => {
    setConfirmDialog({
      isOpen: true,
      title: "Are you sure to delete this record?",
      subTitle: "You can't undo this operation",
      onConfirm: () => {
        deletePurchase({
          variables: { id: id },
          refetchQueries: [{ query: GET_ALL_PURCHASES}],
        });
        setConfirmDialog({
          ...confirmDialog,
          isOpen: false,
        });
        setNotify({
          isOpen: true,
          message: "Deleted Successfully",
          type: "error",
        });
        // refetch();
      },
    });
  };


  if(updateError) return <h3>Cannot Update the purchase</h3>

  if (loading) return <CircularProgress size="4rem" />;
  return (
    <>
      <Helmet>
        <title>Purchases | GO GLOBAL MART</title>
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
            title="New Purchase "
            subTitle="the Data about the Purchase"
            icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
          />
          <PurchaseListToolbar openform={openPopUp} />
          <Box sx={{ pt: 3 }}>
      {data?.allPurchases? 
              <PurchaseListResults
                handleEdit={openInPopup}
                purchases={data.allPurchases}
                handleDelete={handleDelete}
              />: <h3>error</h3>
      }
          </Box>
        </Container>
      </Box>
      <Popup title="Purchase Form" openPopup={popup} setOpenPopup={openPopUp}>
        <PurchaseFormModal submitPurchase={handleSubmit} recordForEdit={recordForEdit} setRecordForEdit={setRecordForEdit} />   
      </Popup>
      <ConfirmDialog
        setConfirmDialog={setConfirmDialog}
        confirmDialog={confirmDialog}
      />
      <Notify notify={notify} setNotify={setNotify} />
    </>
  );
};

export default Purchase;
