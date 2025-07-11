import axios from '../../utils/axios';

const register = async (userData) => {
    const res = await axios.post('/api/user/signup', userData);
    if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data));
    }
    return res.data;
}

export const authService = {
    register
}