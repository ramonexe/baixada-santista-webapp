import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userRole = user.role;
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userRole) {
      navigate('/entrar', { state: { from: location } });
    } else if (!allowedRoles.includes(userRole)) {
      navigate(-1);
    }
  }, [allowedRoles, userRole, navigate, location]);

  return allowedRoles.includes(userRole) ? <Outlet /> : null;
};

export default ProtectedRoute;