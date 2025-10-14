import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, ListItemIcon, ListItemText, MenuItem, type MenuItemProps } from "@mui/material";
import type { FC, ReactNode, MouseEvent } from "react";
import type { PopupState as InyectedProps } from "material-ui-popup-state/hooks";


type RenderProps = {
  bindMenuProps: ReturnType<typeof bindMenu>
  popupStateHandler: InyectedProps
}

interface TMenuProps {
  onTriggerClick?: () => void
  children: (props: RenderProps) => ReactNode
}


export const TMenu: FC<TMenuProps> = ({ onTriggerClick, children }) => {


  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    onTriggerClick?.()
  }

  return <PopupState variant="popover" popupId="version-submenu">
    {(popupState) => (
      <Box component="div" onClick={onClick}>
        <Box color="primary"  {...bindTrigger(popupState)} >
          <MoreVertIcon fontSize="medium" color="primary" />
        </Box>
        {children({ popupStateHandler: popupState, bindMenuProps: bindMenu(popupState) })}
      </Box>
    )}
  </PopupState>
}
interface TMenuItemProps {
  popupState: InyectedProps
  onClick: () => void
  icon: ReactNode
  title: string
  sx?: MenuItemProps["sx"]
}

export const TMenuItem: FC<TMenuItemProps> = ({ popupState, onClick, icon, title, sx }) => {

  const onCloseHandler = (e: MouseEvent<HTMLLIElement>) => {
    e.stopPropagation()
    onClick?.()
    popupState?.close()
  }

  return <MenuItem onClick={onCloseHandler} sx={sx} >
    <ListItemIcon >{icon}</ListItemIcon>
    <ListItemText>{title}</ListItemText>
  </MenuItem>


}
