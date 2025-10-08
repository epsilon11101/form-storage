import type { RJSFSchema } from "@rjsf/utils";
import TForm from "../ui/rjsf/TForm";
import Button from "@mui/material/Button";
import { useState } from "react";
import validator from '@rjsf/validator-ajv8';

const schema: RJSFSchema = {
  title: 'Test form',
  type: 'object',
  properties: {
    name: { type: 'string' },
    age: { type: 'number' },
    birthday: {
      type: 'string',
      format: 'date',
      title: 'Fecha de nacimiento',
    },
  },
  required: ["name", "birthday"],
};

const uiSchema = {
  birthday: {
    "ui:widget": "DatePickerWidget",
  },
};

const FormSection = () => {
  const [parsedSchema, setParsedSchema] = useState<RJSFSchema>(schema);
  return (
    <TForm
      schema={parsedSchema}
      uiSchema={uiSchema}
      validator={validator}
      noHtml5Validate
      liveValidate={false}
      showErrorList={false}
    >
      <Button type="submit" variant="contained" color="primary" >Enviar</Button>
    </TForm>
  )
}

export default FormSection    
