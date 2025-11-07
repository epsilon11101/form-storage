import { Button, Stack } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import NewProjectDialog from "../Dialogs/NewProjectDialog";
import { STRINGS } from "@/constants/strings";
import { usePathName } from "@/hooks/usePathName";


const DrawerContentFooter = () => {

  const { hidden } = usePathName()
  if (!hidden) return


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
        <Button variant="contained" color="tertiary" startIcon={<AddIcon />} onClick={onOpenDialogHandler}>{STRINGS.ADD}</Button>
      </Stack>
      <NewProjectDialog title={STRINGS.NEW_PROJECT} open={openDialog} onClose={onCloseDialogHandler} />
    </>
  )
}

export default DrawerContentFooter
