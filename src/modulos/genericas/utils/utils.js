import { urbanHiveApi } from "../../../api/api";

export const getGenericas = async () => {
    try {
        const accessToken = localStorage.getItem('access_token');
        const config = {
            headers: { Authorization: `Bearer ${accessToken}` }
        };

        const response = await urbanHiveApi.get('/valores_parametro', config);

        const { data } = response;

        if (response.status != 200) {
            throw new Error(data.message || 'Get genericas failed');
        }

        return data;
    } catch (error) {
        console.error('Get genericas error:', error);
    }
}

export const editGenerica = async (idAuxiliar, idParametro, nombre, descripcion, precio, cantidad, nombre_imagen, id) => {
    try {
        const accessToken = localStorage.getItem('access_token');
        const config = {
            headers: { Authorization: `Bearer ${accessToken}` }
        };

        const response = await urbanHiveApi.put(`/valores_parametro/${id}`, {
            id_aux: idAuxiliar,
            id_parametro: idParametro,
            valor: nombre,
            valorx: descripcion,
            valory: precio,
            valorz: cantidad,
            valora: nombre_imagen,
        }, config);

        const { data } = response;

        if (response.status != 200) {
            throw new Error(data.message || 'Edit generica failed');
        }
    } catch (error) {
        console.error('Edit generica error:', error);
    }
}

export const addGenerica = async (idAuxiliar, idParametro, nombre, descripcion, precio, cantidad) => {
    try {
        const accessToken = localStorage.getItem('access_token');
        const config = {
            headers: { Authorization: `Bearer ${accessToken}` }
        };

        const response = await urbanHiveApi.post('/valores_parametro', {
            id_aux: idAuxiliar,
            id_parametro: idParametro,
            valor: nombre,
            valorx: descripcion,
            valory: precio,
            valorz: cantidad,
            estado: 1,
        }, config);

        const { data } = response;

        if (response.status != 201) {
            throw new Error(data.message || 'Add generica failed');
        }
    } catch (error) {
        console.error('Add generica error:', error);
    }
}