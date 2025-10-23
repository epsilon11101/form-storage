import { ToggleButtonGroup } from "@mui/material"
import { useMemo, useState, type MouseEvent } from "react";
import { FooterVersionItem } from "./FooterVersionItem";

import useGetIDForm from "@/stores/useFormStore";
import { useFormVersions } from "@/api/hooks/useFormVersion";
import { TProgress } from "@/components/ui/TProgress";
import useGetFormVersion from "@/stores/useFormVersionsStore";


export const FooterVersions = () => {
  const { currentVersionName, setCurrentVersionName, currentVersionID } = useGetFormVersion()
  console.log("CURRENT VERSIONNAME==>", currentVersionName)

  const { formID } = useGetIDForm()
  const { data, isPending } = useFormVersions(formID || "")


  const hasVersions = !!data
  console.log(currentVersionName, currentVersionID)


  const versionElements = useMemo(() => {
    if (!data || data.length <= 0) return;
    return data.map(v => {
      return <FooterVersionItem key={v.id} id={v.version} value={v.name} title={v.name} />
    })
  }, [data])





  const handleChange = (event: MouseEvent<HTMLElement>,
    newVersion: string | null
  ) => {
    if (newVersion !== null) {
      setCurrentVersionName(newVersion)
    }
  }



  return (
    <TProgress isLoading={isPending}>
      <ToggleButtonGroup
        color="primary"
        value={currentVersionName}
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

      >{hasVersions ?
        versionElements
        : null
        }

      </ToggleButtonGroup>
    </TProgress>


  )
}

