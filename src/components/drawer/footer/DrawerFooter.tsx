import useDrawer from "@/stores/useDrawer"
import { AppBar, IconButton, Toolbar, } from "@mui/material"
import { FooterVersions } from "./FooterVersions"
import AddIcon from '@mui/icons-material/Add';
import { TTooltip } from "@/components/ui/TTooltip";
import { QueryBoundary } from "@/providers/QueryBoundary";
import useGetIDForm from "@/stores/useFormStore";
import { Activity, startTransition } from "react";
import { useCreateFormVersion } from "@/api/hooks/useFormVersion";
import useGetFormVersion from "@/stores/useFormVersionsStore";
import { parseSchemaString } from "@/utils/utils";
import useReadDocument from "@/stores/useReadDocument";
import { TProgress } from "@/components/ui/TProgress";
import { STRINGS } from "@/constants/strings";
import { usePathName } from "@/hooks/usePathName";



const DrawerFooter = () => {
  const { hidden } = usePathName()
  if (!hidden) return null

  const { drawerWidth } = useDrawer()
  const { formID } = useGetIDForm()
  const { currentVersionID, setCurrentVersionID, setCurrentVersionName } = useGetFormVersion()
  const { setFileSchema, setFileUiSchema, setFormData } = useReadDocument()

  const { mutate: createVersion, isPending } = useCreateFormVersion()

  const onCreateVersion = () => {
    if (!formID || !currentVersionID) return
    try {
      createVersion({
        formID,
        sourceVersion: currentVersionID,
      }, {
        onSuccess: (data) => {

          startTransition(() => {
            const { schema, uiSchema, formData } = parseSchemaString(data.data.propertyName)

            setCurrentVersionID(data.version)
            setCurrentVersionName(data.name)
            setFileSchema(schema ?? {})
            setFileUiSchema(uiSchema ?? {})
            setFormData(formData ?? {})

          })

        }
      })

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Activity mode={formID ? "visible" : "hidden"}>

      <QueryBoundary>
        <AppBar

          position="fixed"
          component="footer"
          sx={{
            bgcolor: theme => theme.palette.common.white,

            top: "auto",
            bottom: 0,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: (theme) =>
              theme.transitions.create(["width"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
          }}
        >
          <Toolbar sx={{ gap: 2 }}>
            <TTooltip title={STRINGS.NEW_VERSION}>
              <IconButton sx={{ p: 0 }} onClick={onCreateVersion}><AddIcon /></IconButton>
            </TTooltip>

            <TProgress isLoading={isPending}>
              <FooterVersions />
            </TProgress>
          </Toolbar>

        </AppBar >
      </QueryBoundary>

    </Activity>


  )
}

export default DrawerFooter
