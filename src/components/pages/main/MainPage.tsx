import FormSection from "../FormSection";
import CodeSection from "../CodeSection";
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

import useReadDocument from "@/stores/useReadDocument";
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import FullPageFormDialog from "@/components/Dialogs/FullPageFormDialog";
import { useState } from "react";
import { TTooltip } from "@/components/ui/TTooltip";
import noData from "@/assets/noData.svg"
import { TProgress } from "@/components/ui/TProgress";
import { stringifyCode } from "@/utils/utils";


const MainPage = () => {
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const { schema, uiSchema, formData, isLoading } = useReadDocument()
  const onCloseDialogHandler = () => {
    setOpenFormDialog(false)
  }
  const onOpenDialogHandler = () => {
    setOpenFormDialog(true)
  }

  return (

    <>
      <TProgress
        isLoading={isLoading}
        progressProps={{
          size: "50px",
          sx: {
            color: theme => theme.palette.secondary.main
          }
        }}><>
          {schema ?
            <Grid container spacing={2} height="100%" direction="column" wrap="nowrap" alignItems={"stretch"}>

              <Grid size={10} flex="1" width={"100%"}>
                <ResizablePanelGroup
                  direction="horizontal"
                  className="w-full h-screen rounded-lg border"
                  style={{ overflow: "hidden" }}
                >
                  <ResizablePanel defaultSize={50}>
                    <ResizablePanelGroup direction="vertical">

                      <ResizablePanel defaultSize={60} maxSize={60} style={{ maxHeight: "500px" }}>
                        <div className="h-full overflow-auto">
                          <CodeSection code={stringifyCode(schema)} formType="schema" />
                        </div>
                      </ResizablePanel>

                      <ResizableHandle />

                      <ResizablePanel defaultSize={40} maxSize={40}>
                        <ResizablePanelGroup direction="horizontal">
                          <ResizablePanel>
                            <div className="h-full overflow-auto">
                              <CodeSection code={stringifyCode(uiSchema)} formType="uiSchema" />
                            </div>
                          </ResizablePanel>

                          <ResizableHandle withHandle />

                          <ResizablePanel>
                            <div className="h-full overflow-auto">
                              <CodeSection code={stringifyCode(formData)} formType="formData" />
                            </div>
                          </ResizablePanel>
                        </ResizablePanelGroup>
                      </ResizablePanel>
                    </ResizablePanelGroup>
                  </ResizablePanel>

                  <ResizableHandle withHandle />

                  <ResizablePanel defaultSize={25} className="p-2" style={{ position: "relative", maxHeight: "500px", overflow: "auto" }}>
                    <TTooltip title="Pantalla Completa" placement="left">
                      <Box component="span" sx={{ position: "absolute", right: 0, top: 0, zIndex: 1000 }}>
                        <IconButton onClick={onOpenDialogHandler}>
                          <AspectRatioIcon fontSize="small" color="secondary" sx={{ p: 0 }} />
                        </IconButton>
                      </Box>
                    </TTooltip>

                    <FormSection />
                  </ResizablePanel>
                </ResizablePanelGroup>

              </Grid>

            </Grid> :
            <Stack height="100%" justifyContent="center" alignItems="center" flex="1">
              <Box>
                <img src={noData} alt="no-data-img" />
              </Box>
              <Typography variant="h3">No hay nada que mostrar</Typography>
            </Stack>
          }
        </>
      </TProgress>

      <FullPageFormDialog title="" open={openFormDialog} onClose={onCloseDialogHandler} />
    </>

  );
};

export default MainPage;
