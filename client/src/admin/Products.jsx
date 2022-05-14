import { useNavigate, Outlet } from "react-router-dom";
import { AdminHeaders, PrimaryButton } from "./CommonStyled";

const Products = () => {
    const navigate = useNavigate(); 
  return (
    <>
    <AdminHeaders>
    <h3>Products</h3>
    <PrimaryButton onClick={()=> navigate("/admin/products/create-product")}>Create</PrimaryButton>
    </AdminHeaders>
    <Outlet />
    </>
  )
}

export default Products