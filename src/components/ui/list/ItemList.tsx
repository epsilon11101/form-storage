import { useState, type FC, type MouseEventHandler, type ReactNode } from "react"
import type { FolderStructureType } from "./types"
import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, Stack } from "@mui/material";

import { OUTLINE_VARIANT, SURFACE } from "@/theme/colors";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';
import NewJSONDialog from "@/components/Dialogs/NewJSONDialog";
import { TMenu, TMenuItem } from "../TMenu";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ItemListItem } from "./ItemListItem";

interface Props {
  jsonItem: FolderStructureType[number]
  parentIcon?: ReactNode,
  childrenIcon?: ReactNode,
}


const ItemList: FC<Props> = ({ jsonItem, parentIcon, childrenIcon }) => {

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

  return (
    <>

      <ListItemButton onClick={handleClick} disableRipple>
        <ListItem

          secondaryAction={
            <Stack direction="row" gap={1} alignItems="center" width="100%" >
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
                      onClick={() => { }}
                      icon={<EditIcon color="primary" fontSize="small" />}
                      title="Editar"
                      sx={{ "&:hover": { bgcolor: "#eaf6fb" } }}
                    />
                    <TMenuItem
                      popupState={popupStateHandler}
                      onClick={() => { }}
                      icon={<DeleteIcon color="error" fontSize="small" />}
                      title="Eliminar"
                      sx={{ "&:hover": { bgcolor: " #fbeaea" } }} />
                  </Menu>
                }
              </TMenu>
            </Stack>
          }
          dense
          disablePadding
        >
          <ListItemIcon sx={{ minWidth: 24 }}>{parentIcon}</ListItemIcon>
          <ListItemText primary={jsonItem.parent_name} primaryTypographyProps={{
            noWrap: true,
            variant: "caption",
            color: SURFACE,
            width: 150
          }} />
          {open ? <ArrowDropDownIcon sx={{ color: OUTLINE_VARIANT }} /> : <ArrowRightIcon sx={{ color: OUTLINE_VARIANT }} />}

        </ListItem>

      </ListItemButton>


      {jsonItem.children.map((child) => (
        <ItemListItem key={child.id} {...child} in={open} icon={childrenIcon} />
      ))}
      <NewJSONDialog title={`Agregar json para ${jsonItem.parent_name}`} open={openDialog} onClose={onCloseDialogHandler} />
    </>

  )
}

export default ItemList
