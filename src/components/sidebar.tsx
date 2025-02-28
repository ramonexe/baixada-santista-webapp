import { useState } from 'react';
import { List as ListIcon, Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false); // Fechar o sidebar ao navegar
  };

  return (
    <>
      <MenuButton onClick={handleToggleSidebar} $isOpen={isOpen}>
        {isOpen ? <CloseIcon style={{ fontSize: '2rem' }}/> : <MenuIcon style={{ fontSize: '2rem' }}/>}
      </MenuButton>
      <Wrapper $isOpen={isOpen}>
        <Title>Admin Panel</Title>
        <Item onClick={() => handleNavigate('/admin/produtos')}>
          <ListIcon />Listar Produtos
        </Item>
        <Item onClick={() => handleNavigate('/admin/usuarios')}>
          <ListIcon />Listar Usuários
        </Item>
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