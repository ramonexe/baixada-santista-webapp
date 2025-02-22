import { List } from '@mui/icons-material';
import styled from 'styled-components';

const Sidebar = () => {
    return (
        <Wrapper>
            <Title>Admin Panel</Title>
            <Item><List />Listar Produtos</Item>
            <Item><List />Listar Usuários</Item>
        </Wrapper>
    );
};

const Title = styled.h1`
    color: ${({ theme }) => theme.text};
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

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 250px;
  display: flex;
  text-align: flex-start;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: #f0f0f0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

export default Sidebar;