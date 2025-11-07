import FormSection from "../FormSection";
import CodeSection from "../CodeSection";
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from "@/components/ui/resizable";
import useReadDocument from "@/stores/useReadDocument";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import FullPageFormDialog from "@/components/Dialogs/FullPageFormDialog";
import { useState } from "react";
import { TTooltip } from "@/components/ui/TTooltip";
import noData from "@/assets/noData.svg";
import { TProgress } from "@/components/ui/TProgress";
import { stringifyCode } from "@/utils/utils";
import { STRINGS } from "@/constants/strings";
const MainPage = () => {

  const [openFormDialog, setOpenFormDialog] = useState(false);
  const { schema, uiSchema, formData, isLoading } = useReadDocument();

  const onCloseDialogHandler = () => setOpenFormDialog(false);
  const onOpenDialogHandler = () => setOpenFormDialog(true);



  return (
    <>
      <TProgress
        isLoading={isLoading}
        progressProps={{
          size: "50px",
          sx: { color: (theme) => theme.palette.secondary.main },
        }}
      >
        {schema ? (
          <Grid container spacing={2} height="100%" direction="column" wrap="nowrap" alignItems="stretch">
            <Grid flex="1" width="100%">
              <ResizablePanelGroup direction="vertical" className="w-full h-screen rounded-lg border">
                {/* --- TOP HALF --- */}
                <ResizablePanel defaultSize={50}>
                  <ResizablePanelGroup direction="horizontal">
                    {/* LEFT: FORM SCHEMA */}
                    <ResizablePanel defaultSize={50}>
                      <Box className="h-full overflow-auto p-2">
                        <CodeSection code={stringifyCode(schema)} formType="schema" />
                      </Box>
                    </ResizablePanel>

                    <ResizableHandle withHandle />

                    {/* RIGHT: FORM RENDERIZADO (ICONO DE PANTALLA COMPLETA) */}
                    <ResizablePanel defaultSize={50} className="p-2" style={{ position: "static" }}>
                      <TTooltip title={STRINGS.FULL_SCREEN} placement="left" slotProps={{
                        popper: {
                          disablePortal: false,
                          modifiers: [
                            {
                              name: 'preventOverflow',
                              options: {
                                boundary: 'viewport',
                              },
                            }
                          ]
                        }
                      }}>
                        <Box component="span" sx={{ position: "sticky", right: 0, top: 0, zIndex: 100, display: "flex", justifyContent: "flex-end" }}>
                          <IconButton onClick={onOpenDialogHandler}>
                            <AspectRatioIcon fontSize="small" color="secondary" sx={{ p: 0 }} />
                          </IconButton>
                        </Box>
                      </TTooltip>

                      <Box className="h-full overflow-auto">
                        <FormSection />
                      </Box>
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </ResizablePanel>

                <ResizableHandle withHandle />

                {/* --- BOTTOM HALF --- */}
                <ResizablePanel defaultSize={50}>
                  <ResizablePanelGroup direction="horizontal">
                    {/* LEFT: UI SCHEMA */}
                    <ResizablePanel defaultSize={50}>
                      <Box className="h-full overflow-auto p-2">
                        <CodeSection code={stringifyCode(uiSchema)} formType="uiSchema" />
                      </Box>
                    </ResizablePanel>

                    <ResizableHandle withHandle />

                    {/* RIGHT: FORM DATA */}
                    <ResizablePanel defaultSize={50}>
                      <Box className="h-full overflow-auto p-2">
                        <CodeSection code={stringifyCode(formData)} formType="formData" />
                      </Box>
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </ResizablePanel>
              </ResizablePanelGroup>
            </Grid>
          </Grid>
        ) : (
          <Stack height="100%" justifyContent="center" alignItems="center" flex="1">
            <Box>
              <img src={noData} alt={STRINGS.NO_DATA_ALT} />
            </Box>
            <Typography variant="h3">{STRINGS.NO_DATA_MESSAGE}</Typography>
          </Stack>
        )}
      </TProgress>

      {/* DIALOG DE PANTALLA COMPLETA  */}
      <FullPageFormDialog title="" open={openFormDialog} onClose={onCloseDialogHandler} />
    </>
  );
};

export default MainPage;
