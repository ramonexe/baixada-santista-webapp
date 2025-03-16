import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Tooltip from '@mui/material/Tooltip';
import { CheckCircle, Edit } from '@mui/icons-material';
import Link from '@mui/material/Link';
import { listarProdutos } from '../services/axiosServices';
import ModalProdutos from './ModalProdutos';
import VisibilityIcon from '@mui/icons-material/Visibility';

const ListaProdutos = () => {
  const [searchTerm, setSearchTerm] = useState('');

  interface Produto {
    id: number;
    nomeProduto: string;
    avaliacao: number;
    descricao: string;
    preco: number;
    quantEstoque: number;
    ativo: boolean;
    imagens: Array<{
      id: number;
      url: string;
      imagemPrincipal: boolean;
    }>
  }

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [size] = useState(10);
  const [ModalProdutosOpen, setModalProdutosOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);

  const handleOpenModal = (produto: Produto) => {
    setProdutoSelecionado(produto);
    setModalProdutosOpen(true);
  };

  const handleCloseModal = () => {
    setModalProdutosOpen(false);
    setProdutoSelecionado(null);
  };

  const fetchProdutos = async (page: number) => {
    try {
      const response = await listarProdutos(page, size);
      setProdutos(response.content);
      console.log(response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Error listing products:', error);
    }
  };

  useEffect(() => {
    fetchProdutos(currentPage);
  }, [currentPage]);

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const filteredProducts = searchTerm
    ? produtos.filter((produto) =>
      produto.nomeProduto.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : produtos;

  return (
    <>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', gap: '1rem' }}>
        <LinkButton
          href="/admin/cadastrar-produto"
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
      <Pagination>
        <button onClick={prevPage} disabled={currentPage === 0}>
          Anterior
        </button>
        <span>
          Página {currentPage + 1} de {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages - 1}>
          Próxima
        </button>
      </Pagination>
      <Container>
        <h1 style={{ marginTop: '0' }}>Lista de Produtos</h1>
        <ItemList>
          <Header>
            <HeaderItem>Código</HeaderItem>
            <HeaderItem>Nome</HeaderItem>
            <HeaderItem>Quantidade</HeaderItem>
            <HeaderItem>Valor</HeaderItem>
            <HeaderItem>Status</HeaderItem>
            <HeaderItem>Ações</HeaderItem>
          </Header>
          {filteredProducts.map((produto) => (
            <Row key={produto.id}>
              <Cell data-label="Código">{produto.id}</Cell>
              <Cell data-label="Nome">{produto.nomeProduto}</Cell>
              <Cell data-label="Quantidade">{produto.quantEstoque}</Cell>
              <Cell data-label="Valor">{produto.preco}</Cell>
              <Cell data-label="Status">{produto.ativo ? 'Ativo' : 'Inativo'}</Cell>
              <Cell data-label="Ações">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Tooltip title="Editar">
                    <EditIcon />
                  </Tooltip>
                  <Tooltip title="Ativar/Desativar">
                    <ToggleButton>
                      <CheckCircleIcon />
                    </ToggleButton>
                  </Tooltip>
                  <Tooltip title="Visualizar">
                  <Visualizar onClick={() => handleOpenModal(produto)}>
                    <VisualizarIcon/>
                  </Visualizar>
                  </Tooltip>
                </div>
              </Cell>
            </Row>
          ))}
        </ItemList>
        {produtoSelecionado && (
          <ModalProdutos
            isOpen={ModalProdutosOpen}
            onClose={handleCloseModal}
            images={produtoSelecionado.imagens.map((imagem) => imagem.url)}
            nome={produtoSelecionado.nomeProduto}
            avaliacao={produtoSelecionado.avaliacao.toString()}
            descricao={produtoSelecionado.descricao}
            preco={produtoSelecionado.preco.toString()}
            quantidadeEstoque={produtoSelecionado.quantEstoque.toString()}
          />
        )}
      </Container>
    </>
  );
};

const Visualizar = styled.button`
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: none;
  font-weight: bold;
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

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;

  button {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
    border: none;
    padding: 0.5rem 1rem;
    margin: 0 0.5rem;
    cursor: pointer;
    border-radius: 0.25rem;

    &:disabled {
      background-color: ${({ theme }) => theme.colors.disabled};
      cursor: not-allowed;
    }

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.secondary};
    }
  }

  span {
    margin: 0 1rem;
    color: ${({ theme }) => theme.colors.text};
  }
`;

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

const VisualizarIcon = styled(VisibilityIcon)`
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