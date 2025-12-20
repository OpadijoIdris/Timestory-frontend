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