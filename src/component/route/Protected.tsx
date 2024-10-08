import {useNavigate} from "react-router-dom";

export type ProtectedProps = {
    isAdminProtected?: boolean;
    isAdminAuthenticated?: boolean;
    isAuthenticated?: boolean;
    isSystemUserAuthenticated?: boolean;
    isSystemUserProtected?: boolean;
    children: JSX.Element;
}

const Protected = ({
                       children,
                       isAdminProtected,
                       isAuthenticated,
                       isAdminAuthenticated,
                       isSystemUserProtected,
                       isSystemUserAuthenticated
                   }: ProtectedProps) => {
    const navigate = useNavigate();
    if (!isAuthenticated || (isAdminProtected && !isAdminAuthenticated) || (isSystemUserProtected && !isSystemUserAuthenticated)) {
        navigate("/error");
    }

    return children;
};

export default Protected;