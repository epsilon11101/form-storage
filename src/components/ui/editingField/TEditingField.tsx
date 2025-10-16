import { TextField, type TextFieldProps } from "@mui/material";
import { type FC, type SyntheticEvent } from "react";
import ClickAwayListener from '@mui/material/ClickAwayListener';


type TEditingFieldProps = {
  onCancel?: () => void
} & TextFieldProps


export const TEditingField: FC<TEditingFieldProps> = ({ value, onChange, onKeyDown, onCancel, ...rest }) => {
  const { sx } = rest


  const onClickHandler = (e: SyntheticEvent) => {
    e.stopPropagation()
  }

  const onClickAwayListener = () => {
    onCancel?.()
  }

  return <ClickAwayListener onClickAway={onClickAwayListener}>
    <TextField value={value} variant="outlined" onClick={onClickHandler} onKeyDown={onKeyDown} onChange={onChange} sx={{ px: 1, py: 0, ...sx }} size="small" {...rest} />
  </ClickAwayListener>




}



