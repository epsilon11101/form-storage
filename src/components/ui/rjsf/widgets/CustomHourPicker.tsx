
import {
  type FormContextType,
  labelValue,
  type RJSFSchema,
  type StrictRJSFSchema,
  type WidgetProps,
} from "@rjsf/utils";
import { format, parseISO } from "date-fns";
import { MobileTimePicker } from "@mui/x-date-pickers";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { InputAdornment } from "@mui/material";

function CustomHourPicker<
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

  const handleDateChange = (date: Date | string | null) => {
    let parsedDate: Date | null = null;

    if (typeof date === "string") {
      parsedDate = parseISO(date);
    } else if (date instanceof Date) {
      parsedDate = date;
    }

    if (parsedDate && !isNaN(parsedDate.getTime())) {
      const dateFormatted = format(parsedDate, "yyyy-MM-dd");
      onChange(dateFormatted);
    } else {
      onChange(undefined);
    }
  };

  return (
    <MobileTimePicker
      label={labelValue(label || undefined, hideLabel, undefined)}
      value={value || null}
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
          InputProps: {
            endAdornment: (
              <InputAdornment position="start">
                <AccessTimeIcon />
              </InputAdornment>
            ),
          },
        },
      }}
    />
  );
}

export default CustomHourPicker;
