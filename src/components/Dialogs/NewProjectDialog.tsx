import { Stack, TextField } from "@mui/material"
import { useState, type ChangeEvent, type FC, } from "react"
import TDialog from "../ui/dialog/TTDialog"
import type { Props } from "./interface"
import { TDialogActions } from "../ui/dialog/TDialogActions"
import { useCreateGroup } from "@/api/hooks/useGroups";
import { TProgress } from "../ui/TProgress"



const NewProjectDialog: FC<Props> = ({ title, open, onClose }) => {

  const { mutate: createGroup, isPending } = useCreateGroup()
  const [name, setName] = useState("")

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const onAcceptHandler = (reject: () => void) => {
    createGroup(name, {
      onSuccess: () => {
        setName("")
        reject()
      }
    })
  }



  return (
    <TDialog
      open={open}
      onClose={onClose}
      title={title}
      actions={({ onReject }) => (
        <TDialogActions
          onAccept={() => onAcceptHandler(onReject)}
          onReject={onReject}
          slots={{
            acceptProps: {
              startIcon: isPending ? <TProgress progressProps={{
                sx: { color: theme => theme.palette.common.white }
              }} /> : null
            }
          }}
        />
      )
      }
    >
      <Stack direction="column" gap={2} pt={1}>
        <TextField value={name} label="Nombre Proyecto" placeholder="Nombre de Proyecto"
          onChange={onChangeHandler}
        />
      </Stack>
    </TDialog >
  )
}

export default NewProjectDialog





