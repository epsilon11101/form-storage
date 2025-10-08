import { Box, Dialog, DialogContent, DialogTitle, IconButton, Slide, type DialogContentProps, type DialogProps } from "@mui/material";
import type { TransitionProps } from "@mui/material/transitions";
import { forwardRef, type FC, type ReactElement, type ReactNode, type Ref } from "react";
import CloseIcon from '@mui/icons-material/Close';

type RenderProps = {
  onReject: () => void
}


interface Props extends DialogProps {
  title: string;
  actions?: (props: RenderProps) => ReactNode
  dialogContentProps?: DialogContentProps
  withCloseButton?: boolean
}

const TDialog: FC<Props> = ({ title, open, onClose, children, dialogContentProps, withCloseButton = false, actions, ...rest }) => {

  const onReject = () => {
    onClose && onClose({}, 'backdropClick');
  }

  return <Dialog
    open={open}
    slots={{
      transition: Transition,
    }}
    keepMounted
    onClose={onClose}
    aria-describedby="new-project-dialog"
    {...rest}
    maxWidth='md'
    slotProps={{
      paper: { sx: { borderRadius: 2 } }
    }}

  >
    {withCloseButton &&
      <Box component="span" sx={{ position: "absolute", right: 0, p: 2 }}>
        <IconButton onClick={onReject}>
          <CloseIcon sx={{ color: theme => theme.palette.tertiary.main }} />
        </IconButton>
      </Box>
    }
    <DialogTitle>{title}</DialogTitle>
    <DialogContent sx={{ width: 600 }} {...dialogContentProps || {}}>
      {children}
    </DialogContent>
    {actions && actions({ onReject })}
  </Dialog>

}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default TDialog
