
import FormHelperText from "@mui/material/FormHelperText";
import {
  helpId,
  type FieldHelpProps,
  type FormContextType,
  type RJSFSchema,
  type StrictRJSFSchema,
} from "@rjsf/utils";

/** The `FieldHelpTemplate` component renders any help desired for a field
 *export
 * @param props - The `FieldHelpProps` to be rendered
 */
export default function FieldHelpTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: FieldHelpProps<T, S, F>) {
  const { idSchema, help } = props;
  if (!help) {
    return null;
  }
  const id = helpId<T>(idSchema);
  return (
    <FormHelperText component="div" id={id}>
      {help}
    </FormHelperText>
  );
}
