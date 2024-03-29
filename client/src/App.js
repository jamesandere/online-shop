import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import {ToastContainer} from 'react-toastify';
import Register from './pages/Register';
import Login from './pages/Login';
import CheckoutSuccess from './pages/CheckoutSuccess';
import Dashboard from './admin/Dashboard';
import Products from './admin/Products';
import Summary from './admin/Summary';
import CreateProduct from './/admin/CreateProduct';
import ProductsList from './admin/list/ProductsList';
import Orders from './admin/Orders';
import Users from './admin/Users';
import Product from './pages/Details/Product';
import Order from './pages/Details/Order';
import UserProfile from './pages/Details/UserProfile';

function App() {
  return (
    <div className="">
      <BrowserRouter>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/cart" exact element={<Cart />} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
        <Route path="/register" element={<Register /> } />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/admin" element={<Dashboard />}>
          <Route path="products" element={<Products />}>
            <Route index element={<ProductsList />} />
            <Route path="create-product" element={<CreateProduct />} />
          </Route>
          <Route path="summary" element={<Summary />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not_found" />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
