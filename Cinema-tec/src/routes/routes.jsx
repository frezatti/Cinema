import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "@/layouts/layout";
import HomePage from "@/features/home";
import MoviesPage from "@/features/movies";
import SessionPage from "@/features/sessions";
import TheaterPage from "@/features/theater";
import TicketsPage from "@/features/tickets";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
        children: [
            {
                index: true,
                Component: HomePage,
            },
            {
                path: "movies",
                Component: MoviesPage,
            },
            {
                path: "theaters",
                Component: TheaterPage,
            },
            {
                path: "sessions",
                Component: SessionPage,
            },
            {
                path: "tickets",
                Component: TicketsPage,
            }
        ],
    },
]);

export const AppRoutes = () => <RouterProvider router={router} />;
