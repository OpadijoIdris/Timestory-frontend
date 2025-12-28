import api from "./axios";

export const getAdminUsers = async () => {
    const res = await api.get("/user");
    return res.data;
};