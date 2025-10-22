import CodeMirror from "@uiw/react-codemirror";
import { json, jsonParseLinter } from "@codemirror/lang-json";
import { lintGutter, linter } from "@codemirror/lint";
import { githubLight } from "@uiw/codemirror-theme-github";
import type { ViewUpdate } from "@codemirror/view";
import { Alert, debounce, Typography } from "@mui/material";
import { useEffect, useState, type FC } from "react";
import { EditorView } from "@codemirror/view";
import useReadDocument from "@/stores/useReadDocument";
import { stringifyCode } from "@/utils/utils";
import { useUpdateFormVersion } from "@/api/hooks/useFormVersion";
import useGetIDForm from "@/stores/useFormStore";
import useGetFormVersion from "@/stores/useFormVersionsStore";


interface Props {
  code: string | undefined;
  formType: "schema" | "uiSchema" | "formData"
}

const CodeSection: FC<Props> = ({ code, formType }) => {
  const [errors, setErrors] = useState<null | string[]>(null);
  const { setFileSchema, setFormData, setFileUiSchema, setAutoSaveLoading } = useReadDocument()
  const { formID } = useGetIDForm()
  const { currentVersion } = useGetFormVersion()
  const { isPending, mutate: updateVersion } = useUpdateFormVersion()



  const handleCodeChange = (value: string, viewUpdate: ViewUpdate) => {

    const diagnostics = jsonParseLinter()(viewUpdate.view);

    if (diagnostics.length > 0) {
      setErrors(diagnostics.map(d => d.message))
    } else {
      setErrors(null)
      const data = JSON.parse(value)

      switch (formType) {
        case "schema":
          setFileSchema(data)
          break;
        case "uiSchema":
          setFileUiSchema(data)
          break;
        case "formData":
          setFormData(data)
          break;
      }

      onSaveData()
    }
  };

  const onSaveData = () => {

    const mergedData = {
      "schema": useReadDocument.getState().schema,
      "uiSchema": useReadDocument.getState().uiSchema,
      "formData": useReadDocument.getState().formData
    }
    const stringifyData = stringifyCode(mergedData)
    console.log(currentVersion)
    updateVersion({
      formID: formID || "error",
      versionNumber: Number(currentVersion),
      data: {
        propertyName: stringifyData || ""
      }
    })

  }


  useEffect(() => {
    setAutoSaveLoading(isPending)
  }, [isPending])

  return (
    <>
      <CodeMirror
        value={code}
        height="100%"
        extensions={[
          json(),
          lintGutter(),
          linter(jsonParseLinter()),
          EditorView.lineWrapping,
        ]}
        theme={githubLight}
        onChange={debounce(handleCodeChange, 1000)} />

      {errors && <Alert severity="error" sx={{ mt: 2 }}>
        <Typography variant="caption">{errors.map(e => e)}</Typography>
      </Alert>}

    </>
  );
};

export default CodeSection;
