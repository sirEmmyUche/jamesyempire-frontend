// components/ImageUploadField.jsx
import React, { useEffect } from 'react';
import { useController } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import InputField from './inputs';

const ImageUploadField = ({ name, control, rules }) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name, control, rules });

  const onDrop = (acceptedFiles) => {
    const filesWithPreview = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    onChange([...(value || []), ...filesWithPreview]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    multiple: true,
  });

  // Clean up previews
  useEffect(() => {
    return () => {
      value?.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [value]);

  const removeImage = (index) => {
    const updated = [...value];
    updated.splice(index, 1);
    onChange(updated);
  };

  return (
    <div className="image-upload-field">
      <div
        {...getRootProps()}
        style={{
          border: '2px dashed #ccc',
          padding: '20px',
          cursor: 'pointer',
          textAlign: 'center',
        }}
      >
        {/* <input {...getInputProps()} /> */}
        <InputField name={'images'} {...getInputProps()} />
        <p>Drag & drop images, or click to select</p>
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 10,
        justifyContent:'center', alignItems:'center' }}>
        {value?.map((file, i) => (
          <div key={i} style={{ position: 'relative' }}>
            <img
              src={file.preview}
              alt="preview"
              width={100}
              height={100}
              style={{ objectFit: 'cover', borderRadius: 5 }}
            />
            <button
              onClick={() => removeImage(i)}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                background: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: 20,
                height: 20,
                cursor: 'pointer',
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      {/* {error && <p className="form-error-msg">{error.message}</p>} */}
    </div>
  );
};

export default ImageUploadField;