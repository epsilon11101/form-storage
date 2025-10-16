import { CircularProgress, type CircularProgressProps } from "@mui/material"
import Stack, { type StackProps } from "@mui/material/Stack"
import { type FC, type ReactNode, } from "react"





interface TProgressProps extends Omit<StackProps, "children"> {
  progressProps?: CircularProgressProps
  children?: ReactNode
  isLoading?: boolean
}
interface ProgressProps extends Omit<TProgressProps, "children" | "isLoading"> { }

export const TProgress: FC<TProgressProps> = ({ progressProps, children, isLoading, ...rest }) => {

  const progress = <Progress progressProps={progressProps} {...rest} />


  if (!children) {
    return <>{progress}</>
  }

  return <>
    {isLoading ?
      <>{progress}</>
      :
      <>
        {children}
      </>
    }
  </>

}


const Progress: FC<ProgressProps> = ({ progressProps, ...rest }) => {
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
