import { OUTLINE_VARIANT } from '@/theme/colors';
import { styled } from '@mui/material';
import Tooltip, { type TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

export const TTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: OUTLINE_VARIANT,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: OUTLINE_VARIANT,
  },
})); 
