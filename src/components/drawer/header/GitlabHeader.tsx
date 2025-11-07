import {
  Button,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import KeyIcon from "@mui/icons-material/Key";
import RouteIcon from "@mui/icons-material/Route";
import SearchIcon from "@mui/icons-material/Search";
import { useGitlab } from "@/stores/useGitlabToken";
import { DatePicker, LocalizationProvider, type DateValidationError, type PickerChangeHandlerContext } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { esES } from "@mui/x-date-pickers/locales";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import type { PickerValue } from "@mui/x-date-pickers/internals";
import { useGitlabIssues } from "@/api/hooks/useGitlabIssues";
import { TProgress } from "@/components/ui/TProgress";

const GitlabHeader = () => {
  const {
    token,
    setToken,
    setInitialDate,
    setEndDate,
    path,
    setPath,
    initialDate,
    endDate,
  } = useGitlab();

  const { refetch, data, isPending } = useGitlabIssues()
  console.log("IS PENDING???", isPending)


  const [errors, setErrors] = useState({
    token: false,
    path: false,
    start: false,
    end: false,
  });


  const convertDate = (value: PickerValue): string => {
    if (!value) return "";
    const dateValue = value instanceof Date ? value : value.toDate();
    return format(dateValue, "dd/MM/yyyy", { locale: es });
  };


  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    if (name === "gitlab-api") setToken(value);
    if (name === "gitlab-path") setPath(value);
  };

  const onChangeStartDatePicker = (value: PickerValue, context: PickerChangeHandlerContext<DateValidationError>) => {
    setInitialDate(convertDate(value));
  };

  const onChangeEndDatePicker = (value: PickerValue, context: PickerChangeHandlerContext<DateValidationError>) => {
    setEndDate(convertDate(value));
  };


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newErrors = {
      token: !token.trim(),
      path: !path.trim(),
      start: !initialDate.trim(),
      end: !endDate.trim(),
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some(Boolean);
    if (hasError) return;
    console.log("DOING REFETCH")
    refetch()
  };

  const isFormValid = token && path && initialDate && endDate;


  useEffect(() => {
    if (!data) return
    console.log("CREATING DATA")
    const items = data.reduce((acc, issue) => {
      if (!issue?.id) {
        console.warn(" ISSUE SIN ID", issue);
        return acc; // continuar sin romper el reduce
      }

      const milestoneId = issue.milestone?.id ?? null;
      const milestoneTitle = issue.milestone?.title ?? "Sin milestone";

      acc.push({
        id: issue.id,
        name: issue.title ?? "Sin título",
        parent: {
          id: milestoneId,
          name: milestoneTitle,
        },
        content: issue.description ?? "",
      });

      return acc;
    }, [] as {
      id: string;
      name: string;
      parent: { id: string, name: string };
      content: string;
    }[]);

    console.log({ items })
  }, [data])

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={es}
      localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}
    >
      <form onSubmit={handleSubmit}>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          sx={{ p: 2 }}
        >
          <TextField
            type="password"
            required
            name="gitlab-api"
            label="GITLAB API"
            variant="outlined"
            value={token}
            onChange={onChangeHandler}
            error={errors.token}
            helperText={errors.token && "Campo obligatorio"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <DatePicker
            label="Inicio"
            onChange={onChangeStartDatePicker}
            slotProps={{
              textField: {
                required: true,
                error: errors.start,
                helperText: errors.start && "Campo obligatorio",
              },
            }}
          />

          <DatePicker
            label="Fin"
            onChange={onChangeEndDatePicker}
            slotProps={{
              textField: {
                required: true,
                error: errors.end,
                helperText: errors.end && "Campo obligatorio",
              },
            }}
          />

          <TextField
            required
            name="gitlab-path"
            label="RUTA DEL PROYECTO"
            variant="outlined"
            value={path}
            onChange={onChangeHandler}
            error={errors.path}
            helperText={errors.path && "Campo obligatorio"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <RouteIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            type="submit"
            startIcon={<SearchIcon />}
            disabled={!isFormValid}
            size="large"
          >
            {isPending ? <TProgress isLoading={isPending} /> : " Buscar"}
          </Button>
        </Stack>
      </form>
    </LocalizationProvider>
  );
};

export default GitlabHeader
