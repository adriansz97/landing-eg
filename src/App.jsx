import { ThemeProviderCst } from './context/AppContext'
import { AppRouter } from './routes/AppRouter'

export const App = () => {
  return (
    <ThemeProviderCst>
      <AppRouter />
    </ThemeProviderCst>
  )
}
