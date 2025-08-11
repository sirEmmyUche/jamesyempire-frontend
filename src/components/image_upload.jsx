import React, { useEffect, useRef, useState } from 'react';
import { useController } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import InputField from './inputs';
import Button from './Button';
import { useMutation } from '@tanstack/react-query';
import { showToast } from '../utils/toast';
import { user } from '../store/user';
import { deleteImageFromPropertyImage } from '../APIs';

const ImageUploadField = ({
  name,
  control,
  rules,
  maxFiles = 10,
  isProfileImage = false,
  mutationFn,
  className = '',
  propertyId = '',
}) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name, control, rules });

  const [loadingImageId, setLoadingImageId] = useState(null);
  const isUser = user((state) => state.user);
  const token = isUser?.token;
  let id = propertyId;

  const blobUrlsRef = useRef(new Set());

  const mutation = useMutation({
    mutationFn: async (formData) =>
       mutationFn({ id, formData, token }),
    onError: (error) => {
      showToast('Something went wrong', 'error');
      console.log('mutation property form error:', error);
    },
    onSuccess: (data) => {
      console.log('mutation success data:', data);
      if (data.success) {
        showToast(data.message, 'success');
      } else {
        showToast(data.error?.message, 'error');
      }
    },
  });

  const isLoading = mutation.isPending;

  const onDrop = (acceptedFiles, rejectedFiles) => {
    // console.log('this is the accepted files:', rejectedFiles)

    if(rejectedFiles.length>1){
      showToast(`Only ${maxFiles} ${maxFiles>1?'images':'image'} ${maxFiles>1?'are':'is'} allowed.`, 'error');
      return
    }

    if(isProfileImage && acceptedFiles.length > 1) {
      showToast('Only one profile image is allowed', 'error');
      return;
    }

    if (isProfileImage && value?.length > 0) {
      removeImage(0);
    }

    const filesWithPreview = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        isServerImage: false,
        id: `local-${Date.now()}-${Math.random()}`,
      })
    );

    filesWithPreview.forEach((file) => blobUrlsRef.current.add(file.preview));

    const newValue = isProfileImage
      ? filesWithPreview
      : [...(value || []), ...filesWithPreview];

    onChange(newValue);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    multiple: !isProfileImage && maxFiles > 1,
    maxFiles: isProfileImage ? 1 : maxFiles,
  });

  useEffect(() => {
    return () => {
      blobUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      blobUrlsRef.current.clear();
    };
  }, []);

  const removeImage = async (index) => {
    const file = value[index];
    // console.log(file)

    if (file.isServerImage) {
      setLoadingImageId(file.id);
      try {
        const imageId = file.public_id;
        const formData = imageId;
        // console.log(formData)
        const result = await mutation.mutateAsync(formData);

        if (result.success) {
          const updated = [...value];
          updated.splice(index, 1);
          onChange(updated);
          showToast(result?.message, 'success');
        } else {
          showToast(result?.error?.message, 'error');
        }
      } catch (error) {
        showToast('Something went wrong', 'error');
      } finally {
        setLoadingImageId(null);
      }
    } else {
      URL.revokeObjectURL(file.preview);
      blobUrlsRef.current.delete(file.preview);
      const updated = [...value];
      updated.splice(index, 1);
      onChange(updated);
    }
  };

  return (
    <div className="image-upload-field">
      <div
        {...getRootProps({
          className: `dropzone-drag-n-drop-area ${className}`,
        })}
      >
        <InputField name={name} {...getInputProps()} />
        <p className='drag-drop-info'>Drag & drop images, or click to select.</p>
        <p className='max-file-info'>{`Maximum of ${maxFiles} file(s) needed.`}</p>
      </div>

      {value?.length > 0 && (
        <div className="file-preview">
          {value.map((file, i) => (
            <div key={file.id || i} className="file-img-wrapper">
              <img
                src={file.preview}
                alt="preview"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/100?text=Error';
                }}/>
                {!isProfileImage && (
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
                )}
            </div>
          ))}
        </div>
      )}
      {/* {error && <p className="form-error-msg">{error.message}</p>} */}
    </div>
  );
};

export default ImageUploadField;





