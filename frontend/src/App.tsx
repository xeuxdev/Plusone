import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/auth/protected";
import UnProtectedRoute from "./components/auth/un-protected";
import ErrorBoundary from "./components/error-boundary";
import { Toaster } from "./components/ui/toaster";

import Layout from "./components/layout/layout";

import DashboardPage from "./pages/dashboard";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import NotFoundPage from "./pages/not-found";
import BlogDetailsPage from "./pages/posts/details";
import EditBlogPage from "./pages/posts/edit";
import NewBlogPage from "./pages/posts/new";
import SignUpPage from "./pages/signup";
import Providers from "./providers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/login",
        element: (
          <UnProtectedRoute>
            <LoginPage />
          </UnProtectedRoute>
        ),
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },

      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/p/:id",
        element: <BlogDetailsPage />,
      },
      {
        path: "/p/:id/edit",
        element: (
          <ProtectedRoute>
            <EditBlogPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/p/new",
        element: (
          <ProtectedRoute>
            <NewBlogPage />
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

function App() {
  return (
    <Providers>
      <RouterProvider router={router} />
      <Toaster />
    </Providers>
  );
}

export default App;
