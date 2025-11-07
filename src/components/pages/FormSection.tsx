import TForm from "../ui/rjsf/TForm";
import Button from "@mui/material/Button";
import validator from '@rjsf/validator-ajv8';
import useReadDocument from "@/stores/useReadDocument";
import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { STRINGS } from "@/constants/strings";

const FormSection = () => {
  const formRef = useRef<HTMLDivElement | null>(null)

  const { schema, uiSchema, formData, setFormData, setPrintRef } = useReadDocument()


  useEffect(() => {
    setPrintRef(formRef)
  }, [formRef])

  return (
    <Box ref={formRef}
      className="print-container on-print"
      sx={{
        position: "static !important",
        display: "block !important",
      }}
    >
      <TForm
        schema={schema || {}}
        uiSchema={uiSchema || {}}
        validator={validator}
        noHtml5Validate
        liveValidate={false}
        showErrorList={false}
        formData={formData}
        onChange={e => setFormData(e.formData)}
      >
        <Button type="submit" variant="contained" color="primary" className="hide-on-print">{STRINGS.SUBMIT}</Button>
      </TForm >
    </Box>
  )
}

export default FormSection   
