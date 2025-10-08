
import { type FocusEvent } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  ariaDescribedByIds,
  descriptionId,
  getTemplate,
  labelValue,
  schemaRequiresTrueValue,
  type FormContextType,
  type RJSFSchema,
  type StrictRJSFSchema,
  type WidgetProps,
} from "@rjsf/utils";

export default function CheckboxWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: WidgetProps<T, S, F>) {
  const {
    schema,
    id,
    value,
    disabled,
    readonly,
    label = "",
    hideLabel,
    autofocus,
    onChange,
    onBlur,
    onFocus,
    registry,
    options,
    uiSchema,
  } = props;
  const DescriptionFieldTemplate = getTemplate<
    "DescriptionFieldTemplate",
    T,
    S,
    F
  >("DescriptionFieldTemplate", registry, options);

  const required = schemaRequiresTrueValue<S>(schema);

  const _onChange = (_: any, checked: boolean) => onChange(checked);
  const _onBlur = ({ target }: FocusEvent<HTMLButtonElement>) =>
    onBlur(id, target && target.value);
  const _onFocus = ({ target }: FocusEvent<HTMLButtonElement>) =>
    onFocus(id, target && target.value);
  const description = options.description ?? schema.description;

  return (
    <>
      {!hideLabel && !!description && (
        <DescriptionFieldTemplate
          id={descriptionId<T>(id)}
          description={description}
          schema={schema}
          uiSchema={uiSchema}
          registry={registry}
        />
      )}
      <FormControlLabel
        control={
          <Checkbox
            id={id}
            name={id}
            checked={typeof value === "undefined" ? false : Boolean(value)}
            required={required}
            disabled={disabled || readonly}
            autoFocus={autofocus}
            onChange={_onChange}
            onBlur={_onBlur}
            onFocus={_onFocus}
            aria-describedby={ariaDescribedByIds<T>(id)}
          />
        }
        label={labelValue(label, hideLabel, false)}
      />
    </>
  );
}
