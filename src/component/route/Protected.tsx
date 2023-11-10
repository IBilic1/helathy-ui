import {Navigate} from "react-router-dom";

export type ProtectedProps = {
    isLoggedIn: boolean;
    children: JSX.Element;
}

const Protected = ({isLoggedIn, children}: ProtectedProps) => {
    if (!isLoggedIn) {
        return <Navigate to="/" replace/>;
    }
    return children;
};
export default Protected;