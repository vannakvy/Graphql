import React from "react";
import { Helmet } from "react-helmet";
import { Box, Container, CircularProgress } from "@material-ui/core";
import SupplierListResults from "src/components/supplier/SupplierListResults";
import SupplierListToolbar from "src/components/supplier/SupplierListToolbar";

import PageHeader from "../components/PageHeader";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import Popup from "../components/Popup";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_SUPPLIER,
  DELETE_SUPPLIER,
  UPDATE_SUPPLIER,
  GET_ALL_SUPPLIERS_WITH_PAGINATION
} from "../graphql/supplier";
import FormSupplier from "src/components/supplier/FormSupplier";
import ConfirmDialog from "../components/ConfirmDialog";
import Notify from "src/components/Notify";
const Supplier = () => {
  const [popup, openPopUp] = React.useState(false);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [keyword, setKeyword] = React.useState("")

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
  const [createSupplier,{data:createdData}] = useMutation(CREATE_SUPPLIER);
  const [deleteSupplier,{data:deletedData}] = useMutation(DELETE_SUPPLIER);
  const [updateSupplier,{data:updatedData}] = useMutation(UPDATE_SUPPLIER);

  
  const { data:paginateData, refetch, loading ,error } = useQuery(GET_ALL_SUPPLIERS_WITH_PAGINATION,{variables:{
    page:page,
    keyword:keyword,
    limit:limit
  }});


  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    setPage(0)
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage +1);
    
  };
  const handleKeywordChange = (keyword)=>{
    setKeyword(keyword)
  
  }
  

  const handleSubmit = async (values) => {
    const {
      firstName,
      lastName,
      tel,
      houseNumber,
      village,
      commune,
      district,
      province,
      gender,
      email,
    } = values;
    if(recordForEdit!==null){
      updateSupplier({
        variables: {
          firstName,
          lastName,
          tel,
          houseNumber: parseInt(houseNumber),
          village,
          commune,
          district,
          province,
          gender,
          email,
          id:recordForEdit.id
        },
        refetchQueries: [
          { query:GET_ALL_SUPPLIERS_WITH_PAGINATION,
           variables:{
          page:page,
          keyword:keyword,
          limit:limit
        }}],
      });
      setNotify({
        isOpen: true,
        message: "Message updated",
        type: "success",
      });
    }else{
      createSupplier({
        variables: {
          firstName,
          lastName,
          tel,
          houseNumber: parseInt(houseNumber),
          village,
          commune,
          district,
          province,
          gender,
          email,
        },
        refetchQueries: [
          { query:GET_ALL_SUPPLIERS_WITH_PAGINATION,
           variables:{
          page:page,
          keyword:keyword,
          limit:limit
        }}],
      });
      refetch()
      setNotify({
        isOpen: true,
        message: "Message Created",
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
        deleteSupplier({
          variables: { id: id },
          refetchQueries: [
            { query:GET_ALL_SUPPLIERS_WITH_PAGINATION,
             variables:{
            page:page,
            keyword:keyword,
            limit:limit
          }}],
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
        refetch();
      },
    });
  };
  React.useEffect(() =>{
    refetch()
  },[page, limit, keyword])


  
  // if (loading) return <CircularProgress size="4rem" />;
  return (
    <>
      <Helmet>
        <title>suppliers | GO GLOBAL MART</title>
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
            title="New Supplier "
            subTitle="the Data about the Supplier"
            icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
          />
          <SupplierListToolbar handleKeywordChange={handleKeywordChange}  setOpenForm={openPopUp} />
          <Box sx={{ pt: 3 }}>
              <SupplierListResults 
              handlePageChange={handlePageChange} 
              handleLimitChange={handleLimitChange}
                limit={limit} page={page}
                handleEdit={openInPopup}
                data={paginateData?.getSupplierWithPagination}
                handleDelete={handleDelete}
              />
          </Box>
        </Container>
      </Box>
      <Popup title="Supplier Form" openPopup={popup} setOpenPopup={openPopUp}>
        <FormSupplier submitSupplier={handleSubmit} recordForEdit={recordForEdit} setRecordForEdit={setRecordForEdit} />   
      </Popup>
      <ConfirmDialog
        setConfirmDialog={setConfirmDialog}
        confirmDialog={confirmDialog}
      />
      <Notify notify={notify} setNotify={setNotify} />
    </>
  );
};

export default Supplier;
