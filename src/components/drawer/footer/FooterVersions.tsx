import { ToggleButtonGroup } from "@mui/material"

import { useState, type MouseEvent } from "react";
import { FooterVersionItem } from "./FooterVersionItem";


export const FooterVersions = () => {
  const [version, setVersion] = useState("version 1")

  const handleChange = (event: MouseEvent<HTMLElement>,
    newVersion: string | null
  ) => {
    if (newVersion !== null) {
      setVersion(newVersion)
    }
  }



  return (
    <ToggleButtonGroup
      color="primary"
      value={version}
      exclusive
      onChange={handleChange}
      aria-label="control-versions"
      fullWidth
      sx={{
        overflowX: "auto",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
        msOverflowStyle: "none",
        whiteSpace: "nowrap",
      }}

    >
      <FooterVersionItem value="version 1" title="version 1" currentSelected={version} setVersion={setVersion} />


    </ToggleButtonGroup>

  )
}

