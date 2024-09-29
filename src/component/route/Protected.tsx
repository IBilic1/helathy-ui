import {useNavigate} from "react-router-dom";

export type ProtectedProps = {
    isAdminProtected?: boolean;
    isAdminAuthenticated?: boolean;
    isAuthenticated?: boolean;
    children: JSX.Element;
}

const Protected = ({children, isAdminProtected, isAuthenticated, isAdminAuthenticated}: ProtectedProps) => {
    const navigate = useNavigate();
    if (!isAuthenticated || (isAdminProtected && !isAdminAuthenticated)) {
        navigate("/error");
    }

    return children;
};

export default Protected;