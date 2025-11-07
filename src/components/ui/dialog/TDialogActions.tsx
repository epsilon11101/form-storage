import { type DialogActionsProps, DialogActions, Button, type ButtonProps } from "@mui/material";
import type { FC } from "react";
import { STRINGS } from "@/constants/strings";

interface TDialogActionsProps extends DialogActionsProps {
  onAccept: () => void,
  onReject: () => void
  acceptTitle?: string,
  rejectTitle?: string
  slots?: {
    acceptProps?: ButtonProps,
    rejectProps?: ButtonProps
  }
}


export const TDialogActions: FC<TDialogActionsProps> = ({ onAccept, onReject, acceptTitle = STRINGS.CREATE, rejectTitle = STRINGS.CANCEL, slots, ...rest }) => {

  return (
    <DialogActions {...rest}>
      <Button color="primary" variant="contained" onClick={onAccept} {...slots?.acceptProps}>{acceptTitle}</Button>
      <Button color="error" variant="contained" onClick={onReject} {...slots?.rejectProps}>{rejectTitle}</Button>
    </DialogActions>
  )

} 
