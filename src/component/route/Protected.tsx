import {useNavigate} from "react-router-dom";

export type ProtectedProps = {
    isAdminProtected?: boolean;
    isAdminAuthenticated?: boolean;
    isAuthenticated?: boolean;
    children: JSX.Element;
}

const Protected = ({children, isAdminProtected, isAuthenticated, isAdminAuthenticated}: ProtectedProps) => {
    const navigate = useNavigate();
    console.log(isAuthenticated);
    if (!isAuthenticated || (isAdminProtected && !isAdminAuthenticated)) {
        console.log("123");
        navigate("/");
    }

    return children;
};

export default Protected;