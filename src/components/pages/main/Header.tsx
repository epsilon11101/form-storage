import { Stack, Button } from "@mui/material"


import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';


const Header = () => {


  const onPrintHandler = () => { }


  const onSaveHandler = () => { }



  return (
    <Stack direction="row" spacing={2} >

      <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={onSaveHandler}>Guardar</Button>
      <Button variant="contained" color="primary" startIcon={<PrintIcon />} onClick={onPrintHandler}>Imprimir</Button>

    </Stack>

  )
}

export default Header
