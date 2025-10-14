import { Stack } from "@mui/material"
import { useState, type FC } from "react"
import TDialog from "../ui/dialog/TTDialog"
import DragFile from "../DragFile"
import type { Props } from "./interface"


const NewJSONDialog: FC<Props> = ({ title, open, onClose, }) => {

  const [hasError, setHasError] = useState(false)

  const onCloseHandler = () => {
    onClose?.({}, "escapeKeyDown")
  }


  return (
    <TDialog
      open={open}
      onClose={onClose}
      title={title}
      slotProps={{
        transition: {
          onExited: () => {
            setHasError(false)
          },
        },
      }}

    >
      <Stack direction="column" gap={2} pt={1}>
        <DragFile accept={{ 'application/xml': ['.txt'] }} hasError={hasError} setHasError={setHasError} onCloseHandler={onCloseHandler} />
      </Stack>
    </TDialog>
  )
}

export default NewJSONDialog


