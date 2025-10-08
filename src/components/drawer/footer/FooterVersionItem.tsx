import { TMenu, TMenuItem } from '@/components/ui/TMenu';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Menu, Stack, TextField, ToggleButton, Typography, type ToggleButtonProps } from "@mui/material";
import { useEffect, useRef, useState, type ChangeEventHandler, type Dispatch, type FC, type KeyboardEvent, type MouseEventHandler, type SetStateAction } from "react";


interface Props extends Omit<ToggleButtonProps, "children"> {
  title: string,
  currentSelected: string
  setVersion: Dispatch<SetStateAction<string>>
}

export const FooterVersionItem: FC<Props> = ({ title, currentSelected, setVersion, value, sx, ...rest }) => {

  const [isVersionSelected, setIsVersionSelected] = useState(false)
  const [editedTextValue, setEditedTextValue] = useState(title)
  const [isEditing, setIsEditing] = useState(false)
  const ref = useRef<HTMLButtonElement | null>(null)




  const onEditVersionHandler = () => {
    setIsEditing(true)
  }

  const onChangeEditingValue: ChangeEventHandler<HTMLInputElement> = (e) => {

    setEditedTextValue(e.target.value);
    e.stopPropagation()
  }

  const onSaveEditingValue = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "Escape") {
      setIsEditing(false)
      setVersion(editedTextValue)
    }
    e.stopPropagation()
  }

  useEffect(() => {

    if (ref.current) {
      if (ref.current.value === currentSelected) {
        setIsVersionSelected(true)
        return
      }
      setIsVersionSelected(false)
    }
  }, [value, currentSelected])



  return (
    <ToggleButton value={editedTextValue} fullWidth sx={{
      px: 0,
      ...(sx || {}),
    }}
      ref={ref}
      {...rest}
      aria-label={title}
    >


      <Stack direction="row" alignItems="center" justifyContent="center" flex={1} sx={{ pl: 1 }} >
        {isEditing ?
          <TextField value={editedTextValue} variant="outlined" onKeyDown={onSaveEditingValue} onChange={onChangeEditingValue} sx={{ px: 1, py: 0 }} />
          : <>
            <Box sx={{ maxWidth: 100, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", px: 1 }}>
              <Typography variant="caption">{editedTextValue}</Typography>
            </Box>

            {
              isVersionSelected &&
              <TMenu>
                {({ popupStateHandler, bindMenuProps }) =>
                  <Menu {...bindMenuProps}>
                    <TMenuItem
                      popupState={popupStateHandler}
                      onClick={onEditVersionHandler}
                      icon={<EditIcon color="primary" fontSize="small" />}
                      title="Editar"
                      sx={{ "&:hover": { bgcolor: "#eaf6fb" } }}
                    />
                    <TMenuItem
                      popupState={popupStateHandler}
                      onClick={onEditVersionHandler}
                      icon={<DeleteIcon color="error" fontSize="small" />}
                      title="Eliminar"
                      sx={{ "&:hover": { bgcolor: " #fbeaea" } }} />
                  </Menu>
                }
              </TMenu>
            }
          </>
        }

      </Stack>


    </ToggleButton >

  )
}
