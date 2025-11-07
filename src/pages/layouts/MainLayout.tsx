import TDrawer from "@/components/drawer/Drawer"
import { Outlet } from "react-router-dom"
import '@/theme/globals.css'

const MainLayout = () => {
  return (
    <TDrawer>
      <Outlet />
    </TDrawer>
  )
}

export default MainLayout
