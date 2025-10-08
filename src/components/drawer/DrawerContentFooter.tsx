import { Button, Stack } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import NewProjectDialog from "../Dialogs/NewProjectDialog";


const DrawerContentFooter = () => {


  const [openDialog, setOpenDialog] = useState(false)


  const onOpenDialogHandler = () => {
    setOpenDialog(true)
  }
  const onCloseDialogHandler = () => {
    setOpenDialog(false)
  }




  return (
    <>
      <Stack p={2} >
        <Button variant="contained" color="tertiary" startIcon={<AddIcon />} onClick={onOpenDialogHandler}>Agregar</Button>
      </Stack>
      <NewProjectDialog title="Nuevo Proyecto" open={openDialog} onClose={onCloseDialogHandler} />
    </>
  )
}

export default DrawerContentFooter
