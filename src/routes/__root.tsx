import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
    component: () => {
        const queryClient = new QueryClient();
        return (
            <QueryClientProvider client={queryClient}>
                <div className="p-2 flex gap-2">
                    <Link to={"/"} className="[&.active]:font-bold">
                        Home
                    </Link>{' '}
                </div>
                <Outlet />
                <TanStackRouterDevtools />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        )
    }
})