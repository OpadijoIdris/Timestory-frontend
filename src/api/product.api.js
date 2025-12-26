import api from "./axios";
export const getProducts = async ({
    page = 1,
    limit = 10,
    search,
    category,
    minPrice,
    maxPrice,
    sort,
} = {}) => {
    const params = {
        page, 
        limit,
        search,
        category,
        minPrice,
        maxPrice,
        sort,
    };

    const res = await api.get("/product", { params });
    return res.data;
}

export const createProduct = async (formData) => {
    const res = await api.post("/product/create", formData);
    return res.data;
};

export const updateProduct = async (id, formData) => {
    const res = await api.put(`/product/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });

    return res.data;
}

export const deleteProduct = async (id) => {
    const res = await api.delete(`/product/${id}`);
    return res.data;
};

export const getAdminProducts = async (params) => {
    const res = await api.get("/product/admin", { params });
    return res.data;
};

export const getProduct = async (id) => {
    const res = await api.get(`/product/${id}`);
    console.log('API response for getProduct:', res.data);
    return res.data;
};