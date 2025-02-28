import styled from 'styled-components';

const ListaProdutos = () => {
  return (
    <Container>
      <h1>Lista de Produtos</h1>
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 0.5rem;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.3);
  color: ${({ theme }) => theme.colors.text};
`;

export default ListaProdutos;