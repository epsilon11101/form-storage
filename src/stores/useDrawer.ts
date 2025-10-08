import { create } from "zustand"

export const DRAWER_WIDTH = 258;

interface DrawerInterface {
  drawerWidth: number
  isDrawerOpen: boolean
  setDrawerWidth: (newWidth: number) => void
  setDrawerOpen: (open: boolean) => void
}

const useDrawer = create<DrawerInterface>((set) => ({
  drawerWidth: DRAWER_WIDTH,
  isDrawerOpen: true,
  setDrawerWidth: (newWidth) => set({ drawerWidth: newWidth }),
  setDrawerOpen: (open) => set({
    isDrawerOpen: open,
    drawerWidth: open ? DRAWER_WIDTH : 0

  })

}))


export default useDrawer
