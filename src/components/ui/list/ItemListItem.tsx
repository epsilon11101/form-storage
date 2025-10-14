import { formQueryKeys, useForm } from "@/api/hooks/useForms"
import useReadDocument from "@/stores/useReadDocument"
import { SURFACE } from "@/theme/colors"
import { parseSchemaString } from "@/utils/utils"
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, type CollapseProps } from "@mui/material"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useState, type Dispatch, type FC, type ReactNode, type SetStateAction } from "react"


interface ItemLisItemProps extends CollapseProps {
  selected: boolean,
  onSelect: () => void,
  icon: ReactNode
  name: string
  id: string
}



export const ItemListItem: FC<ItemLisItemProps> = ({ icon, id, name, selected = false, onSelect, ...rest }) => {

  const { data, refetch, isLoading } = useForm(id)
  const { setFileSchema, setFileUiSchema, setFormData, setIsLoading } = useReadDocument()
  const queryClient = useQueryClient()

  const onClickHandler = async () => {
    queryClient.removeQueries({ queryKey: formQueryKeys.detail(id) })
    await refetch()
  }


  useEffect(() => {
    if (!data) return
    const updateContent = () => {
      const content = data.data.propertyName
      const { schema, uiSchema } = parseSchemaString(content)
      setFileSchema(schema ?? {})
      setFileUiSchema(uiSchema ?? {})
      setFormData({})

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
        }}
      >
        <ListItemIcon sx={{ minWidth: 24 }}>{icon}</ListItemIcon>
        <ListItemText primary={name} primaryTypographyProps={{
          noWrap: true,
          variant: "caption",
          color: SURFACE
        }} />
      </ListItemButton>

    </List>
  </Collapse>

}
