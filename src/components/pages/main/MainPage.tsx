import FormSection from "../FormSection";
import CodeSection from "../CodeSection";
import { Box, Grid, IconButton } from "@mui/material";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import Header from "./Header";
import useReadDocument from "@/stores/useReadDocument";
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import FullPageFormDialog from "@/components/Dialogs/FullPageFormDialog";
import { useState } from "react";
import { TTooltip } from "@/components/ui/TTooltip";


const MainPage = () => {
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const { schema, uiSchema, formData } = useReadDocument()
  const onCloseDialogHandler = () => {
    setOpenFormDialog(false)
  }
  const onOpenDialogHandler = () => {
    setOpenFormDialog(true)
  }
  return (
    <>
      <Grid container spacing={2} height="100%" direction="column" wrap="nowrap" alignItems={"stretch"}>
        <Grid size={2} width="100%" >
          <Header />
        </Grid>
        <Grid size={10} flex="1" width={"100%"}>
          <ResizablePanelGroup
            direction="horizontal"
            className="w-full h-screen rounded-lg border"
            style={{ overflow: "hidden" }}
          >
            <ResizablePanel defaultSize={50}>
              <ResizablePanelGroup direction="vertical">

                <ResizablePanel defaultSize={60} maxSize={60}>
                  <div className="h-full overflow-auto">
                    <CodeSection code={JSON.stringify(schema, null, 2)} />
                  </div>
                </ResizablePanel>

                <ResizableHandle />

                <ResizablePanel defaultSize={40} maxSize={40}>
                  <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel>
                      <div className="h-full overflow-auto">
                        <CodeSection code={JSON.stringify(uiSchema, null, 2)} />
                      </div>
                    </ResizablePanel>

                    <ResizableHandle withHandle />

                    <ResizablePanel>
                      <div className="h-full overflow-auto">
                        <CodeSection code={JSON.stringify(formData, null, 2)} />
                      </div>
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={25} className="p-2" style={{ position: "relative" }}>
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

      </Grid>
      <FullPageFormDialog title="" open={openFormDialog} onClose={onCloseDialogHandler} />
    </>

  );
};

export default MainPage;
