import React, { useEffect, useRef, useState} from 'react';
import { useController } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import InputField from './inputs';
import Button from './Button';
import {useMutation,} from '@tanstack/react-query'
import { showToast } from '../utils/toast'
import {user} from '../store/user'
import { deleteImageFromPropertyImage } from '../APIs';

const ImageUploadField = ({ name, control, rules, maxFiles=10, 
  // token = '',
  className='', propertyId=''}) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name, control, rules });

    const [loadingImageId, setLoadingImageId] = useState(null);
  const isUser = user((state)=>state.user)
  const token = isUser?.token;
  let id = propertyId


  // console.log('token',token)

  // Store blob URLs for cleanup
  const blobUrlsRef = useRef(new Set());

 const mutation = useMutation({
    mutationFn: async (formData)=> deleteImageFromPropertyImage({id,formData,token}),
  
    onError: (error) =>{
      showToast('Something went wrong','error')
      console.log('mutation property form error:',error)
    },
    onSuccess:(data)=>{
       console.log('mutation success data:', data)
      if(data.success){
        showToast(data.message,'success')
      }else{
        showToast(data.error?.message,'error')
      }
    },
  })

  const isLoading = mutation.isPending; 
  // const isLoading={file.id === loadingImageId}

  const onDrop = (acceptedFiles) => {
    const filesWithPreview = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        isServerImage: false,
        id: `local-${Date.now()}-${Math.random()}`,
      })
    );
    filesWithPreview.forEach((file) => blobUrlsRef.current.add(file.preview));
    const newValue = [...(value || []), ...filesWithPreview];
    onChange(newValue);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    multiple: true,
    // maxFiles:maxFiles
  });

  // Clean up all blob URLs on component unmount
  useEffect(() => {
    return () => {
      blobUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      blobUrlsRef.current.clear();
    };
  }, []); // Correctly uses an empty dependency array to run only on unmount


  const removeImage = async (index) => {
  const file = value[index];
  if (file.isServerImage) {
    setLoadingImageId(file.id); // mark this image as loading

    try {
      const imgUrl = file.preview;
      const formData = imgUrl // use proper object
      const result = await mutation.mutateAsync(formData);

      if (result.success) {
        const updated = [...value];
        updated.splice(index, 1);
        onChange(updated);
        showToast(result.message, 'success');
      } else {
        showToast(result.error.message, 'error');
      }
    } catch (error) {
      showToast('Something went wrong', 'error');
    } finally {
      setLoadingImageId(null); // reset loading state
    }
  } else {
    // Remove immediately for local image
    URL.revokeObjectURL(file.preview);
    blobUrlsRef.current.delete(file.preview);
    const updated = [...value];
    updated.splice(index, 1);
    onChange(updated);
  }
};


  // const removeImage = async (index) => {
  //   const file = value[index];
  //   if (file.isServerImage) {
  //     try {
  //       // console.log('file to delete',file)
  //       const imgUrl = file.preview;
  //       // console.log(imgUrl)
  //       const formData = imgUrl;
  //       mutation.mutate(formData)
        
  //     } catch (error) {
  //       console.error('Error deleting image:', error);
  //       return;
  //     }
  //   } else {
  //     URL.revokeObjectURL(file.preview);
  //     blobUrlsRef.current.delete(file.preview);
  //   }

  //   // const updated = [...value];
  //   // updated.splice(index, 1);
  //   // onChange(updated);
  // };

  return (
    <div className="image-upload-field">
      <div
        {...getRootProps({
          className:`dropzone-drag-n-drop-area ${className}`,
        })}
        
      >
        {/* You can pass the name directly to InputField if it uses it */}
        <InputField name={name} {...getInputProps()} />
        <p>Drag & drop images, or click to select</p>
      </div>

      {value?.length > 0 && (
        <div className='file-preview'>
          {value.map((file, i) => (
            <div key={file.id || i} className='file-img-wrapper'>
              <img
                src={file.preview}
                alt="preview"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/100?text=Error';
                }}
              />
              <div className='remove-img-btn-wrapper'>
                <Button  
                type='button'
                text={'x'}
                onClick={() => removeImage(i)}
                className='dropzone-remove-img-btn'
                // isLoading={isLoading}
                isLoading={file.id === loadingImageId}
                  />
              </div>
            </div>
          ))}
        </div>
      )}
      {error && <p className="form-error-msg">{error.message}</p>}
    </div>
  );
};

export default ImageUploadField;
