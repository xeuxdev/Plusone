import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/auth/protected";
import UnProtectedRoute from "./components/auth/un-protected";
import ErrorBoundary from "./components/error-boundary";
import { Toaster } from "./components/ui/toaster";
import BlogDetailsPage from "./pages/blog/details";
import EditBlogPage from "./pages/blog/edit";
import NewBlogPage from "./pages/blog/new";
import DashboardPage from "./pages/dashboard";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import NotFoundPage from "./pages/not-found";
import SignUpPage from "./pages/signup";
import Providers from "./providers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
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
      <RouterProvider router={router} />
      <Toaster />
    </Providers>
  );
}

export default App;
