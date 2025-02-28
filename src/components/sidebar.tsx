import { useEffect, useState } from 'react';
import { List as ListIcon, Menu as MenuIcon, Close as CloseIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      setUserRole(user.role || null);
      console.log(user);
    } catch (error) {
      console.error('Erro ao fazer parse do JSON:', error);
      setUserRole(null);
    }
  }, []);

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/entrar');
  };

  return (
    <>
      <MenuButton onClick={handleToggleSidebar} $isOpen={isOpen}>
        {isOpen ? <CloseIcon style={{ fontSize: '2rem' }} /> : <MenuIcon style={{ fontSize: '2rem' }} />}
      </MenuButton>
      <Wrapper $isOpen={isOpen}>
        <Title>Baixada Santista</Title>
        <Item onClick={() => handleNavigate('/produtos')}>
          <ListIcon />Listar Produtos
        </Item>
        {userRole === 'ADMIN' && (
          <Item onClick={() => handleNavigate('/admin/usuarios')}>
            <ListIcon />Listar Usuários
          </Item>
        )}
        <LogoutButton onClick={handleLogout}>
          <ExitToAppIcon /> Sair
        </LogoutButton>
      </Wrapper>
    </>
  );
};

const MenuButton = styled.button<{ $isOpen: boolean }>`
  display: flex;
  background-color: ${({ $isOpen }) => ($isOpen ? 'transparent' : '#f0f0f0')};
  box-shadow: ${({ $isOpen }) => ($isOpen ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.1)')};
  padding-top: 0.5rem;
  border: none;
  cursor: pointer;
  z-index: 1100;

  @media (min-width: 1200px) {
    display: none;
  }
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  margin-bottom: 1rem;
  gap: 0.5rem;
`;

const Item = styled.div`
  padding: 0.5rem;
  border-radius: 0.25rem;
  transition: background-color 0.3s;
  cursor: pointer;
  align-items: center;
  display: flex;
  text-align: center;
  width: 100%;
  color: ${({ theme }) => theme.text};
  font-weight: 800;
  gap: 0.5rem;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const LogoutButton = styled.div`
  padding: 0.5rem;
  border-radius: 0.25rem;
  transition: background-color 0.3s;
  cursor: pointer;
  align-items: center;
  display: flex;
  text-align: center;
  margin-top: auto;
  width: 100%;
  color: ${({ theme }) => theme.text};
  font-weight: 800;
  gap: 0.5rem;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }
  svg {
    margin-right: 0.5rem;
  }
`;

const Wrapper = styled.div<{ $isOpen: boolean }>`
  user-select: none;
  height: 100%;
  width: 250px;
  display: flex;
  text-align: flex-start;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: ${({ $isOpen }) => ($isOpen ? '0' : '-100%')};
  transition: left 0.3s;
  z-index: 999;

  @media (min-width: 1200px) {
    position: static;
    left: 0;
    height: auto;
    transition: none;
  }
`;

export default Sidebar;