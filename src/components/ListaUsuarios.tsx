import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { listarUsuarios } from '../services/axiosServices';

interface User {
  id: number;
  nickname: string;
  email: string;
  role: string;
  ativo: boolean;
}

const ListaUsuarios: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await listarUsuarios();
        setUsers(users);
      } catch (error) {
        console.error('Error listing users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Container>
      <Title>Usuários</Title>
      <ItemList>
        {users.map((user) => (
          <Item key={user.id}>
            <strong>Nickname:</strong> {user.nickname}<br />
            <strong>Email:</strong> {user.email}<br />
            <strong>Role:</strong> {user.role}<br />
            <strong>Ativo:</strong> {user.ativo ? 'Sim' : 'Não'}
          </Item>
        ))}
      </ItemList>
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Item = styled.li`
  padding: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};

  &:last-child {
    border-bottom: none;
  }
`;

export default ListaUsuarios;