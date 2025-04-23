import {Combobox, createTheme, MantineProvider} from "@mantine/core";
import {Outlet, rootRouteId, useRouteContext} from "@tanstack/react-router";
import {Notifications} from "@mantine/notifications";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {QueryClientProvider} from "@tanstack/react-query";
import queryClient from "../../service/queryClient";
import {TanStackRouterDevtools} from "@tanstack/react-router-devtools";
import React, {useMemo} from "react";
import Header from "../header/header.tsx";
import Footer from "../footer/footer.tsx";

const RootComp = React.memo(() => {
    const { user } = useRouteContext({
        from: rootRouteId
    })

    const theme = useMemo(() => createTheme({
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
    }), []);

    return (
        <MantineProvider theme={theme} defaultColorScheme="dark">
            <QueryClientProvider client={queryClient}>
                <Notifications position={"top-center"} zIndex={1000}/>
                <Combobox>
                    {!!user && <Header/>} {/* Use !! to ensure boolean conversion */}
                    <Outlet/>
                    {!!user && <Footer/>}
                </Combobox>
                <TanStackRouterDevtools/>
                <ReactQueryDevtools initialIsOpen={false}/>
            </QueryClientProvider>
        </MantineProvider>
    )
});

export default RootComp;
