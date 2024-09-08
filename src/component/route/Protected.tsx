import {Navigate} from "react-router-dom";

export type ProtectedProps = {
    isLoggedIn: boolean;
    isAdminLogged?:boolean;
    isAdminProtected?:boolean;
    children: JSX.Element;
}

const Protected = ({isLoggedIn, children, isAdminLogged, isAdminProtected}: ProtectedProps) => {
    if (!isLoggedIn || (isAdminProtected && !isAdminLogged)) {
        return <Navigate to="/" replace/>;
    }
    return children;
};

export default Protected;