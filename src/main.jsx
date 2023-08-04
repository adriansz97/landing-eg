import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { App } from './App'
import { Provider } from 'react-redux';
import { store } from "./store/store"

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={ store }>
    <App />
  </Provider>
)
