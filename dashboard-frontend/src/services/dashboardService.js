import axios from 'axios';

const API_URL = 'http://localhost:5000'; 

export const getSections = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/sections`, {
            headers: { 'user-id': userId },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch sections');
    }
};

export const getCategories = async (userId, sectionId) => {
    try {
        const response = await axios.get(`${API_URL}/categories/user/${userId}/section/${sectionId}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch categories');
    }
};

export const getAllCategories = async () => {
    try {
        const response = await axios.get(`${API_URL}/categories`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all categories');
    }
};

export const getCharts = async () => {
    try {
        const response = await axios.get(`${API_URL}/charts`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch charts');
    }
};

export const getDataSourcebyType = async (market) => {
    try {
      const response = await axios.get(`${API_URL}/data-sources/${market}`);
      return response.data;
    } catch (error) {
        console.error('fail to fetch data getDataSourcebyType:', error);
        throw error;
    }
  };

  export const getDataSources = async () => {
    try {
        const response = await axios.get(`${API_URL}/data-sources`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data source:', error);
        throw error;    
    }
};
