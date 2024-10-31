import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { UserProvider, DataProvider } from './datas/context';
import Dashboard from './components/screens/Dashboard';
import Login from './components/screens/SignIn';
import ErrorPage from './components/screens/ErrorPage';
import SignUp from './components/screens/SignUp';

const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      errorElement: <ErrorPage />
    },
    {
      path: "/signup",
      element:<SignUp />,
      errorElement: <ErrorPage />
    }
  ])
  
export default function App() {

  return (
    <UserProvider>
      <DataProvider>
        <RouterProvider router={router} />
      </DataProvider>
    </UserProvider>
  );
}