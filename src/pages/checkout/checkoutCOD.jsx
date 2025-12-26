import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

const CheckoutCOD = () => {
    const navigate = useNavigate();
    
    placeOrder = async () => {
        try{
          await api.post("/order/checkout/cod");
          navigate("/order-success");  
        } catch (err) {
            alert("Failed to place order");
        }
    }

    return (
    <div className="p-6 text-center">
      <h1 className="text-xl font-bold mb-4">Pay on Delivery</h1>
      <button
        onClick={placeOrder}
        className="bg-black text-white px-6 py-3 rounded"
      >
        Confirm Order
      </button>
    </div>
    )


}