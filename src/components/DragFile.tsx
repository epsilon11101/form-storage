import { Box, Grid, Stack, Typography, type DialogProps } from '@mui/material'
import Dropzone, { type DropzoneProps, type FileRejection } from 'react-dropzone'

import { type FC, useCallback, useTransition } from 'react'

import { ESTADOS_INFO } from '@/theme/colors'




import TLoading from './ui/TLoading'
import UploadIcon from './ui/icons/UploadIcon'
import { parseSchemaString, readFileAsText } from '@/utils/utils'
import useReadDocument from '@/stores/useReadDocument'

interface Props extends Omit<DropzoneProps, 'onDrop' | 'maxSize'> {
  maxSize?: number
  onCloseDialog?: DialogProps["onClose"]
}

const DragFile: FC<Props> = ({ maxSize = 10, onCloseDialog, ...rest }) => {

  const { setFileSchema, setFileUiSchema, setFormData } = useReadDocument()

  const [isPending, startTransition] = useTransition()

  const onDropHandler = useCallback(
    async (acceptedFiles: File[]) => {
      const uploadFile = Array.isArray(acceptedFiles)
        ? acceptedFiles[0]
        : acceptedFiles


      if (!uploadFile) return;

      startTransition(async () => {
        try {
          const fileContent = await readFileAsText(uploadFile)
          const { schema, uiSchema } = parseSchemaString(fileContent)
          setFileSchema(schema ?? {})
          setFileUiSchema(uiSchema ?? {})
          setFormData({})
          onCloseDialog && onCloseDialog({}, "escapeKeyDown")
        } catch (error) {
          console.error('Error al procesar el archivo o la petición:', error)
        }
      })


    },
    []
  )
  const onDropRejected = (fileRejections: FileRejection[]) => {
    const hasInvalidType = fileRejections.some(
      (fileRejection) => fileRejection.errors[0].code === 'file-invalid-type'
    )

    console.log(hasInvalidType);

  }


  return (
    <Grid container size="grow" justifyContent="center" alignItems="center" maxHeight={300}>
      {!isPending ? (
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
                  border: `dashed 3px ${ESTADOS_INFO}`,
                  bgcolor: (theme) => theme.palette.focus.main,
                }}
                {...getRootProps()}
              >
                <Box component="input" {...getInputProps()} />
                <UploadIcon
                  color="primary"
                  sx={{
                    fontSize: 100,
                  }}
                />
                <Stack direction="column" rowGap={2} alignItems="center">
                  <Typography
                    variant="h5"
                    sx={{
                      textTransform: 'none !important',
                    }}
                  >
                    {isDragActive ? 'Soltar proyecto' : 'Arrastrar proyecto'}
                  </Typography>
                  <Typography
                    variant="textTitles"                  >
                    Solo se admiten archivos JSON
                  </Typography>
                </Stack>
              </Stack>
            )
          }}
        </Dropzone>
      ) : (
        <TLoading width="100%" height="30vh" />
      )}
    </Grid>
  )
}

export default DragFile
