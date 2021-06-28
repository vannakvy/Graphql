import React,{useState} from 'react'
import { Helmet } from "react-helmet";
import ReactLoading from "react-loading";
import { Box, Container } from "@material-ui/core";
import UserListResults from "src/components/user/UserListResults";
import UserListToolbar from "src/components/user/UserListToolbar";

import PageHeader from "../components/PageHeader";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import { useQuery ,useMutation} from "@apollo/client";
import {GET_ALL_USER_WITH_PAGINATION, REGISTER_USER, DELETE_USER } from "../graphql/auth";
import ConfirmDialog from '../components/ConfirmDialog'
import Notify from '../components/Notify'
import Popup from '../components/Popup'
import UserForm from 'src/components/user/UserForm';

const UserList = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [keyword,setKeyword] = useState("")
  const [openForm, setOpenForm] = React.useState(false)
  const [notify, setNotify] = React.useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [confirmDialog, setConfirmDialog] = React.useState({
    isOpen: false,
    title: "",
    subTitle: "",
    onConfirm: () => {},
  });

  const [deleteUser,{data:deleteData}] = useMutation(DELETE_USER);
  const { data:dataWithPagination,error, loading, refetch } = useQuery(GET_ALL_USER_WITH_PAGINATION,{variables:{
    page:page,
    limit:limit,
    keyword:keyword
  },fetchPolicy:"network-only"});



  const [registerUser,{data:registerData}] = useMutation(REGISTER_USER,{refetchQueries:[
    {query:GET_ALL_USER_WITH_PAGINATION,variables:{ page:page,
      limit:limit}}
  ]})

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
 const handleKeywordChange = (newKeyword)=>{
    setKeyword(newKeyword)
 }



  React.useEffect(() =>{
    const reGetData = async()=>{
     await refetch()
    }
    reGetData()
  },[limit,page,keyword])

  const handleDelete = (id)=>{
    if(id){

      setConfirmDialog({
        isOpen: true,
        title: "Are you sure to delete this record?",
        subTitle: "You can't undo this operation",
        onConfirm: () => {
         

          deleteUser({
            variables:{
              userId: id
            },
            refetchQueries:[
            {query:GET_ALL_USER_WITH_PAGINATION,variables:{ page:page,
              limit:limit}}
          ]
          
          })

        
          setNotify({
            isOpen: true,
            message: "User Deleted Successfully !",
            type: "error",
          });
          setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
          });

        }
      })
    }else{
      alert('this user is not existed')
    }
  
  }

  {error && <ReactLoading color="red" type="spinningBubbles" />}
  {error && <h4>Cannot access the data , please contact the admin</h4>}
  {loading && <ReactLoading color="blue" type="spinningBubbles" />}
  return <>

      <Helmet>
        <title>User | GO GLOBAL MART</title>
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
            title="New User "
            subTitle="the Data about the User "
            icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
          />
          <UserListToolbar setOpenForm={setOpenForm} handleKeywordChange={handleKeywordChange} />
          <Box sx={{ pt: 3 }}>
            <UserListResults handleDelete={handleDelete} handlePageChange={handlePageChange} handleLimitChange={handleLimitChange} limit={limit} setLimit={setLimit} page={page} setPage={setPage} data={dataWithPagination?.getUserWithPagination}  />
          </Box>
        </Container>
      </Box>
   
<Popup title="User Form" openPopup={openForm} setOpenPopup={setOpenForm} size="large">
<UserForm registerUser={registerUser} setOpenForm={setOpenForm} setNotify={setNotify} refetch={refetch} />
</Popup>
<ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <Notify notify={notify} setNotify={setNotify} />
  </>;
};

export default UserList;
