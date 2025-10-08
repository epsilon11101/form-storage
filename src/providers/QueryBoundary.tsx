import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import {
  ErrorBoundary,
  type ErrorBoundaryPropsWithRender,
  type FallbackProps,
} from "react-error-boundary";
import { Suspense, type FC, type ReactNode } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { queryClient } from "@/api/queryClient";
import RefreshIcon from '@mui/icons-material/Refresh';
import { TProgress } from "@/components/ui/TProgress";

type Props = Partial<ErrorBoundaryPropsWithRender> & {
  children: ReactNode;
  resetKeys?: any[];
};

export const QueryBoundary: FC<Props> = ({
  children,
  fallbackRender,
  resetKeys,
  ...rest
}) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={() => {
        queryClient.clear()
        reset()
      }}
      resetKeys={resetKeys}
      fallbackRender={
        fallbackRender ??
        (({ resetErrorBoundary }: FallbackProps) => (
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
            gap={1}

          >
            <Typography variant="caption" color="error">
              Hubo un error!
            </Typography>
            <Button
              onClick={resetErrorBoundary}
              variant="contained"
              color="primary"
              endIcon={<RefreshIcon />}
              sx={{ color: theme => theme.palette.common.white }}
            >
              Volver a intentar
            </Button>
          </Stack>
        ))
      }
      {...rest}
    >
      <Suspense
        fallback={
          <TProgress />
        }
      >
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};
