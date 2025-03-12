import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import styled from 'styled-components';
import Tooltip from '@mui/material/Tooltip';
import { CheckCircle, Edit } from '@mui/icons-material';
import Link from '@mui/material/Link';

const ListaProdutos = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', gap: '1rem' }}>
        <LinkButton
          href="/admin/cadastrar"
          variant="body2"
          sx={{ alignSelf: 'center' }}
        >
          Cadastrar
        </LinkButton>
        <SearchBar>
          <FontAwesomeIcon icon={faSearch} />
          <input
            type="text"
            placeholder="Pesquisar por produto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBar>
      </div>
      <Container>
        <h1>Lista de Produtos</h1>
        <ItemList>
          <Header>
            <HeaderItem>Código</HeaderItem>
            <HeaderItem>Nome</HeaderItem>
            <HeaderItem>Quantidade</HeaderItem>
            <HeaderItem>Valor</HeaderItem>
            <HeaderItem>Status</HeaderItem>
            <HeaderItem>Ações</HeaderItem>
          </Header>
          <Row>
            <Cell data-label="Código"></Cell>
            <Cell data-label="Nome"></Cell>
            <Cell data-label="Quantidade"></Cell>
            <Cell data-label="Valor"></Cell>
            <Cell data-label="Status"></Cell>
            <Cell data-label="Ações">
              <Tooltip title="Editar">
                <EditIcon />
              </Tooltip>
              <Tooltip title="Ativar/Desativar">
                <ToggleButton >
                  <CheckCircle />
                </ToggleButton>
              </Tooltip>
            </Cell>
          </Row>
        </ItemList>
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

const Container = styled.div`
  padding: 1rem;
  margin-top: 20px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 0.5rem;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.3);
  color: ${({ theme }) => theme.colors.text};
`;

export default ListaProdutos;