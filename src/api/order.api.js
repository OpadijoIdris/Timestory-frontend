import api from "./axios";

export const checkoutCOD = async () => {
    const { data } = await api.post("/order/checkout/cod");
    return data;
};