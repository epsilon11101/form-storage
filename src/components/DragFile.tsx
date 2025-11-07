import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import Dropzone, { type DropzoneProps, type FileRejection } from 'react-dropzone'

import { type Dispatch, type FC, type MouseEvent, type SetStateAction, useCallback, useTransition } from 'react'

import { ESTADOS_INFO } from '@/theme/colors'


import UploadIcon from './ui/icons/UploadIcon'
import { parseSchemaString, readFileAsText } from '@/utils/utils'
import useReadDocument from '@/stores/useReadDocument'
import { useCreateForm } from '@/api/hooks/useForms'
import useGetIDForm from '@/stores/useFormStore'
import ErrorIcon from '@mui/icons-material/Error';
import { TProgress } from './ui/TProgress'
import useGetFormVersion from '@/stores/useFormVersionsStore'
import { STRINGS } from "@/constants/strings";


interface Props extends Omit<DropzoneProps, 'onDrop' | 'maxSize'> {
  maxSize?: number
  onCloseHandler: () => void,
  hasError: boolean,
  setHasError: Dispatch<SetStateAction<boolean>>
}

const DragFile: FC<Props> = ({ maxSize = 10, hasError, setHasError, onCloseHandler, ...rest }) => {

  const { formParentID, setFormID, setFormParentName } = useGetIDForm()
  const { setCurrentVersionID, setCurrentVersionName } = useGetFormVersion()
  const { setFileSchema, setFileUiSchema, setFormData } = useReadDocument()
  const { mutate: uploadFileMutation } = useCreateForm()
  const [isPending, startTransition] = useTransition()



  const onDropHandler = useCallback(
    async (acceptedFiles: File[]) => {
      const uploadFile = Array.isArray(acceptedFiles)
        ? acceptedFiles[0]
        : acceptedFiles


      if (!uploadFile) return;
      if (!formParentID) return;

      startTransition(async () => {


        try {
          const { name: fileName, fileContent } = await readFileAsText(uploadFile)
          const { schema, uiSchema, formData, hasError } = parseSchemaString(fileContent)

          if (hasError) {
            setHasError(true)
            return;
          }

          uploadFileMutation(
            {
              groupID: formParentID,
              name: fileName,
              data: {
                propertyName: fileContent,
              },
            },
            {
              onSuccess: ({ id, groupName, currentVersion }) => {
                setFormID(id)
                setFormParentName(groupName || STRINGS.ERROR_FETCHING_NAME)
                //NOTE: aqui se resetea para cuando se agrega un nuevo archivo
                setCurrentVersionID(currentVersion)
                setCurrentVersionName(STRINGS.DEFAULT_VERSION_NAME)

              }
            }
          )



          setFileSchema(schema ?? {})
          setFileUiSchema(uiSchema ?? {})
          setFormData(formData ?? {})

          onCloseHandler()

        } catch (error) {
          setHasError(true)
          console.error('Error al procesar el archivo o la petición:', error)
        }
      })


    },
    [formParentID, uploadFileMutation]
  )
  const onDropRejected = (fileRejections: FileRejection[]) => {
    const hasInvalidType = fileRejections.some(
      (fileRejection) => fileRejection.errors[0].code === 'file-invalid-type'
    )

  }

  const onResetHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setHasError(false)
  }


  return (
    <Grid container size="grow" justifyContent="center" alignItems="center" maxHeight={300}>
      <TProgress isLoading={isPending} sx={{
        height: "340px"
      }}
        progressProps={{
          size: "50px",
          sx: {
            color: theme => theme.palette.secondary.main
          }
        }}
      >
        <Dropzone
          onDrop={(acceptedFiles) => {
            onDropHandler(acceptedFiles)
          }}
          onDropRejected={onDropRejected}
          maxSize={maxSize * 1024 * 1024}
          {...rest}
        >
          {({ getRootProps, getInputProps, isDragActive }) => {
            return (
              <Stack
                width="100%"
                alignItems="center"
                justifyContent="center"
                direction="column"
                rowGap={4}
                sx={{
                  padding: 2,
                  border: theme => `dashed 3px ${hasError ? theme.palette.error.main : ESTADOS_INFO}`,
                  bgcolor: (theme) => !hasError ? theme.palette.focus.main : "#e8999970",
                }}
                {...getRootProps()}
              >
                {hasError ? (
                  <>
                    <Box />
                    <ErrorIcon
                      color="error"
                      sx={{ fontSize: 100 }}
                    />
                    <Stack direction="column" rowGap={2} alignItems="center">
                      <Typography variant="h5" sx={{ textTransform: 'none !important' }} color="error">
                        {STRINGS.FILE_READ_ERROR}
                      </Typography>
                      <Typography variant="textTitles" color="error">
                        {STRINGS.FILE_INVALID_FORMAT}{' '}
                        <code>
                          {'{'}
                          "schema": "...",
                          "uiSchema": "..."
                          {'}'}
                        </code>
                      </Typography>
                      <Button variant="contained" color="error" onClick={onResetHandler}>{STRINGS.RETRY}</Button>
                    </Stack>
                  </>
                ) : (
                  <>
                    <Box component="input" {...getInputProps()} />
                    <UploadIcon
                      color="primary"
                      sx={{ fontSize: 100 }}
                    />
                    <Stack direction="column" rowGap={2} alignItems="center">
                      <Typography variant="h5" sx={{ textTransform: 'none !important' }}>
                        {isDragActive ? STRINGS.DROP_PROJECT : STRINGS.DRAG_PROJECT}
                      </Typography>
                      <Typography variant="textTitles">
                        {STRINGS.TXT_FILES_ONLY}
                      </Typography>
                    </Stack>
                  </>
                )}
              </Stack>

            )
          }}
        </Dropzone>
      </TProgress>
    </Grid >
  )
}

export default DragFile
