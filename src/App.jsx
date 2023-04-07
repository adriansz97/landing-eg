import { AppProvider, ThemeProvider } from './context/AppContext'
import { AppRouter } from './routes/AppRouter'

export const App = () => {
  return (
    <AppProvider>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </AppProvider>
  )
}
