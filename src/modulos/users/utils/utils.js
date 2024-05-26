import { urbanHiveApi } from '../../../api/api';

export const getUsers = async () => {
    try {
        // Recuperar el access_token del almacenamiento local
        const accessToken = localStorage.getItem('access_token');

        // Configurar el header de autorización con el access_token
        const config = {
            headers: { Authorization: `Bearer ${accessToken}` }
        };

        // Hacer la petición con el header de autorización
        const response = await urbanHiveApi.get('/user', config);
        const { data } = response;
        return data;
    } catch (error) {
        console.error('Get users error:', error);
    }
};

export const editUser = async (name, username, id) => {
    try {
        const accessToken = localStorage.getItem('access_token');
        const config = {
            headers: { Authorization: `Bearer ${accessToken}` }
        };

        const response = await urbanHiveApi.put(`/user/${id}`, {
            name,
            username,
        }, config);

        const { data } = response;

        if (response.status != 200) {
            throw new Error(data.message || 'Edit user failed');
        }
    } catch (error) {
        console.error('Edit user error:', error);
    }
}

export const changePassword = async (id, password) => {
    try {
        const accessToken = localStorage.getItem('access_token');
        const config = {
            headers: { Authorization: `Bearer ${accessToken}` }
        };

        const response = await urbanHiveApi.put(`/user/${id}/password`, {
            password,
        }, config);

        const { data } = response;

        if (response.status != 200) {
            throw new Error(data.message || 'Change password failed');
        }
    } catch (error) {
        console.error('Change password error:', error);
    }
}

export const createUser = async (name, username, password) => {
    try {
        const accessToken = localStorage.getItem('access_token');
        const config = {
            headers: { Authorization: `Bearer ${accessToken}` }
        };

        const response = await urbanHiveApi.post('/user', {
            name,
            username,
            password,
        }, config);

        const { data } = response;

        console.log(response);

        if (response.status != 201) {
            throw new Error(data.message || 'Create user failed');
        } else {
            return response.status;
        }
    } catch (error) {
        console.error('Create user error:', error);
    }
}