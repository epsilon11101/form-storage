import { TEditingField } from '@/components/ui/editingField/TEditingField';
import { useEditingField } from '@/components/ui/editingField/useEditingField';
import { TMenu, TMenuItem } from '@/components/ui/TMenu';
import useGetFormVersion from '@/stores/useFormVersionsStore';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Menu, Stack, ToggleButton, Typography, type ToggleButtonProps } from "@mui/material";
import { useEffect, useRef, useState, type FC } from "react";


interface Props extends Omit<ToggleButtonProps, "children" | "id"> {
  title: string,
  id: number
}

export const FooterVersionItem: FC<Props> = ({ title = "Version 1", id, value, sx, ...rest }) => {

  const [isVersionSelected, setIsVersionSelected] = useState(false)
  const { setCurrentVersionID, setCurrentVersionName, currentVersionName } = useGetFormVersion()

  const ref = useRef<HTMLButtonElement | null>(null)

  const {
    isEditing,
    value: editedTextValue,
    setIsEditing,
    onChangeHandler: onChangeEditingValue,
    onKeyEnterHandler: onSaveEditingValue,
  } = useEditingField({
    initialValue: title,
    onEnter: () => setCurrentVersionName(editedTextValue),
  })

  const onEditVersionHandler = () => {
    setIsEditing(true)
  }

  useEffect(() => {

    if (ref.current) {
      if (ref.current.value === currentVersionName) {
        setIsVersionSelected(true)
        setCurrentVersionID(id)
        console.log("CAMBIANDO ID==>", id, title)
        return
      }
      setIsVersionSelected(false)
    }
  }, [value, currentVersionName])


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
          <TEditingField value={editedTextValue} variant="outlined" onKeyDown={onSaveEditingValue} onChange={onChangeEditingValue} sx={{ px: 1, py: 0 }} />
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
