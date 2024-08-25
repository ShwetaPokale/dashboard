import axios from 'axios';

const API_URL = 'http://localhost:5000/auth';

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password });
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
            return { success: true, data: response.data };
        } else {
            return { success: false, message: 'Login failed.' };
        }
    } catch (error) {
        console.error("Login error:", error);
        return { success: false, message: 'Login failed.' };
    }
};
