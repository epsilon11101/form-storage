import { SURFACE } from "@/theme/colors"
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, type CollapseProps } from "@mui/material"
import type { FC, ReactNode } from "react"


interface ItemLisItemProps extends CollapseProps {
  icon: ReactNode
  name: string
  id: string
}



export const ItemListItem: FC<ItemLisItemProps> = ({ icon, id, name, ...rest }) => {
  //TODO: aqui se manda a llamar los formularios por id

  const onClick = () => { }

  return <Collapse
    timeout="auto"
    unmountOnExit
    onClick={() => { console.log("expandiendo", id) }}
    {...rest}
  >
    <List component="div" disablePadding>
      <ListItemButton sx={{ pl: 4 }}>
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
