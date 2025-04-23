import '@mantine/tiptap/styles.css';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/dates/styles.css'
import '@mantine/notifications/styles.css';

import {createRootRouteWithContext, redirect} from "@tanstack/react-router";
import {getUser} from "../service/userService.ts";
import RootComp from "../components/root/rootComp.tsx";
import {QueryClient} from "@tanstack/react-query";
import queryClient from "../service/queryClient.ts";
import {UserType} from "../types/profileType.ts";

export interface RouterContext {
    user : UserType | null,
    queryClient : QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
    beforeLoad : async ({location}) => {
        const user = await queryClient.fetchQuery({
            queryKey: ["user"],
            queryFn: getUser,
            staleTime: Infinity
        });
        console.log(user);
        const publicRoutes = ['/auth/login', '/auth/signup'];

        const isPublic = publicRoutes.includes(location.pathname);

        if (!user && !isPublic) {
            throw redirect({to: "/auth/login"})
        }else if (user !== null && isPublic){
            throw redirect({ to: "/"})
        }

        return { user, queryClient };
    },
    component: RootComp
})
