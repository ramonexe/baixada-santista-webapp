import { Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './styles/globals'
import { theme } from './styles/theme'
import SignIn from './pages/sign-in/SignIn'
import SignUp from './pages/sign-up/SignUp'
import AdminPanel from './pages/AdminPanel'
import ListaUsuarios from './components/ListaUsuarios'
import ListaProdutos from './components/ListaProdutos'
import Sidebar from './components/sidebar'
import styled from 'styled-components'
import ProtectedRoute from './services/ProtectedRoute'

function App() {
  const location = useLocation();
  const showSidebar = location.pathname !== '/entrar' && location.pathname !== '/cadastrar';

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Container>
        {showSidebar && <Sidebar />}
        <Content>
          <Routes>
            <Route path="/entrar" element={<SignIn />} />
            <Route path="/cadastrar" element={<SignUp />} />
            <Route path="/produtos" element={<ListaProdutos />} />
            <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
              <Route path="/admin" element={<AdminPanel />} >
                <Route path="usuarios" element={<ListaUsuarios />} />
              </Route>
            </Route>
          </Routes>
        </Content>
      </Container>
    </ThemeProvider >
  )
}

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  padding: 1rem;
`;

export default App
