import type { DialogProps } from "@mui/material";

export interface Props extends Pick<DialogProps, "open" | "onClose"> {
  title: string
}
