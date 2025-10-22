import { formQueryKeys, useDeleteForm, useForm, useUpdateForm } from "@/api/hooks/useForms"
import useReadDocument from "@/stores/useReadDocument"
import { SURFACE } from "@/theme/colors"
import { parseSchemaString } from "@/utils/utils"
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Menu, type CollapseProps } from "@mui/material"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect, type FC, type ReactNode } from "react"

import ClearIcon from '@mui/icons-material/Clear';
import { TMenu, TMenuItem } from "../TMenu"
import EditIcon from '@mui/icons-material/Edit';
import { useEditingField } from "../editingField/useEditingField"
import { TEditingField } from "../editingField/TEditingField"
import useGetIDForm from "@/stores/useFormStore"
import { TProgress } from "../TProgress"
import useGetFormVersion from "@/stores/useFormVersionsStore"

type parentProps = {
  id: string,
  name: string
}

interface ItemLisItemProps extends CollapseProps {
  selected: boolean,
  onSelect: () => void,
  icon: ReactNode
  name: string
  id: string
  parent: parentProps
}



export const ItemListItem: FC<ItemLisItemProps> = ({ icon, id, name, selected, parent, onSelect, ...rest }) => {

  const { isEditing, setIsEditing, onChangeHandler, onKeyEnterHandler, onCancelHandler, value } = useEditingField({
    initialValue: name,
    onEnter: onUpdateHandler
  })
  const { mutate: updateForm, isPending: isUpdatePending } = useUpdateForm()
  const { data, refetch, isLoading } = useForm(id)
  const { setFileSchema, setFileUiSchema, setFormData, setIsLoading } = useReadDocument()
  const { mutate: onDelete, isPending, isSuccess, isError } = useDeleteForm()
  const { setFormParentName, setFormParentID, formParentID, setFormID } = useGetIDForm()
  const { setCurrentFormVersion } = useGetFormVersion()
  const deleteStatus = (isSuccess || isPending) && !isError
  const queryClient = useQueryClient()


  const onClickHandler = async () => {
    console.log("ON CLICK")
    setFormParentName(parent.name)
    setFormParentID(parent.id)
    setFormID(id)
    onSelect?.()
    queryClient.removeQueries({ queryKey: formQueryKeys.detail(id) })
    const { data, error } = await refetch()
    if (error) {
      console.log("refetching error", error, JSON.stringify(data))
      return
    }
    setCurrentFormVersion(String(data?.currentVersion))
  }

  function onUpdateHandler() {

    if (!formParentID) return
    updateForm({
      groupID: formParentID, formID: id, name: value,
    }, {
      onSuccess: () => {
        setIsEditing(false)
      }
    })

  }

  const onDeleteHandler = () => {
    onDelete(id, {
      onSuccess: () => {
        setFileSchema(null)
        setFileUiSchema(null)
        setFormData({})
      }
    })
  }

  const onEditHandler = () => {
    setIsEditing(true)
  }


  useEffect(() => {
    if (!data) return
    const updateContent = () => {
      const content = data.data.propertyName
      console.log(content)
      const { schema, uiSchema, formData } = parseSchemaString(content)
      setFileSchema(schema ?? {})
      setFileUiSchema(uiSchema ?? {})
      setFormData(formData ?? {})

    }

    updateContent()

  }, [data])

  useEffect(() => {
    setIsLoading(isLoading)
  }, [isLoading])




  return <Collapse
    timeout="auto"
    unmountOnExit
    onClick={onClickHandler}
    {...rest}
  >
    <List component="div" disablePadding>
      <ListItemButton selected={selected}
        sx={{
          pl: 4,
          bgcolor: selected ? 'primary.main' : 'transparent',
          color: selected ? 'white' : 'inherit',
          transition: 'background-color 0.9s ease',
          '&:hover': {
            bgcolor: selected ? 'primary.dark' : 'action.hover',
          },
          boxShadow: theme => selected ? `inset -4px 0 0 ${theme.palette.primary.main}` : "none"
        }}
      >
        {
          isEditing ?
            <TEditingField
              value={value}
              onChange={onChangeHandler}
              onKeyDown={onKeyEnterHandler}
              onCancel={onCancelHandler}
            />
            :
            <TProgress isLoading={isUpdatePending}>
              <ListItemIcon sx={{ minWidth: 24 }}>{icon}</ListItemIcon>
              <ListItemText primary={deleteStatus ? "Eliminando" : name} primaryTypographyProps={{
                noWrap: true,
                variant: "caption",
                sx: {
                  color: theme => deleteStatus ? theme.palette.error.main : SURFACE
                }
              }} />
              <TMenu slotProps={
                {
                  iconButtonProps: {
                    disabled: !selected,
                  },
                  iconProps: {
                    fontSize: "small",
                    sx: {
                      color: theme => selected ? theme.palette.primary.main : theme.palette.action.disabled
                    }
                  }
                }
              }>
                {({ popupStateHandler, bindMenuProps }) =>
                  <Menu {...bindMenuProps}>
                    <TMenuItem
                      popupState={popupStateHandler}
                      onClick={onEditHandler}

                      icon={<EditIcon color="primary" fontSize="small" />}
                      title="Editar"
                      sx={{ "&:hover": { bgcolor: "#eaf6fb" } }} />
                    <TMenuItem
                      popupState={popupStateHandler}
                      onClick={onDeleteHandler}
                      icon={<ClearIcon color="error" fontSize="small" />}
                      title="Eliminar"
                      sx={{ "&:hover": { bgcolor: " #fbeaea" } }} />
                  </Menu>
                }
              </TMenu>
            </TProgress>
        }
      </ListItemButton>

    </List>
  </Collapse >

}
