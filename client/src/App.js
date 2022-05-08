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
        <Route path="*" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not_found" />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
