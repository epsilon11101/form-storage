import { ToggleButtonGroup } from "@mui/material"

import { useMemo, type MouseEvent } from "react";
import { FooterVersionItem } from "./FooterVersionItem";

import useGetFormVersion from "@/stores/useFormVersionsStore";
import { useFormVersions } from "@/api/hooks/useFormVersion";
import useGetIDForm from "@/stores/useFormStore";
import { TProgress } from "@/components/ui/TProgress";
import { STRINGS } from "@/constants/strings";


export const FooterVersions = () => {

  const { formID } = useGetIDForm()
  const { setCurrentVersionName, currentVersionName } = useGetFormVersion()

  const { data, isPending } = useFormVersions(formID || "")

  const footerVersions = useMemo(() => {
    if (!data?.versions.length) return null;
    return data.versions.map((vitem) => (
      <FooterVersionItem
        key={vitem.id || vitem.version} // importante para evitar warning
        title={vitem.name}
        id={vitem.version}
        value={vitem.name}
        totalItems={data.versions.length}
      />
    ));
  }, [data]);



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
        aria-label={STRINGS.CONTROL_VERSIONS_ARIA}
        fullWidth
        sx={{
          overflowX: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
          msOverflowStyle: "none",
          whiteSpace: "nowrap",
        }}

      >
        {footerVersions}
      </ToggleButtonGroup>
    </TProgress>


  )
}
