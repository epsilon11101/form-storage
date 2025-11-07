
import { useForm } from '@/api/hooks/useForms';
import { useDeleteFormVersion, useUpdateFormVersion } from '@/api/hooks/useFormVersion';
import { TEditingField } from '@/components/ui/editingField/TEditingField';
import { useEditingField } from '@/components/ui/editingField/useEditingField';
import { TMenu, TMenuItem } from '@/components/ui/TMenu';
import { TProgress } from '@/components/ui/TProgress';
import useGetIDForm from '@/stores/useFormStore';
import useGetFormVersion from '@/stores/useFormVersionsStore';
import useReadDocument from '@/stores/useReadDocument';
import { parseSchemaString } from '@/utils/utils';


import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Menu, Stack, ToggleButton, Typography, type ToggleButtonProps } from "@mui/material";
import { useEffect, useRef, useState, type FC, type MouseEvent } from "react";
import { STRINGS } from "@/constants/strings";


interface Props extends Omit<ToggleButtonProps, "children" | "id"> {
  title: string,
  id: number
  totalItems: number
}

export const FooterVersionItem: FC<Props> = ({ title, id, value, totalItems, sx, ...rest }) => {

  const [isVersionSelected, setIsVersionSelected] = useState(false)
  const { setCurrentVersionID, setCurrentVersionName, currentVersionName, currentVersionID } = useGetFormVersion()
  const { formID } = useGetIDForm()
  const { mutate: updateVersion, isPending: isUpdatePending } = useUpdateFormVersion()
  const { mutate: onDelete, isPending: isDeleteLoading } = useDeleteFormVersion()
  const { refetch } = useForm(formID || "")
  const { setFileSchema, setFileUiSchema, setFormData } = useReadDocument()

  const isPending = isUpdatePending || isDeleteLoading

  const ref = useRef<HTMLButtonElement | null>(null)

  const {
    isEditing,
    value: editedTextValue,
    setIsEditing,
    onChangeHandler: onChangeEditingValue,
    onKeyEnterHandler: onSaveEditingValue,
  } = useEditingField({
    initialValue: title,
    onEnter: onEdit
  })

  function onEdit() {

    if (!currentVersionID || !formID) return
    updateVersion({
      formID,
      versionNumber: id,
      name: editedTextValue,
    }, {
      onSuccess: () => {
        setCurrentVersionName(editedTextValue)
      }
    })
  }

  const onEditVersionHandler = () => {
    setIsEditing(true)
  }

  const onDeleteHandler = () => {
    if (!currentVersionID || !formID) return

    onDelete({
      formID,
      versionNumber: id
    }, {
      onSuccess: () => { refetch() }
    })
  }

  const onButtonClickHandler = (e: MouseEvent, value: string) => {
    if (!formID) return

    updateVersion({
      formID,
      versionNumber: id,
      setCurrentVersion: true
    }, {
      onSuccess: (data) => {
        const { schema, uiSchema, formData } = parseSchemaString(data?.data.propertyName)

        setFileSchema(schema ?? {})
        setFileUiSchema(uiSchema ?? {})
        setFormData(formData ?? {})

      }
    })
  }

  useEffect(() => {

    if (ref.current) {
      if (ref.current.value === currentVersionName) {
        setIsVersionSelected(true)
        setCurrentVersionID(id)
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
      onClick={onButtonClickHandler}
    >
      <TProgress isLoading={isPending}>

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
                        title={STRINGS.EDIT}
                        sx={{ "&:hover": { bgcolor: "#eaf6fb" } }}
                      />
                      {totalItems > 1 &&
                        <TMenuItem
                          popupState={popupStateHandler}
                          onClick={onDeleteHandler}
                          icon={<DeleteIcon color="error" fontSize="small" />}
                          title={STRINGS.DELETE}
                          sx={{ "&:hover": { bgcolor: " #fbeaea" } }} />}
                    </Menu>
                  }
                </TMenu>
              }
            </>
          }

        </Stack>

      </TProgress>
    </ToggleButton >



  )
}
