import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './styles/globals'
import { theme } from './styles/theme'
import SignIn from './pages/sign-in/SignIn'
import SignUp from './pages/sign-up/SignUp'
import AdminPanel from './pages/AdminPanel'

function App() {

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
