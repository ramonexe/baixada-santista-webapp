import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userRole = user.role;

  return allowedRoles.includes(userRole) ? <Outlet /> : <Navigate to="/entrar" />;
};

export default ProtectedRoute;