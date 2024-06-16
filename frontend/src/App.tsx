import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Providers from "./providers";
import ProtectedRoute from "./components/auth/protected";
import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import DashboardPage from "./pages/dashboard";
import BlogDetailsPage from "./pages/blog/details";
import EditBlogPage from "./pages/blog/edit";
import NewBlogPage from "./pages/blog/new";
import ErrorBoundary from "./components/error-boundary";
import NotFoundPage from "./pages/not-found";
import Layout from "./components/layout";
import SignUpPage from "./pages/signup";
import { Toaster } from "./components/ui/toaster";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
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
    errorElement: <ErrorBoundary />,
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
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

function App() {
  return (
    <Providers>
      <Layout>
        <RouterProvider router={router} />
      </Layout>
      <Toaster />
    </Providers>
  );
}

export default App;
