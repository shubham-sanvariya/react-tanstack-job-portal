import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from "@mantine/core";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";

export const Route = createRootRoute({
    component: () => {
        const queryClient = new QueryClient();
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
                    {/* <div className="p-2 flex gap-2">
                    <Link to={"/"} className="[&.active]:font-bold">
                        Home
                    </Link>{' '}
                </div> */}
                    {/* <div className={'min-h-[100vh] bg-mine-shaft-950 font-[poppins]'}>
                        <DreamJob />
                        <Companies />
                    </div> */}
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