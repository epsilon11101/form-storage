import { Stack } from "@mui/material"
import { type FC } from "react"
import TDialog from "../ui/dialog/TTDialog"

import type { Props } from "./interface"
import FormSection from "../pages/FormSection"


const FullPageFormDialog: FC<Props> = ({ title, open, onClose, }) => {
  return (
    <TDialog
      open={open}
      onClose={onClose}
      title={title}
      fullScreen
      dialogContentProps={{ sx: { width: "100%", height: "100%" } }}
      withCloseButton
    >
      <Stack direction="column" justifyContent="center" alignItems="center" gap={2} pt={1} flex={1}>
        <FormSection />
      </Stack>
    </TDialog >
  )
}

export default FullPageFormDialog


