import '@mantine/tiptap/styles.css';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/dates/styles.css'
import '@mantine/notifications/styles.css';

import {createRootRouteWithContext, redirect} from "@tanstack/react-router";
import {getUser} from "../service/userService.ts";
import {UserType} from "../hooks/useAuth.tsx";
import RootComp from "../components/root/rootComp.tsx";

export interface RouterContext {
    user : UserType | null
}

export const Route = createRootRouteWithContext<RouterContext>()({
    beforeLoad: ({location}) => {
        const user = getUser();
        console.log(user);
        const publicRoutes = ['/auth/login', '/auth/signup'];

        const isPublic = publicRoutes.includes(location.pathname);

        if (!user && !isPublic) {
            throw redirect({to: "/auth/login"})
        }else if (user !== null && isPublic){
            throw redirect({ to: "/"})
        }

        return { user };
    },
    component: RootComp
})
