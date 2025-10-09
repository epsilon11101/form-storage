import { TextField, type TextFieldProps } from "@mui/material";
import { type FC } from "react";


type TEditingFieldProps = {

} & TextFieldProps


export const TEditingField: FC<TEditingFieldProps> = ({ value, onChange, onKeyDown, ...rest }) => {




  return <TextField value={value} variant="outlined" onKeyDown={onKeyDown} onChange={onChange} sx={{ px: 1, py: 0 }} {...rest} />



}



