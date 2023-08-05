import { useState } from "react"
import { Userform } from "../components/UserForm"

export const RegisterPage = ({ handlerAddUser, initialUserForm }) => {

    const [userSelected, setUserSelected] = useState(initialUserForm);

    return (
        <div className="container my-4">
            <h4>Registro de usuarios</h4>
            <div className="row">
                <div className="col">
                    <Userform
                        userSelected={userSelected}
                        handlerAddUser={handlerAddUser}
                        initialUserForm={initialUserForm} />
                </div>
            </div>

        </div>
    )
}