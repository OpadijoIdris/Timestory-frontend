import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../api/axios";
import { useCart } from "../../context/CartContext";

const PaystackCallBack = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { updateCartCount } = useCart;

    const [status, setStatus] = useState("Verifying");

    useEffect(() => {
        const reference = searchParams.get("reference");
        if(!reference) {
            navigate("/");
            return;
        }
        const verifyPayment = async () => {
            try{
                const res = await api.get(`/order/paystack/verify?reference=${reference}`);

                if(res.data.paymentStatus === "paid") {
                    await updateCartCount();
                    navigate("/order-success", {
                        state: { orderId: res.data.orderId},
                    }) 

                } else {
                    setTimeout(verifyPayment, 2000);
                }
                if(res.data.paymentStatus === "failed") {
                    navigate("checkout?payment=failed");
                    return;
                }
            } catch (err) {
                status("failed")
            }
        }
        verifyPayment();
    }, []);

    if(status === "failed") {
        return <p className="p-4">Payment verification failed</p>
    }
    return <p className="p-4">Verifying payment...</p>
}

export default PaystackCallBack;