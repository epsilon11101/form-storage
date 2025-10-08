import { CircularProgress, type CircularProgressProps } from "@mui/material"
import Stack, { type StackProps } from "@mui/material/Stack"
import type { FC } from "react"

interface TProgressProps extends StackProps {
  progressProps?: CircularProgressProps
}


export const TProgress: FC<TProgressProps> = ({ progressProps, ...rest }) => {

  return <Stack
    direction="column"
    justifyContent="center"
    alignItems="center"
    width="100%"
    height="100%"
    gap={1}
    {...rest}
  >

    <CircularProgress
      size="20px"
      sx={{ color: (theme) => theme.palette.tertiary.main }}
      {...progressProps}
    />
  </Stack>

}
