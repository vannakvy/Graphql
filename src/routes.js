import { Navigate,Outlet } from "react-router-dom";
import DashboardLayout from "src/components/DashboardLayout";
import MainLayout from "src/components/MainLayout";
import Account from "src/pages/Account";
import CustomerList from "src/pages/CustomerList";
import Dashboard from "src/pages/Dashboard";
import Login from "src/pages/Login";
import NotFound from "src/pages/NotFound";
import ProductList from "src/pages/ProductList";
import Register from "src/pages/Register";
import Settings from "src/pages/Settings";
import SupplierList from "src/pages/SupplierList";
import PurchaseList from "src/pages/PurchaseList"
import OrderList from "./pages/OrderList";
import UserList from "./pages/UserList";
import NotificationList from "./pages/NotificationList";
import PromotionList from "./pages/PromotionList";
import ProductDetail from "./pages/ProductDetail";
import OrderDetial from "./pages/OrderDetial";
// import OrderMap from "./components/order/OrderMap";
import Map from "./components/order/Map";
import NotificationDetail from './pages/NotificationDetail'
import UserDetail from "./pages/userDetail";
import CustomerDetail from "./pages/CustomerDetail";

const routes =(isLoggedIn)=> [
  {
    path: "app",
    element: isLoggedIn? <DashboardLayout /> : <Navigate to="/login" /> ,
    children: [
      { path: "account", element: <Account /> },
      { path: "users", element: <UserList /> },
      { path: "promotions", element: <PromotionList /> },
      { path: "notifications", element: <NotificationList /> },
      { path: "customers", element: <CustomerList /> },
      { path: "customer/:id", element: <CustomerDetail /> },
      { path: "purchases", element: <PurchaseList /> },
      { path: "orders", element: <OrderList /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "products", element: <ProductList /> },
      { path: "map/:id", element: <Map /> },
      { path: "notiDetail/:id", element: <NotificationDetail /> },
      { path: "userProfile/:id", element: <UserDetail /> },
     
      { path: "productDetail/:pro_id", element: <ProductDetail /> },
      { path: "orderDetail/:order_id", element: <OrderDetial /> },
      { path: "supplier", element: <SupplierList /> },
      { path: "settings", element: <Settings /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "404", element: <NotFound /> },
      { path: "/", element: <Navigate to="/app/dashboard" /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
];

export default routes;
