import React from 'react'

import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CustomerListResults from 'src/components/customer/CustomerListResults';
import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';

import PageHeader from "../components/PageHeader";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import {ALL_CUSTOMER_WITH_PAGINATION } from 'src/graphql/customer';
import { useQuery } from '@apollo/client';
import ReactLoading from 'react-loading'
const CustomerList = () => { 
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [keyword, setKeyword] = React.useState("");

  const {data,error,loading, refetch} = useQuery(ALL_CUSTOMER_WITH_PAGINATION,{
    variables:{
      page:page,
      limit:limit,
      keyword: keyword
    }
  })



  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleKeywordChange = (keyword) => {
    setKeyword(keyword)
  };
React.useEffect(() => {
  refetch()
},[page,limit,keyword])

{loading && <ReactLoading color="blue" type="spinningBubbles" />}
{error && <ReactLoading color="blue" type="spinningBubbles" />}
  return <>
    <Helmet>
      <title>Customers | GO GLOBAL MART</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
      <PageHeader
        title="New Customer "
        subTitle="the Data about the Customer"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />
        <CustomerListToolbar handleKeywordChange={handleKeywordChange} />
        <Box sx={{ pt: 3 }}>
          <CustomerListResults limit={limit} page={page} data={data?.getCustomerWithPagination} handleLimitChange={handleLimitChange} handlePageChange={handlePageChange} />
        </Box>
      </Container>
    </Box>
  </>
}

export default CustomerList;
