import api from "./axios";

export const getCategories = async () => {
    const res = await api.get("/category")
    return res.data.data;
};

export const createCategory = async (categoryData) => {
    const res = await api.post("/category", categoryData)
    return res.data;
};
