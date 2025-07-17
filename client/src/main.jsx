import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import  store  from './app/store.js'
import { Provider } from 'react-redux'
import { AppRouter } from './routes/AppRouter.jsx'
import { SocketProvider } from './context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <SocketProvider>
            <AppRouter />
        </SocketProvider>
    </Provider>,
)
