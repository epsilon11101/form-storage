import {
  CircularProgress,
  type CircularProgressProps,
  Stack,
  type StackProps,
} from '@mui/material'
import type { FC } from 'react'

//TODO : remove this component
interface TLoadingProps extends StackProps {
  progressProps?: CircularProgressProps
}

const TLoading: FC<TLoadingProps> = ({ progressProps, ...rest }) => {
  return (
    <Stack
      width="100vw"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      {...rest}
    >
      <CircularProgress color="titleOutline" {...progressProps} />
    </Stack>
  )
}

export default TLoading
