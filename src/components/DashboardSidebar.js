import React, { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
} from "@material-ui/core";
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
} from "react-feather";
import NavItem from "./NavItem";
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ShopIcon from '@material-ui/icons/Shop';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
// import ava from './download.png';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
const user = {
  avatar: "https://scontent-sin6-3.xx.fbcdn.net/v/t1.6435-9/98944826_2637547379849206_1440173281050099712_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=8bfeb9&_nc_ohc=n5nrdyC3fmwAX9iC7Lt&_nc_ht=scontent-sin6-3.xx&oh=838e6d463c89e4d2937c95ce72a340d2&oe=60D0E68B",
  jobTitle: "Software Developer",
  name: "វី​ វណ្ណះ",
};

const items = [
  {
    href: "/app/dashboard",
    icon: BarChartIcon,
    title: "Dashboard",
  },
  {
    href: "/app/customers",
    icon: UsersIcon,
    title: "អតិថិជន",
  },
  {
    href: "/app/products",
    icon: ShoppingBagIcon,
    title: "ផលិតផល",
  },
  // {
  //   href: "/app/account",
  //   icon: UserIcon,
  //   title: "គណនី",
  // },
  {
    href: "/app/settings",
    icon: SettingsIcon,
    title: "ការកែប្រែ",
  },
  // {
  //   href: "/login",
  //   icon: LockIcon,
  //   title: "ចូលគណនី",
  // },
  // {
  //   href: "/register",
  //   icon: UserPlusIcon,
  //   title: "បង្កើតគណនី",
  // },
  {
    href: "/app/notifications",
    icon: NotificationsNoneIcon,
    title: "ការតឿនហេតុ",
  },
  {
    href: "/app/promotions",
    icon: ExitToAppIcon,
    title: "ប្រូមូសិនពិសេស",
  },
  {
    href: "/app/purchases",
    icon: ShopIcon,
    title: "ការបញ្ចាទិញ់",
  },
  {
    href: "/app/orders",
    icon: ShoppingCartIcon,
    title: "ការកម្មង់",
  },
  {
    href: "/app/supplier",
    icon: PermIdentityIcon,
    title: "អ្នកផ្គត់ផ្គង់",
  },
  {
    href: "/app/users",
    icon: AlertCircleIcon,
    title: "គណនីបុគ្គលិក",
  },
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          p: 2,
        }}
      >
        <Avatar
          component={RouterLink}
          src={user.avatar}
          sx={{
            cursor: "pointer",
            width: 64,
            height: 64,
          }}
          to="/app/account"
        />
        <Typography color="textPrimary" variant="h5">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box
        sx={{
          backgroundColor: "background.default",
          m: 2,
          p: 2,
        }}
      >
        <Typography align="center" gutterBottom variant="h4">
          ADMINISTRATOR
        </Typography>
        <Typography align="center" variant="body2">
          If you have any problem with the system please contact the
          administrator for help
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 2,
          }}
        >
          <Button
            color="primary"
            component="a"
            href="http://www.go-globalschool.com/contact-us/"
            variant="contained"
          >
            Contact Now
          </Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256,
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: "calc(100% - 64px)",
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default DashboardSidebar;
