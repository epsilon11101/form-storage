import { Grid, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {
  getTemplate,
  getUiOptions,
  type ArrayFieldTemplateProps,
  type ArrayFieldTemplateItemType,
  type FormContextType,
  type RJSFSchema,
  type StrictRJSFSchema,
} from "@rjsf/utils";
import AddIcon from "@mui/icons-material/Add";
import ArrayFieldItemTemplate from "./ArrayFieldItemTemplate";

export default function ArrayFieldTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: ArrayFieldTemplateProps<T, S, F>) {
  const {
    canAdd,
    disabled,
    idSchema,
    uiSchema,
    items,
    onAddClick,
    readonly,
    registry,
    required,
    schema,
    title,
  } = props;
  const uiOptions = getUiOptions<T, S, F>(uiSchema);
  const ArrayFieldDescriptionTemplate = getTemplate<
    "ArrayFieldDescriptionTemplate",
    T,
    S,
    F
  >("ArrayFieldDescriptionTemplate", registry, uiOptions);

  const ArrayFieldTitleTemplate = getTemplate<
    "ArrayFieldTitleTemplate",
    T,
    S,
    F
  >("ArrayFieldTitleTemplate", registry, uiOptions);

  return (
    <Paper elevation={2}>
      <Box p={2}>
        <ArrayFieldTitleTemplate
          idSchema={idSchema}
          title={uiOptions.title || title}
          schema={schema}
          uiSchema={uiSchema}
          required={required}
          registry={registry}
        />
        <ArrayFieldDescriptionTemplate
          idSchema={idSchema}
          description={uiOptions.description || schema.description}
          schema={schema}
          uiSchema={uiSchema}
          registry={registry}
        />
        <Grid
          container
          size="grow"
          columnGap={2}
          display="flex"
          justifyContent="space-around"
        >
          {items &&
            items.map(
              ({ key, ...itemProps }: ArrayFieldTemplateItemType<T, S, F>) => (
                <ArrayFieldItemTemplate key={key} {...itemProps} />
              )
            )}
        </Grid>
        {canAdd && (
          <Grid container justifyContent="flex-end">
            <Grid>
              <Box mt={2}>
                <IconButton
                  color="primary"
                  onClick={onAddClick}
                  disabled={disabled || readonly}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
    </Paper>
  );
}
