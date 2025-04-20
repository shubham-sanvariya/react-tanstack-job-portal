import '@mantine/tiptap/styles.css';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/dates/styles.css'
import '@mantine/notifications/styles.css';
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {createRootRoute, Outlet, redirect} from "@tanstack/react-router";
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { createTheme, MantineProvider } from "@mantine/core";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import {Notifications} from "@mantine/notifications";
import queryClient from "../service/queryClient.ts";
import {getUser} from "../service/userService.ts";

export const Route = createRootRoute({
    beforeLoad: ( { location } ) => {
        const user = getUser();
        const publicRoutes = ['/auth/login', '/auth/signup'];

        const isPublic = publicRoutes.includes(location.pathname);

        if (!user && !isPublic){
            throw redirect({ to: "/auth/login" })
        }
    },
    component: () => {

        const theme = createTheme({
            focusRing: "never",
            fontFamily: 'poppins, san-serif',
            primaryColor: 'bright-sun',
            primaryShade: 4,
            colors: {
                'mine-shaft': [
                    '#f6f6f6',
                    '#e7e7e7',
                    '#d1d1d1',
                    '#b0b0b0',
                    '#888888',
                    '#6d6d6d',
                    '#5d5d5d',
                    '#4f4f4f',
                    '#454545',
                    '#3d3d3d',
                    '#2d2d2d',
                ],
                'bright-sun': [
                    '#fffbeb',
                    '#fff3c6',
                    '#ffe588',
                    '#ffd149',
                    '#ffbd20',
                    '#f99b07',
                    '#dd7302',
                    '#b75006',
                    '#943c0c',
                    '#7a330d',
                    '#461902',
                ],
            },
        })
        return (
            <MantineProvider theme={theme} defaultColorScheme="dark">

                <QueryClientProvider client={queryClient}>
                    <Notifications position={"top-center"} zIndex={1000}/>

                    <Header/>
                    <Outlet/>
                    <Footer/>
                    <TanStackRouterDevtools />
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </MantineProvider>
        )
    }
})
