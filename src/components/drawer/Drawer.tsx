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
import { Button, Stack } from '@mui/material';
import Logo from '../ui/logo/Logo';
import useDrawer from '@/stores/useDrawer';
import DrawerFooter from './footer/DrawerFooter';
import { type ReactNode, type RefObject, useEffect } from "react"
import { QueryBoundary } from '@/providers/QueryBoundary';
import { DrawerContent } from './DrawerContent';
import DrawerContentFooter from './DrawerContentFooter';
import useGetIDForm from '@/stores/useFormStore';
import useReadDocument from '@/stores/useReadDocument';
import { useUpdateFormVersion } from '@/api/hooks/useFormVersion';
import useGetFormVersion from '@/stores/useFormVersionsStore';
import { SaveIcon } from 'lucide-react';
import { TProgress } from '../ui/TProgress';
import { stringifyCode } from '@/utils/utils';

import PrintIcon from '@mui/icons-material/Print';
import { useReactToPrint } from 'react-to-print';

interface TDrawerProps {
  children: ReactNode
}



export default function TDrawer({ children }: TDrawerProps) {

  const { formParentName } = useGetIDForm()
  const theme = useTheme();
  const { drawerWidth, isDrawerOpen, setDrawerOpen } = useDrawer()
  const { formData, uiSchema, schema, isSaving, printRef } = useReadDocument()
  const { isPending, mutate: updateVersion } = useUpdateFormVersion()
  const { currentVersionID } = useGetFormVersion()
  const { formID } = useGetIDForm()

  const onPrint = useReactToPrint({
    contentRef: printRef as unknown as RefObject<HTMLElement>,
    pageStyle: `
  @page { size: A4; margin: 15mm; }
  @media print {
    body { -webkit-print-color-adjust: exact !important; }
    .MuiDrawer-root, .MuiDrawer-paper { display: none !important; }
  }
`,
  })




  const handleDrawerOpen =
    () => {
      setDrawerOpen(true);
    };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };




  const isSavingIcon = isSaving || isPending ? <TProgress isLoading={isSaving}
    progressProps={{
      sx: {
        color: theme => theme.palette.common.white
      }
    }
    }
  /> : <SaveIcon />

  const isSavingText = isSaving || isPending ? "guardando" : "guardar"

  const onPrintHandler = () => {
    onPrint()
  }




  const onSaveHandler = () => {
    const mergedData = {
      "schema": schema,
      "uiSchema": uiSchema,
      "formData": formData
    }
    const stringifyData = stringifyCode(mergedData)

    updateVersion({
      formID: formID || "error",
      versionNumber: Number(currentVersionID),
      data: {
        propertyName: stringifyData || ""
      }
    })
  }


  useEffect(() => {
    const handleSaveShortcut = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "s") {
        e.preventDefault()
        onSaveHandler()
      }
    }

    window.addEventListener("keydown", handleSaveShortcut)
    return () => window.removeEventListener("keydown", handleSaveShortcut)
  }, [schema, uiSchema, formData])





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
            </IconButton>{
              formParentName ?

                <Stack direction="row" spacing={2} flex="1" >

                  <Typography variant="h6" noWrap component="div" color="black" flex="4">
                    {formParentName}
                  </Typography>
                  <Button variant="contained" size="small" color="primary" startIcon={isSavingIcon} onClick={onSaveHandler}>{isSavingText}</Button>
                  <Button variant="contained" size="small" color="primary" startIcon={<PrintIcon />} onClick={onPrintHandler}>Imprimir</Button>

                </Stack>
                :
                <Typography variant="h6" noWrap component="div" color="black" flex="4">
                  {"Editor de formas precodificadas"}
                </Typography>
            }
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
