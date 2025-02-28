import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './styles/globals'
import { theme } from './styles/theme'
import SignIn from './pages/sign-in/SignIn'
import SignUp from './pages/sign-up/SignUp'
import AdminPanel from './pages/AdminPanel'
import ListaUsuarios from './components/ListaUsuarios'

function App() {

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/admin" element={<AdminPanel />} >
          <Route path="usuarios" element={<ListaUsuarios />} />
          {/* AUREO PODE COLOCAR OUTRA ROTA PARA O COMPONENTE DE LISTA DE PRODUTOS AQUI!
          OS BOTÕES DO SIDEBAR JÁ FUNCIONAM. AI NO COMPONENTE SÓ CHAMAR O GET NO AXIOSSERVICE*/}
        </ Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
