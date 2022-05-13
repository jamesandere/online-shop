import { useNavigate, Outlet } from "react-router-dom";

const Products = () => {
    const navigate = useNavigate(); 
  return (
    <>
    <h3>Products</h3>
    <button onClick={()=> navigate("/admin/products/create-product")}>Create</button>
    <Outlet />
    </>
  )
}

export default Products