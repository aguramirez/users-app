import { Navigate, Route, Routes } from "react-router-dom"
import { UsersPage } from "../pages/UsersPage"
import { NavBar } from "../components/layout/NavBar"
import { RegisterPage } from "../pages/RegisterPage"

export const UserRoutes = ({ login, handlerLogout }) => {

    return (
        <>
            <NavBar login={login} handlerLogout={handlerLogout} />
            <Routes>
                <Route path="users" element={<UsersPage />} />
                <Route path="users/register" element={<RegisterPage
                    handlerAddUser={handlerAddUser}
                    initialUserForm={initialUserForm} />} />
                <Route path="/" element={<Navigate to="/users" />} />
            </Routes>
        </>
    )
}