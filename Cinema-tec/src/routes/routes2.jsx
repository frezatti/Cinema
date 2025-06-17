import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "../layouts/layout";
import { Home } from "../features/home/pages/HomePage";
import { Movies } from "../features/movies/pages/MoviesPage";
import { Theaters } from "../features/theater/pages/theater";
import { Sessions } from "../features/sessions/pages/session";
import { Tickets } from "../features/tickets/pages/tickets";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/movies",
                element: <Movies />,
            },
            {
                path: "/theaters",
                element: <Theaters />,
            },
            {
                path: "/sessions",
                element: <Sessions />,
            },
            {
                path: "/tickets",
                element: <Tickets />,
            }
        ],
    },
]);

export const AppRoutes = () => <RouterProvider router={router} />;
