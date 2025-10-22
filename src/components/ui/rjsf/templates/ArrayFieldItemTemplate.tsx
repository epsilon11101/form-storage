import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
  getUiOptions,
  type ArrayFieldTemplateItemType,
  type FormContextType,
  type RJSFSchema,
  type StrictRJSFSchema,
} from "@rjsf/utils";
import type { CSSProperties, FC } from "react";

const btnStyle: CSSProperties = {
  flex: 1,
  paddingLeft: 6,
  paddingRight: 6,
  fontWeight: "bold",
  minWidth: 0,
};

export default function ArrayFieldItemTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: ArrayFieldTemplateItemType<T, S, F>) {
  const {
    children,
    disabled,
    readonly,
    hasToolbar,
    hasRemove,
    hasMoveUp,
    hasMoveDown,
    index,
    onDropIndexClick,
    onReorderClick,
    uiSchema,
    registry,
  } = props;

  const uiOptions = getUiOptions<T, S, F>(uiSchema);

  const {
    ButtonTemplates: { MoveUpButton, MoveDownButton, RemoveButton },
  } = registry.templates;

  return (
    <Grid container alignItems="center" style={{ marginBottom: 8 }}>
      <Grid item xs style={{ overflow: "auto" }}>
        <Box mb={2}>
          <Paper elevation={1}>
            <Box p={2}>{children}</Box>
          </Paper>
        </Box>
      </Grid>

      {hasToolbar && (
        <Grid item>
          <Box display="flex" gap={1}>
            {hasMoveUp && (
              <MoveUpButton
                style={btnStyle}
                disabled={disabled || readonly}
                onClick={onReorderClick(index, index - 1)}
                uiSchema={uiOptions}
                registry={registry}
              />
            )}
            {hasMoveDown && (
              <MoveDownButton
                style={btnStyle}
                disabled={disabled || readonly}
                onClick={onReorderClick(index, index + 1)}
                uiSchema={uiOptions}
                registry={registry}
              />
            )}
            {hasRemove && (
              <RemoveButton
                style={btnStyle}
                disabled={disabled || readonly}
                onClick={onDropIndexClick(index)}
                uiSchema={uiOptions}
                registry={registry}
              />
            )}
          </Box>
        </Grid>
      )}
    </Grid>
  );
}
