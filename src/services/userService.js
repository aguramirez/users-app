import usersApi from "../apis/UsersApi";

const BASE_URL = '';

// const config = () => {
//     return {
//         headers: {
//             "Authorization": sessionStorage.getItem('token'),
//             "Content-Type": "application/json",
//         }
//     }
// } 

export const findAll = async () => {
    try {
        const response = await usersApi.get(BASE_URL);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const save = async ({ username, email, password, admin }) => {
    try {
        return await usersApi.post(BASE_URL, {
            username: username,
            email: email,
            password: password,
            admin,
        });
    } catch (error) {
        throw error;
    }
}

export const update = async ({ id, username, email, admin }) => {
    try {
        return await usersApi.put(`${BASE_URL}/${id}`, {
            username,
            email,
            admin
            //password: 'nothing', //provisorio para que valide en el formulario update, de todas formas en el backend no hace update en el password
        });
    } catch (error) {
        throw error;
    }
}

export const remove = async ({ id }) => {
    try {
        await usersApi.delete(`${BASE_URL}/${id}`)
    } catch (error) {
        throw error;
    }
}