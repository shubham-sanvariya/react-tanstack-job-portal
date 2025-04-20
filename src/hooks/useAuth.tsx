import {useQuery, UseQueryResult} from "@tanstack/react-query";
import queryClient from "../service/queryClient.ts";
import {createContext, useContext} from "react";
import {getUser} from "../service/userService.ts";

export interface UserType {
    id: number,
    name: string,
    accountType: string,
    profileId: number
}

type AuthContextProps = {
    userState: UseQueryResult<UserType, Error>,
    logout: () => void
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const logout = () => {
        localStorage.removeItem("user");
        queryClient.removeQueries({
            queryKey: ['user']
        });
    }

    const userState = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
        staleTime: Infinity
    });

    return (
        <AuthContext.Provider value={{ userState, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

const UseAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider')
    return context;
}
export default UseAuth
