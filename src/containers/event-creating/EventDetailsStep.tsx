import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Stack,
  FormHelperText 
} from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Editor } from '@tinymce/tinymce-react';
import { Controller, useFormContext } from 'react-hook-form'; 
import { EventFormSchema } from '~/schemas/event-schema'; 
import { getFromLocalStorage } from '~/services/local-storage-service'; 
import { uk, enUS } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import { envConfig } from '~/constants/envConfig';
export const EventDetailsStep: React.FC = () => {
  const { control, formState: { errors } } = useFormContext<EventFormSchema>();

  const { t } = useTranslation();

  return (
    <Stack spacing={3}>
      <Controller
        name='volunteerSlots'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            error={!!errors.volunteerSlots}
            fullWidth
            helperText={errors.volunteerSlots?.message?.toString()}
            label={t('event.eventCreating.fields.volunteerSlots')}
            required
            type='number'
            inputProps={{ min: 1 }}
          />
        )}
      />

      <Controller
        name='registrationDeadline'
        control={control}
        render={({ field }) => (
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={getFromLocalStorage('language') === 'uk' ? uk : enUS}
          >
            <DateTimePicker
              label={t('event.eventCreating.fields.registrationDeadline')}
              onChange={field.onChange}
              value={field.value || null}
              slotProps={{
                textField: {
                  fullWidth: true,
                  required: true,
                  error: !!errors.registrationDeadline,
                  helperText: errors.registrationDeadline?.message?.toString(),
                  onBlur: field.onBlur
                }
              }}
              inputRef={field.ref}
            />
          </LocalizationProvider>
        )}
      />

      <Box>
        <Typography gutterBottom variant='subtitle1'>
          {t('event.eventCreating.fields.description')} *
        </Typography>
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <>
              <Editor
                apiKey={envConfig.APP_TINY_MCE_API_KEY}
                init={{
                  language: getFromLocalStorage('language') || 'uk',
                  height: 400,
                  menubar: true,
                  plugins: [
                    'advlist',
                    'autolink',
                    'lists',
                    'link',
                    'image',
                    'charmap',
                    'preview',
                    'anchor',
                    'searchreplace',
                    'visualblocks',
                    'code',
                    'fullscreen',
                    'insertdatetime',
                    'media',
                    'table',
                    'help',
                    'wordcount',
                    'emoticons',
                    'hr',
                    'pagebreak',
                    'save',
                    'autosave',
                    'codesample',
                    'toc',
                    'visualchars',
                    'nonbreaking',
                    'paste',
                    'fontsize',
                    'fontfamily'
                  ],
                  toolbar:
                    'undo redo | blocks | ' +
                    'fontsize fontfamily | ' +
                    'bold italic underline strikethrough | forecolor backcolor | ' +
                    'alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | ' +
                    'link image media codesample | table emoticons hr pagebreak | ' +
                    'removeformat | fullscreen preview help',
                  content_style:
                    'body { font-family:Roboto,Arial,sans-serif; font-size:14px }',
                  image_advtab: true,
                  fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
                  fontfamily_formats:
                    'Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats',
                  file_picker_callback: (
                    callback: (url: string, meta: { alt?: string }) => void,
                    value: string,
                    meta: { filetype: string }
                  ) => {
                    if (meta.filetype === 'image') {
                      const input = document.createElement('input')
                      input.setAttribute('type', 'file')
                      input.setAttribute('accept', 'image/*')
                      input.onchange = function () {
                        const file = (this as HTMLInputElement).files?.[0]
                        if (file) {
                          const reader = new FileReader()
                          reader.onload = function () {
                            callback(reader.result as string, {
                              alt: file.name
                            })
                          }
                          reader.readAsDataURL(file)
                        }
                      }
                      input.click()
                    }
                  }
                }}
                onEditorChange={(content) => field.onChange(content)}
                value={field.value || ''}
                onBlur={field.onBlur}
              />
              {errors.description && (
                <FormHelperText error sx={{ ml: '14px', mt: '3px' }}>
                  {errors.description.message?.toString()}
                </FormHelperText>
              )}
            </>
          )}
        />
      </Box>
    </Stack>
  )
};