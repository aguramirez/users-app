import { useReducer } from "react"
import { LoginPage } from "./auth/pages/LoginPage"
import { UsersPage } from "./pages/UsersPage"
import { loginReducer } from "./auth/reducers/LoginReducer"
import Swal from "sweetalert2"

const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
    isAuth: false,
    user: undefined,
}

export const UsersApp = () => {

    const [login, dispatch] = useReducer(loginReducer, initialLogin);

    const handlerLogin = ({username, password}) => {
        if(username === 'admin' && password === '12345'){
            const user = {username: 'admin'}
            dispatch({
                type: 'login',
                payload: user,
            });
            sessionStorage.setItem('login', JSON.stringify({
                isAuth: true,
                user: user,
            }));
        }else{
            Swal.fire('Error Login', 'Username o password invalidos', 'error');
        }
    }
    return (
        <>
            {login.isAuth ? <UsersPage /> : <LoginPage handlerLogin={handlerLogin} /> }
            
        </>
    )

}