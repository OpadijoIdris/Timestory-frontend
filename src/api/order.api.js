import api from "./axios";

export const checkoutCOD = async () => {
    const { data } = await api.post("/order/checkout/cod");
    return data;
};

export const getPurchaseSummary = async () => {
    const res = await api.get("/order/admin/summary");
    return res.data;
};

export const getAdminOrders = async ( params = {}) => {
    const res = await api.get("/order/admin", { params });
    return res.data;
}

export const getAdminOrderDetails = async (orderId) => {
    const res = await api.get(`/order/admin/${orderId}`);
    return res.data;
};

export const updateOrderStatus = async (orderId, payload) => {
    const res = await api.put(`/order/admin/${orderId}/status`, payload);
    return res.data;
};