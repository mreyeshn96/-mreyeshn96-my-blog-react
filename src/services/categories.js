import axios from 'axios';

export const serviceConfig = {
    API_URL: 'https://localhost:44347/api/Category/'
}

export const getCategories = async () => {
    const { data } = await axios.get(`${serviceConfig.API_URL}`);
    return await data;
}