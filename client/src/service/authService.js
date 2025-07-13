import API from "../api/axios";

const login = async (userData) => {
    const res = await API.post('/user/login', userData);
    if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data));
    }
    return res.data;
}

const register = async (userData) => {
    const res = await API.post('/user/signup', userData);
    if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data));
    }
    return res.data;
}

const logout = () => {
    localStorage.removeItem('user');
};

export const authService = {
    register,
    login,
    logout
}