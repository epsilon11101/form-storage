import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { DrawerHeader } from './DrawerHeader';
import { AppBar } from './AppBar';
import { Main } from './Main';
import { Stack } from '@mui/material';
import Logo from '../ui/logo/Logo';
import useDrawer from '@/stores/useDrawer';
import DrawerFooter from './footer/DrawerFooter';
import { type ReactNode } from "react"
import { QueryBoundary } from '@/providers/QueryBoundary';
import { DrawerContent } from './DrawerContent';
import DrawerContentFooter from './DrawerContentFooter';
import useGetIDForm from '@/stores/useFormStore';


interface TDrawerProps {
  children: ReactNode
}



export default function TDrawer({ children }: TDrawerProps) {

  const { formName } = useGetIDForm()
  const theme = useTheme();
  const { drawerWidth, isDrawerOpen, setDrawerOpen } = useDrawer()



  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };





  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={isDrawerOpen}>
          <Toolbar sx={{ bgcolor: "white" }}>
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={[
                {
                  color: "black",
                  mr: 2,
                },
                isDrawerOpen && { display: 'none' },
              ]}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" color="black">
              {formName || "Editor de formas precodificadas"}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={isDrawerOpen}
        >
          <Stack direction="column" height="100dvh">
            <DrawerHeader>
              <Stack direction="column" flex="1" alignItems="flex-start" sx={{ pt: 1 }}>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === "ltr" ? (
                    <KeyboardDoubleArrowLeftIcon />
                  ) : (
                    <KeyboardDoubleArrowRightIcon />
                  )}
                </IconButton>
                <Logo />
              </Stack>
            </DrawerHeader>

            <Divider sx={{ pt: 2 }} />


            <Stack flex={1} overflow="auto">

              <QueryBoundary>
                <DrawerContent />
              </QueryBoundary>
            </Stack>

            <DrawerContentFooter />

          </Stack>
        </Drawer>
        <Main open={isDrawerOpen} drawerWidth={drawerWidth}>
          <Stack direction="column" justifyContent="space-between">
            <DrawerHeader />

            <Box sx={{ mb: 8, height: "100dvh" }}>
              {children}
            </Box>

            <DrawerFooter />
          </Stack>
        </Main>

      </Box>

    </>
  );
}
