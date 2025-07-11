
const login = async (userData) => {
    const res = await axios.post('/api/user/login', userData);
    if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data));
    }
    return res.data;
}

const register = async (userData) => {
    const res = await axios.post('/api/user/signup', userData);
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