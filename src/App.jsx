import { AppProvider, ThemeProvider } from './context/AppContext'
import { AppRouter } from './routes/AppRouter'
import './theme/styles.scss'

export const App = () => {
  return (
    <AppRouter />
  )
}
