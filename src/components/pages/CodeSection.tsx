import CodeMirror from "@uiw/react-codemirror";
import { json, jsonParseLinter } from "@codemirror/lang-json";
import { lintGutter, linter } from "@codemirror/lint";
import { githubLight } from "@uiw/codemirror-theme-github";
import type { ViewUpdate } from "@codemirror/view";
import { Alert, debounce, Typography } from "@mui/material";
import { useState, type FC } from "react";
import { EditorView } from "@codemirror/view";

interface Props {
  code: string | undefined;
}

const CodeSection: FC<Props> = ({ code }) => {
  const [errors, setErrors] = useState<null | string[]>(null);

  const handleCodeChange = (value: string, viewUpdate: ViewUpdate) => {
    const diagnostics = jsonParseLinter()(viewUpdate.view);

    if (diagnostics.length > 0) {
      setErrors(diagnostics.map(d => d.message))
    } else {
      setErrors(null)

    }
  };

  return (
    <>
      <CodeMirror
        value={code}
        height="100%"
        extensions={[
          json(),
          lintGutter(),
          linter(jsonParseLinter()),
          EditorView.lineWrapping,
        ]}
        theme={githubLight}
        onChange={debounce(handleCodeChange, 1000)} />

      {errors && <Alert severity="error" sx={{ mt: 2 }}>
        <Typography variant="caption">{errors.map(e => e)}</Typography>
      </Alert>}

    </>
  );
};

export default CodeSection;
