import axios from 'axios';

export const serviceConfig = {
    API_URL: 'https://react-backend-core.azurewebsites.net/api/Post'
}

export const getPostsByCategory = async (id) => {
    const { data } = await axios.get(`${serviceConfig.API_URL}/category/${id}`);
    return await data;
}

export const createPost = async (cat_id, user_id, object) => {
    const data = {
        categoryId: cat_id,
        title: object.title,
        body: object.body,
        userId: user_id,
    };

    console.log(data);

    return await axios.post(`${serviceConfig.API_URL}/create`, data);

}

export const editPost = async (post_id, cat_id, user_id, object) => {
    const data = {
        categoryId: cat_id,
        title: object.title,
        body: object.body,
        userId: user_id,
    };

    console.log(`${serviceConfig.API_URL}/update/${post_id}`);

    return await axios.put(`${serviceConfig.API_URL}/update/${post_id}`, data);

}


export const getPost = async (id) => {
    const { data } = await axios.get(`${serviceConfig.API_URL}/${id}`);
    return await data;
}

export const deletePost = async (id) => {
    return await await axios.delete(`${serviceConfig.API_URL}/delete/${id}`);;
}