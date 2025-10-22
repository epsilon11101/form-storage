
import {
  type FormContextType,
  type RegistryFieldsType,
  type RegistryWidgetsType,
  type RJSFSchema,
  type StrictRJSFSchema,
  type TemplatesType,
} from "@rjsf/utils";

import { type FormProps, type ThemeProps, withTheme } from "@rjsf/core";
import { type ComponentType } from "react";
import CustomInputTemplate from "./templates/CustomInputTemplate";
import FieldTemplate from "./templates/FieldTemplate";
import FieldHelpTemplate from "./templates/FieldHelpTemplate";
import FieldErrorTemplate from "./templates/FieldErrorTemplate";
import CustomDatePicker from "./widgets/CustomDatePicker";
import CustomHourPicker from "./widgets/CustomHourPicker";
import CheckboxWidget from "./widgets/CheckBoxWidget";
import SelectWidget from "./widgets/SelectWidget";
import ObjectFieldTemplate from "./templates/ObjectFieldTemplate";
import ArrayFieldTemplate from "./templates/ArrayFieldTemplate";
import ArrayFieldItemTemplate from "./templates/ArrayFieldItemTemplate";



function TFormTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(): Partial<TemplatesType<T, S, F>> {
  return {
    BaseInputTemplate: CustomInputTemplate,
    FieldTemplate,
    FieldHelpTemplate,
    FieldErrorTemplate,
    ObjectFieldTemplate,
    ArrayFieldTemplate,
    ArrayFieldItemTemplate
  };
}

function TFormWidgets<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(): RegistryWidgetsType<T, S, F> {
  return {
    DatePickerWidget: CustomDatePicker,
    timeWidget: CustomHourPicker,
    CheckboxWidget,
    SelectWidget,
  };
}

function TFormFields<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(): RegistryFieldsType<T, S, F> {
  return {
  };
}

function TFormTheme<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(): ThemeProps<T, S, F> {
  return {
    templates: TFormTemplate<T, S, F>(),
    widgets: TFormWidgets<T, S, F>(),
    fields: TFormFields<T, S, F>(),
  };
}

function TForm<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(): ComponentType<FormProps<T, S, F>> {
  return withTheme<T, S, F>(TFormTheme<T, S, F>());
}

export default TForm();


export const TypedTForm = TForm;