// import React, { useEffect, useRef, useState} from 'react';
// import { useController } from 'react-hook-form';
// import { useDropzone } from 'react-dropzone';
// import InputField from './inputs';
// import Button from './Button';
// import {useMutation,} from '@tanstack/react-query'
// import { showToast } from '../utils/toast'
// import {user} from '../store/user'
// import { deleteImageFromPropertyImage } from '../APIs';

// const ImageUploadField = ({ name, control, rules, maxFiles=10, 
//   // token = '',
//   className='', propertyId=''}) => {
//   const {
//     field: { onChange, value },
//     fieldState: { error },
//   } = useController({ name, control, rules });

//     const [loadingImageId, setLoadingImageId] = useState(null);
//   const isUser = user((state)=>state.user)
//   const token = isUser?.token;
//   let id = propertyId


//   // console.log('token',token)

//   // Store blob URLs for cleanup
//   const blobUrlsRef = useRef(new Set());

//  const mutation = useMutation({
//     mutationFn: async (formData)=> deleteImageFromPropertyImage({id,formData,token}),
  
//     onError: (error) =>{
//       showToast('Something went wrong','error')
//       console.log('mutation property form error:',error)
//     },
//     onSuccess:(data)=>{
//        console.log('mutation success data:', data)
//       if(data.success){
//         showToast(data.message,'success')
//       }else{
//         showToast(data.error?.message,'error')
//       }
//     },
//   })

//   const isLoading = mutation.isPending; 
//   // const isLoading={file.id === loadingImageId}

//   const onDrop = (acceptedFiles) => {
//     const filesWithPreview = acceptedFiles.map((file) =>
//       Object.assign(file, {
//         preview: URL.createObjectURL(file),
//         isServerImage: false,
//         id: `local-${Date.now()}-${Math.random()}`,
//       })
//     );
//     filesWithPreview.forEach((file) => blobUrlsRef.current.add(file.preview));
//     const newValue = [...(value || []), ...filesWithPreview];
//     onChange(newValue);
//   };

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: {
//       'image/*': [],
//     },
//     multiple: true,
//     maxFiles:maxFiles
//   });

//   // Clean up all blob URLs on component unmount
//   useEffect(() => {
//     return () => {
//       blobUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
//       blobUrlsRef.current.clear();
//     };
//   }, []); // Correctly uses an empty dependency array to run only on unmount


//   const removeImage = async (index) => {
//   const file = value[index];
//   if (file.isServerImage) {
//     setLoadingImageId(file.id); // mark this image as loading

//     try {
//       const imgUrl = file.preview;
//       const formData = imgUrl // use proper object
//       const result = await mutation.mutateAsync(formData);

//       if (result.success) {
//         const updated = [...value];
//         updated.splice(index, 1);
//         onChange(updated);
//         showToast(result.message, 'success');
//       } else {
//         showToast(result.error.message, 'error');
//       }
//     } catch (error) {
//       showToast('Something went wrong', 'error');
//     } finally {
//       setLoadingImageId(null); // reset loading state
//     }
//   } else {
//     // Remove immediately for local image
//     URL.revokeObjectURL(file.preview);
//     blobUrlsRef.current.delete(file.preview);
//     const updated = [...value];
//     updated.splice(index, 1);
//     onChange(updated);
//   }
// };


//   return (
//     <div className="image-upload-field">
//       <div
//         {...getRootProps({
//           className:`dropzone-drag-n-drop-area ${className}`,
//         })}
        
//       >
//         {/* You can pass the name directly to InputField if it uses it */}
//         <InputField name={name} {...getInputProps()} />
//         <p>Drag & drop images, or click to select</p>
//       </div>

//       {value?.length > 0 && (
//         <div className='file-preview'>
//           {value.map((file, i) => (
//             <div key={file.id || i} className='file-img-wrapper'>
//               <img
//                 src={file.preview}
//                 alt="preview"
//                 onError={(e) => {
//                   e.target.src = 'https://via.placeholder.com/100?text=Error';
//                 }}
//               />
//               <div className='remove-img-btn-wrapper'>
//                 <Button  
//                 type='button'
//                 text={'x'}
//                 onClick={() => removeImage(i)}
//                 className='dropzone-remove-img-btn'
//                 // isLoading={isLoading}
//                 isLoading={file.id === loadingImageId}
//                   />
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//       {/* {error && <p className="form-error-msg">{error.message}</p>} */}
//     </div>
//   );
// };

// export default ImageUploadField;
