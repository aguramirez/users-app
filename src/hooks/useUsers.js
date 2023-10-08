import { useContext, useReducer, useState } from "react";
import { usersReducer } from "../reducers/usersReducer";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { findAll, remove, save, update } from "../services/userService";
import { AuthContext } from "../auth/context/AuthContext";


const initialUsers = [];

const initialUserForm = {
    id: 0,
    username: '',
    password: '',
    email: ''
}
const initialErrors = {
    username: '',
    password: '',
    email: ''
}

export const useUsers = () => {

    const [users, dispatch] = useReducer(usersReducer, initialUsers);
    const [userSelected, setUserSelected] = useState(initialUserForm);
    const [visibleForm, setVisibleForm] = useState(false);

    const [errors, setErrors] = useState(initialErrors);

    const naviagte = useNavigate();

    const {login} = useContext(AuthContext);

    const getUsers = async () => {
        const result = await findAll();
        dispatch({
            type: 'cargandoUsers',
            payload: result.data,
        });
    }

    const handlerAddUser = async (user) => {

        if(!login.isAdmin) return;

        let response;

        try {

            if (user.id === 0) {
                response = await save(user);
            } else {
                response = await update(user);
            }

            dispatch({
                type: (user.id === 0) ? 'addUser' : 'updateUser',
                payload: response.data,
            });

            Swal.fire(
                (user.id === 0) ?
                    'Usuario creado' : 'Usuario actualizado',
                (user.id === 0) ?
                    'El usuario ha sido creado con exito!' : 'El usuario ha sido actaulizado con exito!',
                'success'
            );

            handlerCloseForm();
            naviagte('/users');
        } catch (error) {
            if(error.response && error.response.status == 400){
                setErrors(error.response.data);
            }else if(error.response && error.response.status == 500 &&
                error.response.data?.message?.includes('constraint')){    
                
                if(error.response.data?.message?.includes('UK_username')){
                    setErrors({username: 'El username ya existe!'})
                }
                if(error.response.data?.message?.includes('UK_email')){
                    setErrors({email: 'El email ya existe!'})
                }
            }else{
                throw error;
            }
        }
    }

    const handlerRemoveUser = (id) => {
        if(!login.isAdmin) return;
        Swal.fire({
            title: 'Esta seguro que desea eliminar?',
            text: "Cuidado el usuario sera eliminado!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                remove({ id });
                dispatch({
                    type: 'removeUser',
                    payload: id,
                });

                Swal.fire(
                    'Usuario Eliminado!',
                    'El usuario ha sido eliminado con exito!',
                    'success'
                )
            }
        })
    }

    const handlerUserSelectedForm = (user) => {
        // console.log(user);
        setVisibleForm(true);
        setUserSelected({ ...user });
    }

    const handlerOpenForm = () => {
        setVisibleForm(true);
    }

    const handlerCloseForm = () => {
        setVisibleForm(false);
        setUserSelected(initialUserForm);
        setErrors({});
    }

    return {
        users,
        userSelected,
        initialUserForm,
        visibleForm,
        errors,
        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
        getUsers,
    }
}