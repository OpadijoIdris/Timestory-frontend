import api from "./axios";

export const fetchCartCount = async () => {
    const res = await api.get("/cart/count");
    return res.data.count
};

export const addToCart = async (productId, quantity) => {
    const res = await api.post("/cart/add", { 
        productId, 
        quantity 
    });
    return res.data;
};

export const getCart = async () => {
    const res = await api.get("/cart");
    return res.data;
};

export const removeFromCart = async (productId) => {
    await api.delete(`/cart/remove/${productId}`);
}