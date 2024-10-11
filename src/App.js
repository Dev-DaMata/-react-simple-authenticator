import React from 'react'
import './index.css'
import RoutesApp from './routes'
import { AuthProvider } from './contexts/auth'
//import GlobalStyle from './styles/global'

const App = () => {
    return (
        <>
        <AuthProvider>
            <RoutesApp />
            {/* <GlobalStyle /> */}
        </AuthProvider>
        </>
    )
}

export default App