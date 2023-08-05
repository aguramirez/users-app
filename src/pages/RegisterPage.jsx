import { useEffect, useState } from "react"
import { Userform } from "../components/UserForm"
import { useParams } from "react-router-dom";

export const RegisterPage = ({ handlerAddUser, initialUserForm, users=[] }) => {

    const [userSelected, setUserSelected] = useState(initialUserForm);

    const {id} = useParams();

    useEffect(() => {
        if (id){
            const user = users.find(u => u.id == id) || initialUserForm;
            setUserSelected(user);
        }
    },[id])

    return (
        <div className="container my-4">
            <h4>{userSelected.id > 0 ? 'Editar' : 'Registrar'} Usuario</h4>
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