import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { listarUsuarios } from '../services/axiosServices';
import { Cancel, CheckCircle, Edit } from '@mui/icons-material';
import axiosInstance from '../api/axiosConfig';
import Modal from 'react-modal';
import Tooltip from '@mui/material/Tooltip';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from '@mui/material/Link';

interface User {
  cpf: string;
  id: number;
  nickname: string;
  email: string;
  senha: string;
  senhaNova: string;
  senhaConfirmacao: string;
  role: string;
  ativo: boolean;
}

const ListaUsuarios: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const loggedInUserId = JSON.parse(localStorage.getItem('user') || '{}').id;

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

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setErrorMessage(null);
  };

  const handleSave = async () => {
    if (selectedUser) {
      try {
        if (selectedUser.senhaNova !== selectedUser.senhaConfirmacao) {
          setErrorMessage('As senhas não coincidem.');
          return;
        }

        await axiosInstance.put(`/usuario/editar/${selectedUser.id}`, {
          nickname: selectedUser.nickname,
          email: selectedUser.email,
          cpf: selectedUser.cpf,
          senha: selectedUser.senha,
          senhaNova: selectedUser.senhaNova,
          role: selectedUser.role,
          ativo: selectedUser.ativo,
        });
        handleCloseModal();
        const updatedUsers = await listarUsuarios();
        setUsers(updatedUsers);
      } catch (error) {
        if ((error as any).response && (error as any).response.data) {
          setErrorMessage((error as any).response.data);
        } else {
          setErrorMessage('Erro ao editar usuário.');
        }
        console.error('Erro ao editar o usuário:', error);
      }
    }
  };

  const handleToggleActive = async (user: User) => {
    try {
      await axiosInstance.put(`/usuario/editar/${user.id}`, {
        ...user,
        ativo: !user.ativo,
      });
      const updatedUsers = await listarUsuarios();
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Erro ao alterar status do usuário:', error);
    }
  };

  const mapRoleToLabel = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'ADMINISTRADOR';
      case 'STOCKIST':
        return 'ESTOQUISTA';
      default:
        return role;
    }
  };

  const filteredUsers = searchTerm
    ? users.filter((user) =>
      user.nickname.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : users;

  return (
    <>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', gap: '1rem' }}>
        <LinkButton
          href="/admin/cadastrar-usuario"
          variant="body2"
          sx={{ alignSelf: 'center' }}
        >
          Cadastrar
        </LinkButton>
        <SearchBar>
          <FontAwesomeIcon icon={faSearch} />
          <input
            type="text"
            placeholder="Pesquisar por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBar>
      </div>
      <Container>
        <ItemList>
          <Header>
            <HeaderItem>Nome</HeaderItem>
            <HeaderItem>Email</HeaderItem>
            <HeaderItem>Grupo</HeaderItem>
            <HeaderItem>CPF</HeaderItem>
            <HeaderItem>Status</HeaderItem>
            <HeaderItem>Ações</HeaderItem>
          </Header>
          {filteredUsers.map((user) => (
            <Row key={user.id}>
              <Cell data-label="Nome">{user.nickname}</Cell>
              <Cell data-label="Email">{user.email}</Cell>
              <Cell data-label="Grupo">{mapRoleToLabel(user.role)}</Cell>
              <Cell data-label="CPF">{user.cpf}</Cell>
              <Cell data-label="Status">{user.ativo ? 'Ativo' : 'Inativo'}</Cell>
              <Cell data-label="Ações">
                <div>
                <Tooltip title="Editar">
                  <EditIcon onClick={() => handleEditClick(user)} />
                </Tooltip>
                <Tooltip title={user.ativo ? "Desativar" : "Ativar"}>
                  <ToggleButton onClick={() => handleToggleActive(user)}>
                    {user.ativo ? <CheckCircleIcon /> : <CancelIcon />}
                  </ToggleButton>
                </Tooltip>
                </div>
              </Cell>
            </Row>
          ))}
        </ItemList>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          contentLabel="Editar Usuário"
          style={customStyles}
        >
          {selectedUser && (
            <ModalContent>
              <h2>Editar Usuário</h2>
              {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
              <label>
                <p>Nickname:</p>
                <StyledInput
                  type="text"
                  value={selectedUser.nickname}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, nickname: e.target.value })
                  }
                />
              </label>
              <label>
                <p>Email:</p>
                <StyledInput
                  disabled
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, email: e.target.value })
                  }
                />
              </label>
              <label>
                <p>CPF:</p>
                <StyledInput
                  type="cpf"
                  value={selectedUser.cpf}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, cpf: e.target.value })
                  }
                />
              </label>
              <label>
                <p>Alterar senha:</p>
                <StyledInput
                  type="password"
                  placeholder="Senha atual"
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, senha: e.target.value })
                  }
                />
                <StyledInput
                  type="password"
                  placeholder="Nova senha"
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, senhaNova: e.target.value })
                  }
                />
                <StyledInput
                  type="password"
                  placeholder='Confirmar nova senha'
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, senhaConfirmacao: e.target.value })
                  }
                />
              </label>
              {selectedUser.id !== loggedInUserId && (
                <label>
                  <p>Cargo:</p>
                  <select
                    value={selectedUser.role}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, role: e.target.value })
                    }
                  >
                    <option value="ADMIN">ADMIN</option>
                    <option value="USER">USUÁRIO</option>
                    <option value="STOCKIST">ESTOQUISTA</option>
                  </select>
                </label>
              )}
              <ButtonContainer>
                <button onClick={handleSave}>Salvar</button>
                <button onClick={handleCloseModal}>Cancelar</button>
              </ButtonContainer>
            </ModalContent>
          )}
        </Modal>
      </Container>
    </>
  );
};

const ToggleButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.1rem;
  margin-left: 0.5rem;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
    transition: color 0.3s ease-in-out;
    transform: scale(1.1);
  }
`;

const LinkButton = styled(Link)`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.background};
  border-radius: 0.5rem;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    text-decoration: none;
  }

  &:visited, &:link, &:active {
    color: ${({ theme }) => theme.colors.background};
    text-decoration: none;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.3);
  padding: 10px;
  width: 100%;
  border-radius: 5px;

  input {
    border: none;
    background: none;
    margin-left: 10px;
    color: ${(props) => props.theme.colors.text};
    outline: none;
    width: 100%;
  }
`;

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '2rem',
    borderRadius: '0.5rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    width: '400px',
    maxWidth: '50%',
    overflow: 'auto',
    maxHeight: '90vh',
    zIndex: 1100,
  },
};

const Container = styled.div`
  margin-top: 20px;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 0.5rem;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.3);
  color: ${({ theme }) => theme.colors.text};
`;

const StyledInput = styled.input`
  width: 95%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
`;

const ItemList = styled.div`
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.5rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};

  @media (max-width: 1024px) {
    display: none;
  }
`;

const HeaderItem = styled.div`
  padding: 0.5rem;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
  align-items: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundDark};
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    grid-gap: 0.5rem;
    padding: 1rem
  }
`;

const Cell = styled.div`
  max-width: 200px;
  padding: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
  position: relative;
  word-wrap: break-word;
  word-break: break-word;
  white-space: normal;

  @media (max-width: 1024px) {
    display: flex;
    justify-content: space-between;
    padding: 0rem;
    max-width: 100%;
    font-size: 0.8rem;
    text-align: left;
    border-bottom: 2px solid ${({ theme }) => theme.colors.backgroundDark};

    &::before {
      content: attr(data-label);
      left: 0;
      width: 50%;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const EditIcon = styled(Edit)`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.1rem;

  &:hover {
  color: ${({ theme }) => theme.colors.secondary};
  transition: color 0.3s ease-in-out;
  transform: scale(1.1);
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 20%;
  }
`;

const CheckCircleIcon = styled(CheckCircle)`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.1rem;

  &:hover {
  color: ${({ theme }) => theme.colors.secondary};
  transition: color 0.3s ease-in-out;
  transform: scale(1.1);
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 20%;
  }
`;

const CancelIcon = styled(Cancel)`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.1rem;

  &:hover {
  color: ${({ theme }) => theme.colors.secondary};
  transition: color 0.3s ease-in-out;
  transform: scale(1.1);
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 20%;
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  gap: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 1rem;
`;

export default ListaUsuarios;