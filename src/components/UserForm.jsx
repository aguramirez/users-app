import { useState } from "react";

const initialUserForm = {
    username:'',
    password:'',
    email:''
}
export const Userform = ({handlerAddUser}) => {

    const [userForm, setUserForm] = useState(initialUserForm);

    const {username, password, email} = userForm

    const onInputChange = ({target}) => {
        // console.log(target.value);
        const {name, value} = target;
        setUserForm({
            ...userForm,
            [name]: value,
        })
    }

    const onSubmit = (event) =>{
        event.preventDefault();
        if (!username || !password || !email){
            alert('Debe completar los campos del formulario')
            return
        }
        // console.log(userForm);

        // guardar el user form en el listado de usuarios
        handlerAddUser(userForm);
        setUserForm(initialUserForm);
    }

    return (
        <form onSubmit={onSubmit}>
            <input
                className="form-control my-3 w-75"
                placeholder="Username"
                name="username"
                value={username}
                onChange={onInputChange} />
            <input
                className="form-control my-3 w-75"
                placeholder="Password"
                name="password"
                type="password"
                value={password}
                onChange={onInputChange} />
            <input
                className="form-control my-3 w-75"
                placeholder="Email"
                name="email"
                value={email}
                onChange={onInputChange} />
            <button
                className="btn btn-primary"
                type="submit"
                onChange={onInputChange}>
                Crear
            </button>
        </form>
    )
}