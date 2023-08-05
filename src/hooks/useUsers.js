import { useReducer, useState } from "react";
import { usersReducer } from "../reducers/usersReducer";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const initialUsers = [
    {
        id: 1,
        username: 'agustin',
        password: '12345',
        email: 'agustin@correo.com'
    },
    {
        id: 2,
        username: 'Charles',
        password: '12345',
        email: 'charles@correo.com'
    },
    {
        id: 3,
        username: 'Max',
        password: '12345',
        email: 'max@correo.com'
    },
    {
        id: 4,
        username: 'Mick',
        password: '12345',
        email: 'mick@correo.com'
    },
];

const initialUserForm = {
    id: 0,
    username: '',
    password: '',
    email: ''
}

export const useUsers = () => {

    const [users, dispatch] = useReducer(usersReducer, initialUsers);
    const [userSelected, setUserSelected] = useState(initialUserForm);
    const [visibleForm, setVisibleForm] = useState(false);
    const naviagte = useNavigate();

    const handlerAddUser = (user) => {

        dispatch({
            type: (user.id === 0) ? 'addUser' : 'updateUser',
            payload: user
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
    }

    const handlerRemoveUser = (id) => {

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

                dispatch({
                    type: 'removeUser',
                    payload: id
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
    }

    return {
        users,
        userSelected,
        initialUserForm,
        visibleForm,
        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
    }
}