import { TextField, type TextFieldProps } from "@mui/material";
import { type FC, type SyntheticEvent } from "react";


type TEditingFieldProps = {

} & TextFieldProps


export const TEditingField: FC<TEditingFieldProps> = ({ value, onChange, onKeyDown, ...rest }) => {
  const { sx } = rest

  const onClickHandler = (e: SyntheticEvent) => {
    e.stopPropagation()
  }


  return <TextField value={value} variant="outlined" onClick={onClickHandler} onKeyDown={onKeyDown} onChange={onChange} sx={{ px: 1, py: 0, ...sx }} size="small" {...rest} />



}



