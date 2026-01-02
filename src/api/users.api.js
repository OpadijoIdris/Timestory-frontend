import api from "./axios";

export const getAdminUsers = async () => {
    const res = await api.get("/user");
    return res.data;
};

export const updateUser = async (id, data) => {
    const res = await api.put(`/user/${id}`, data);
    return res.data;
}