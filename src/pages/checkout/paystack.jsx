import { useEffect } from "react";
import api from "../../api/axios";

const Paystack = () => {
    useEffect(() => {
        const initPayment = async () => {
            try{
                const res = await api.post("/order/checkout/paystack");
                window.location.href = res.data.authorization_url;
            } catch (err) {
                alert ("payment initialization failed");
            }
        }

        initPayment();
    }, []);

    return <p className="p-4">Redirecting to Paystack...</p>
};

export default Paystack;