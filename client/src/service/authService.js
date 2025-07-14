import API from "../api/axios";

const login = async (userData) => {
    const res = await API.post('/user/login', userData);
    if (res.data) {
        localStorage.setItem('token', res.data.token);
    }
    return res.data;
}

const register = async (userData) => {
    const res = await API.post('/user/signup', userData);
    if (res.data) {
        localStorage.setItem('token', res.data.token);
    }
    return res.data;
}

const logout = () => {
    localStorage.removeItem('token');
};

export const authService = {
    register,
    login,
    logout
}