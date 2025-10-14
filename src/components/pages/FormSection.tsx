import type { RJSFSchema } from "@rjsf/utils";
import TForm from "../ui/rjsf/TForm";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import validator from '@rjsf/validator-ajv8';
import useReadDocument from "@/stores/useReadDocument";

const FormSection = () => {

  const { schema, uiSchema, formData, setFormData } = useReadDocument()

  return (
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
      <Button type="submit" variant="contained" color="primary" >Enviar</Button>
    </TForm >
  )
}

export default FormSection   
