import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { findAll, remove, save, update } from "../services/userService";
import { useDispatch, useSelector } from "react-redux";
import {initialUserForm, addUser,removeUser,updateUser,cargandoUsers,onUserSelectedForm, onOpenForm, onCloseForm, loadingError } from "../store/slices/users/usersSlice";
import { useAuth } from "../auth/hooks/useAuth";


export const useUsers = () => {

    // const [users, dispatch] = useReducer(usersReducer, initialUsers);
    const { users, userSelected, visibleForm, errors, isLoading } = useSelector(state => state.users);
    const dispatch = useDispatch();
    // const [userSelected, setUserSelected] = useState(initialUserForm);
    // const [visibleForm, setVisibleForm] = useState(false);

    // const [errors, setErrors] = useState(initialErrors);

    const naviagte = useNavigate();

    const {login, handlerLogout} = useAuth();

    const getUsers = async () => {
        try {
            const result = await findAll();
            dispatch(cargandoUsers(result.data));
        } catch (error) {
            if(error.response?.status == 401){
                handlerLogout();
            }
        }
    }

    const handlerAddUser = async (user) => {

        if(!login.isAdmin) return;

        let response;

        try {

            if (user.id === 0) {
                response = await save(user);
                dispatch(addUser(response.data))
            } else {
                response = await update(user);
                dispatch(updateUser(response.data));
            }

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
                dispatch(loadingError(error.response.data));
            }else if(error.response && error.response.status == 500 &&
                error.response.data?.message?.includes('constraint')){    
                
                if(error.response.data?.message?.includes('UK_username')){
                    dispatch(loadingError({username: 'El username ya existe!'}))
                }
                if(error.response.data?.message?.includes('UK_email')){
                    dispatch(loadingError({email: 'El email ya existe!'}))
                }            
            } else if(error.response?.status == 401){
                handlerLogout();
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
        }).then(async(result) => {
            if (result.isConfirmed) {

                try {
                    await remove({ id });
                    dispatch(removeUser(id))
    
                    Swal.fire(
                        'Usuario Eliminado!',
                        'El usuario ha sido eliminado con exito!',
                        'success'
                    )
                } catch (error) {
                    if(error.response?.status == 401){
                        handlerLogout();
                    }
                }
            }
        })
    }

    const handlerUserSelectedForm = (user) => {
        // console.log(user);
        // setVisibleForm(true);
        // setUserSelected({ ...user });
        dispatch(onUserSelectedForm({...user}))
    }

    const handlerOpenForm = () => {
        dispatch(onOpenForm())
    }

    const handlerCloseForm = () => {
        // setVisibleForm(false);
        // setUserSelected(initialUserForm);
        dispatch(onCloseForm())
        dispatch(loadingError({}));
    }

    return {
        users,
        userSelected,
        initialUserForm,
        visibleForm,
        errors,
        isLoading,
        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
        getUsers,
    }
}