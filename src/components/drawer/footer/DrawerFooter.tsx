import useDrawer from "@/stores/useDrawer"
import { AppBar, IconButton, Toolbar, } from "@mui/material"
import { FooterVersions } from "./FooterVersions"
import AddIcon from '@mui/icons-material/Add';
import { TTooltip } from "@/components/ui/TTooltip";


const DrawerFooter = () => {
  const { drawerWidth } = useDrawer()


  return (
    <AppBar

      position="fixed"
      component="footer"
      sx={{
        bgcolor: theme => theme.palette.common.white,

        top: "auto",
        bottom: 0,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: (theme) =>
          theme.transitions.create(["width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
      }}
    >
      <Toolbar sx={{ gap: 2 }}>
        <TTooltip title="Nueva versión">
          <IconButton sx={{ p: 0 }}><AddIcon /></IconButton>
        </TTooltip>

        <FooterVersions />
      </Toolbar>

    </AppBar >
  )
}

export default DrawerFooter
