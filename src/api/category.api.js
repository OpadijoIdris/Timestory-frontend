import api from "./axios";

export const getCategories = async () => {
    const res = await api.get("/category")
    return res.data.data;
};

export const createCategory = async (categoryData) => {
    const res = await api.post("/category", categoryData)
    return res.data;
};

export const updateCategory = async (id, formData) => {
    const res = await api.put(`/category/${id}`, formData);
    return res.data;
};

export const deleteCategory = async (id) => {
    const res = await api.delete(`/category/${id}`);
    return res.data;
}
