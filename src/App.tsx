import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/globals';
import { theme } from './styles/theme';
import SignIn from './pages/sign-in/SignIn';
import styled from 'styled-components';
import ProtectedRoute from './services/ProtectedRoute';
import Sidebar from './components/sidebar';
import { Suspense, lazy } from 'react';
import LoadingOverlay from './components/LoadingOverlay';

// procurei sobre demora ao carregar os componentes e encontrei sobre o suspenze e o lazy do react
const ListaUsuarios = lazy(() => import('./components/ListaUsuarios'));
const ListaProdutos = lazy(() => import('./components/ListaProdutos'));
const CadastrarUsuario = lazy(() => import('./pages/sign-up/CadastrarUsuario'));
const CadastrarProduto = lazy(() => import('./pages/sign-up/CadastrarProduto'));

function App() {
  const location = useLocation();
  const showSidebar = location.pathname !== '/entrar';

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Container>
        {showSidebar && <Sidebar />}
        <Content>
          <Suspense fallback={<LoadingOverlay />}>
            <Routes>
              <Route path="/entrar" element={<SignIn />} />
              <Route path="/" element={<Navigate to="/entrar" />} />
              <Route element={<ProtectedRoute allowedRoles={['STOCKIST', 'ADMIN']} />}>
                <Route path="/produtos" element={<ListaProdutos />} />
                <Route path="/cadastrar-produto" element={<CadastrarProduto />} />
              </Route>
              <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
                <Route path="/usuarios" element={<ListaUsuarios />} />
                <Route path="/cadastrar-usuario" element={<CadastrarUsuario />} />
              </Route>
            </Routes>
          </Suspense>
        </Content>
      </Container>
    </ThemeProvider>
  );
}

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  padding: 1rem;
`;

export default App;