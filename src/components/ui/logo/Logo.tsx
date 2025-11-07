import { Divider, Stack, Typography } from "@mui/material"
import logo1 from "@/assets/logo1.svg"
import logo2 from "@/assets/logo2.svg"
import { STRINGS } from "@/constants/strings";



const Logo = () => {
  return (
    <Stack direction="column" width="100%" justifyContent="center" gap={1}>
      <Stack direction="row" flex="1" justifyContent="center" gap={1}>
        <img src={logo1} width={63} height={63} />
        <Divider orientation="vertical" flexItem />
        <img src={logo2} width={63} height={63} />
      </Stack>

      <Stack direction="column" flex="1" justifyContent="center" gap={1} >
        <Typography variant="h4" textAlign="center">{STRINGS.SIRECAT_TITLE}</Typography>
        <Typography variant="textTitles" textAlign="center">{STRINGS.SIRECAT_SUBTITLE}</Typography>
      </Stack>
    </Stack >
  )
}

export default Logo
