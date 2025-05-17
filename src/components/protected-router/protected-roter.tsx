import { useAppSelector } from '@app-store';
import { getChekUser, getName } from '@slices';
import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouterProps = {
  children: React.ReactNode;
  isPublic?: boolean; // Determines if the route is public
};

export function ProtectedRouter({ children, isPublic }: ProtectedRouterProps) {
  const location = useLocation();
  const user = useAppSelector(getName); // Get the user's name
  const userCheck = useAppSelector(getChekUser); // Check if the user is authenticated

  // Show a preloader while user authentication is being checked
  if (!userCheck) {
    return <Preloader />;
  }

  // Redirect unauthenticated users to the login page for private routes
  if (!isPublic && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  // Redirect authenticated users away from public routes
  if (isPublic && user) {
    const from = location.state?.from || { pathname: '/' }; // Default redirect to home
    return <Navigate replace to={from} />;
  }

  // Render the children if no redirection is needed
  return children;
}
