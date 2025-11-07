import { theme } from "@/theme/theme"
import { CssBaseline } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles"
import { LocalizationProvider } from "@mui/x-date-pickers"
import type { FC, ReactNode } from "react"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { QueryClientProvider } from "@tanstack/react-query"
import { IS_DEV_ENV, queryClient } from "@/api/queryClient"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter, Routes } from "react-router-dom"

type Props = {
  children: ReactNode
}

const ProvidersWrapper: FC<Props> = ({ children }) => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CssBaseline />
            <Routes >{children}</Routes>
          </LocalizationProvider>
        </ThemeProvider>
        {IS_DEV_ENV && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </BrowserRouter>

  )
}

export default ProvidersWrapper
