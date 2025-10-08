
import {
  type FormContextType,
  labelValue,
  type RJSFSchema,
  type StrictRJSFSchema,
  type WidgetProps,
} from "@rjsf/utils";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
function CustomDatePicker<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: WidgetProps<T, S, F>) {
  const {
    id,
    name,
    value,
    placeholder,
    required,
    disabled,
    readonly,
    autofocus,
    label,
    hideLabel,
    onChange,
    onBlur,
    onFocus,
  } = props;

  const handleDateChange = (date: Dayjs | null) => {
    if (date && date.isValid()) {
      onChange(date.format("YYYY-MM-DD"));
    } else {
      onChange(undefined);
    }
  };

  return (
    <DatePicker
      label={labelValue(label || undefined, hideLabel, undefined)}
      value={value ? dayjs(value) : null}
      onChange={handleDateChange}
      autoFocus={autofocus}
      disabled={disabled}
      readOnly={readonly}
      slotProps={{
        textField: {
          id,
          name,
          placeholder,
          required,
          onBlur: ({ target: { value } }) => onBlur(id, value),
          onFocus: ({ target: { value } }) => onFocus(id, value),
        },
      }}
    />
  );
}

export default CustomDatePicker;
