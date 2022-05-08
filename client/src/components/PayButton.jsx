import axios from 'axios';
import {url} from '../redux/api';
import { useSelector } from 'react-redux';

const PayButton = ({cartItems}) => {
    const user = useSelector((state) => state.auth);

    const handleCheckout = () => {
        axios.post(`${url}/stripe/create-checkout-session`, {
            cartItems,
            userId: user._id,
        }).then((response) => {
            if(response.data.url){
                window.location.href = response.data.url;
            }
        }).catch((error) => console.log(error.message));
    }
  return (
    <>
    <button onClick={()=> handleCheckout()}>Check out</button>
    </>
  )
}

export default PayButton