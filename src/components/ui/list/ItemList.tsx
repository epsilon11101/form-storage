import { useState, type FC, type ReactNode } from "react"
import type { FolderStructureType } from "./types"
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, Stack } from "@mui/material";

import { OUTLINE_VARIANT, SURFACE } from "@/theme/colors";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';
import NewJSONDialog from "@/components/Dialogs/NewJSONDialog";
import { TMenu, TMenuItem } from "../TMenu";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ItemListItem } from "./ItemListItem";
import { useEditingField } from "../editingField/useEditingField";
import { TEditingField } from "../editingField/TEditingField";
import { useDeleteGroup, useEditGroup } from "@/api/hooks/useGroups";
import { TProgress } from "../TProgress";

interface Props {
  jsonItem: FolderStructureType[number]
  parentIcon?: ReactNode,
  childrenIcon?: ReactNode,
}


const ItemList: FC<Props> = ({ jsonItem, parentIcon, childrenIcon }) => {


  const { mutate: onEditGroupMutation, isPending } = useEditGroup()
  const { mutate: onDeleteGroupMutation, isPending: isDeletePending, isError, isSuccess } = useDeleteGroup()

  const deleteStatus = (isSuccess || isDeletePending) && !isError

  const { isEditing, setIsEditing, onChangeHandler, onKeyEnterHandler, value } = useEditingField({
    initialValue: jsonItem.parent_name,
    onEnter: onMutateHandler
  })



  const { } = useDeleteGroup()

  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false)

  const handleClick = () => {
    setOpen(!open);
  }

  const onOpenDialogHandler = () => {
    setOpenDialog(true)
  }

  const onCloseDialogHandler = () => {
    setOpenDialog(false);
  }

  const onEditingHandler = () => {
    setIsEditing(true)
  }

  function onMutateHandler() {
    onEditGroupMutation({
      id: jsonItem.id,
      name: value
    }, {
      onError: () => setIsEditing(false),
      onSuccess: () => setIsEditing(false)
    })
  }

  const onDeleteHandler = () => {
    onDeleteGroupMutation({
      id: jsonItem.id
    })
  }



  return (
    <>

      <ListItemButton onClick={handleClick} disableRipple>
        <ListItem

          secondaryAction={
            !isEditing ?
              <Stack direction="row" gap={1} alignItems="center" width="100%" >
                {isPending ? null :
                  <TMenu>
                    {({ popupStateHandler, bindMenuProps }) =>
                      <Menu {...bindMenuProps}>
                        <TMenuItem
                          popupState={popupStateHandler}
                          onClick={onOpenDialogHandler}
                          icon={<AddIcon color="primary" />}
                          title="Agregar"
                          sx={{ "&:hover": { bgcolor: "#eaf6fb" } }}
                        />

                        <TMenuItem
                          popupState={popupStateHandler}
                          onClick={onEditingHandler}
                          icon={<EditIcon color="primary" fontSize="small" />}
                          title="Editar"
                          sx={{ "&:hover": { bgcolor: "#eaf6fb" } }}
                        />
                        <TMenuItem
                          popupState={popupStateHandler}
                          onClick={onDeleteHandler}
                          icon={<DeleteIcon color="error" fontSize="small" />}
                          title="Eliminar"
                          sx={{ "&:hover": { bgcolor: " #fbeaea" } }} />
                      </Menu>
                    }
                  </TMenu>}
              </Stack> : null
          }
          dense
          disablePadding
        > {
            <>
              {
                isPending ? (
                  <TProgress />
                ) : (
                  <>
                    <ListItemIcon sx={{ minWidth: 24 }}>{parentIcon}</ListItemIcon>

                    {isEditing ? (
                      <TEditingField
                        value={value}
                        onChange={onChangeHandler}
                        onKeyDown={onKeyEnterHandler}
                      />
                    ) : (
                      <>
                        <ListItemText
                          primary={deleteStatus ? "ELIMINANDO" : value}
                          primaryTypographyProps={{
                            noWrap: true,
                            variant: "caption",
                            width: 150,
                            sx: {
                              color: theme => deleteStatus ? theme.palette.error.main : SURFACE,
                            }
                          }}
                        />
                        {open ? (
                          <ArrowDropDownIcon sx={{ color: OUTLINE_VARIANT }} />
                        ) : (
                          <ArrowRightIcon sx={{ color: OUTLINE_VARIANT }} />
                        )}
                      </>
                    )}
                  </>
                )
              }
            </>}
        </ListItem>

      </ListItemButton >


      {
        jsonItem.children.map((child) => (
          <ItemListItem key={child.id} {...child} in={open} icon={childrenIcon} />
        ))
      }
      < NewJSONDialog title={`Agregar json para ${jsonItem.parent_name}`
      } open={openDialog} onClose={onCloseDialogHandler} />
    </>

  )
}

export default ItemList
