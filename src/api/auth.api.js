import api from "./axios";

export const loginUser = async (data) => {
    const res = await api.post("/auth/login", data);
    return res.data;
};

export const registerUser = async (data) => {
    const res = await api.post("/auth/register", data);
    return res.data;
}

export const logoutUser = async () => {
    const res = await api.post("/auth/logout");
    return res.data;
};

export const verifyEmail = async (data) => {
    const res = await api.post("/auth/verify-email", data);
    return res.data;
};

export const resendVerificationEmail = async (data) => {
    const res = await api.post("/auth/resend-email", data);
    return res.data;
};

export const forgotPassword = async (data) => {
    const res = await api.post("/auth/forgot-password", data);
    return res.data;
};

export const resetPassword = async (data) => {
    const res = await api.post("/auth/reset-password", data);
    return res.data;
};