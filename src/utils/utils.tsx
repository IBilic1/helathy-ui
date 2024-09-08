import {useGetUserQuery} from "../store/query/auth.query";

export const useRole = () => {
    console.log("ivana");
    const {data: user} = useGetUserQuery();
    console.log(user);
    return user?.role === 'ADMIN'
}