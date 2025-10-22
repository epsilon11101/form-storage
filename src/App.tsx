
import './App.css'
import './theme/globals.css'
import TDrawer from "./components/drawer/Drawer"
import MainPage from './components/pages/main/MainPage'


function App() {


  return (
    <>
      <TDrawer>
        <MainPage />
      </TDrawer>
    </>
  )
}

export default App
