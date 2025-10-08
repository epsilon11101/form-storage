import { Stack } from "@mui/material"
import { type FC } from "react"
import TDialog from "../ui/dialog/TTDialog"
import DragFile from "../DragFile"
import type { Props } from "./interface"


const NewJSONDialog: FC<Props> = ({ title, open, onClose, }) => {
  return (
    <TDialog
      open={open}
      onClose={onClose}
      title={title}

    >
      <Stack direction="column" gap={2} pt={1}>
        <DragFile accept={{ 'application/xml': ['.txt'] }} onCloseDialog={onClose} />
      </Stack>
    </TDialog>
  )
}

export default NewJSONDialog


