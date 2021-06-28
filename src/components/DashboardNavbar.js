import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import Logo from './Logo';
import {useQuery} from '@apollo/client'
import {GET_NEW_ORDER} from '../graphql/order'
import {isLoggedInVar} from '../cache'

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  // const [notifications] = useState(['ddd', 'dddd']);
  const {data, loading, error} = useQuery(GET_NEW_ORDER,{
    pollInterval: 20000
  });
  const navigate = useNavigate()

  return (
    <AppBar elevation={0} {...rest}>
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden lgDown>
          <IconButton color="inherit">
            <Badge badgeContent={data?.getNewOrder?.num} color="secondary">
              <NotificationsIcon onClick={()=>navigate(`/app/orders/`, { replace: true })} />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <InputIcon color="secondary" onClick={() => {
        // Evict and garbage-collect the cached user object
        // client.cache.evict({ fieldName: "me" });
        // client.cache.gc();
        // Remove user details from localStorage
        localStorage.removeItem("token");
        // Set the logged-in status to false
        isLoggedInVar(false);
      }} />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
