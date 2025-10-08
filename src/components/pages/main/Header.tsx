import { Stack, TextField, Button } from "@mui/material"

import { useState, type ChangeEvent, type KeyboardEvent } from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';


const Header = () => {

  const [isDisabled, setDisabled] = useState(true);
  const [value, setValue] = useState("")
  const valueLabel = value === "" ? "Proyecto vacio" : value;
  const onEditHandler = () => {
    setDisabled(false)
  }

  const onPrintHandler = () => { }
  const onDeleteHandler = () => { }

  const onSaveHandler = () => { }

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist()
    setValue(event.target.value)
  }

  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key == "Enter") {
      setDisabled(true)
    }

  }

  const onNewProjectHandler = () => { }


  return (
    <Stack direction="row" spacing={2} >
      <TextField placeholder={valueLabel} variant="standard" disabled={isDisabled} onChange={onChangeHandler} onKeyDown={onKeyDownHandler} value={value} />
      <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={onEditHandler}>Renombrar</Button>
      <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={onSaveHandler}>Guardar</Button>
      <Button variant="contained" color="primary" startIcon={<PrintIcon />} onClick={onPrintHandler}>Imprimir</Button>
      <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={onDeleteHandler}>Eliminar</Button>
    </Stack>

  )
}

export default Header
