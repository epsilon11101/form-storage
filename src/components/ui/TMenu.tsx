import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, IconButton, ListItemIcon, ListItemText, MenuItem, type IconButtonProps, type MenuItemProps, type SvgIconProps } from "@mui/material";
import type { FC, ReactNode, MouseEvent } from "react";
import type { PopupState as InyectedProps } from "material-ui-popup-state/hooks";


type RenderProps = {
  bindMenuProps: ReturnType<typeof bindMenu>
  popupStateHandler: InyectedProps
}

interface TMenuProps {
  onTriggerClick?: () => void
  children: (props: RenderProps) => ReactNode
  slotProps?: {
    iconButtonProps: IconButtonProps
    iconProps: SvgIconProps
  }

}


export const TMenu: FC<TMenuProps> = ({ onTriggerClick, slotProps, children }) => {


  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    onTriggerClick?.()
  }

  return <PopupState variant="popover" popupId="version-submenu">
    {(popupState) => (
      <Box component="div" onClick={onClick}>
        <IconButton color="primary" {...slotProps?.iconButtonProps}  {...bindTrigger(popupState)} disableRipple >
          <MoreVertIcon fontSize="medium" color="primary" {...slotProps?.iconProps} />
        </IconButton>
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
