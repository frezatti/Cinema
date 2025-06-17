import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "../layouts/layout";
import { Home } from "../features/home/pages/HomePage";
import { Movies } from "../features/movies/pages/movies";
import { Theaters } from "../features/theater/pages/theater";
import { Sessions } from "../features/sessions/pages/session";
import { Tickets } from "../features/tickets/pages/tickets";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: "movies",
                Component: Movies,
            },
            {
                path: "theaters",
                Component: Theaters,
            },
            {
                path: "sessions",
                Component: Sessions,
            },
            {
                path: "tickets",
                Component: Tickets,
            }
        ],
    },
]);

export const AppRoutes = () => <RouterProvider router={router} />;
