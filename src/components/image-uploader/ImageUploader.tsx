import React, { useRef, useState } from 'react';
import { Button, Box, Typography, Avatar, Stack } from '@mui/material';
import UploadIcon from '@mui/icons-material/CloudUpload';

interface ImageUploaderProps {
  multiple?: boolean;
  onChange: (files: File[] | File | null) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ multiple = false, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (multiple) {
      const fileArray = Array.from(files);
      setPreviews(fileArray.map(file => URL.createObjectURL(file)));
      onChange(fileArray);
    } else {
      const file = files[0];
      setPreviews([URL.createObjectURL(file)]);
      onChange(file);
    }
  };

  return (
    <Box>
      <input
        ref={inputRef}
        type="file"
        hidden
        accept="image/*"
        multiple={multiple}
        onChange={handleChange}
      />
      <Button
        variant="outlined"
        startIcon={<UploadIcon />}
        onClick={handleClick}
        sx={{
          borderRadius: 2,
          textTransform: 'none',
          fontWeight: 500,
          px: 3,
          py: 1.5,
        }}
      >
        {multiple ? 'Завантажити фото' : 'Завантажити фото'}
      </Button>

      {previews.length > 0 && (
        <Stack direction="row" spacing={2} mt={2} flexWrap="wrap">
          {previews.map((src, index) => (
            <Avatar
              key={index}
              src={src}
              alt={`preview-${index}`}
              sx={{ width: 64, height: 64, borderRadius: 2 }}
              variant="rounded"
            />
          ))}
        </Stack>
      )}

      <Typography variant="caption" display="block" mt={1} color="text.secondary">
        {multiple
          ? 'Ви можете завантажити кілька зображень'
          : 'Оберіть одне зображення'}
      </Typography>
    </Box>
  );
};
