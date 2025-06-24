import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import Button from "./Button";
import { MdOutlineFileUpload } from "react-icons/md";
import {useMutation,} from '@tanstack/react-query'
import { uploadProperty,updateProperty} from '../APIs'
import { showToast } from '../utils/toast'

const FormChangeTracker = ({action, isLoading, id}) => {
   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiMzNkNGZmMzItMDdiNS00OTljLThmYWUtZTczZjY5NGMyMjU0IiwiaWF0IjoxNzUwMTcyNzcyfQ.sRjh_En0j3S5itXgRFeZo4Xui_h7GDRomEYHY8DCeaA';
  const {formState:{ dirtyFields, isDirty },watch, } = useFormContext();
  const watchedValues = watch();
  const modifiedFieldValues = Object.keys(dirtyFields).reduce((obj,key)=>{
    obj[key] = watchedValues[key];
    return obj;
  },{})

   const mutation = useMutation({
    mutationFn: async (formData)=> updateProperty({token,formData,id})
   //: async (formData)=>{
    // console.log(formData)
    // return uploadProperty(token,formData)
   //} 
   ,
  
    onError: (error) =>{
      showToast('Something went wrong','error')
      console.log('mutation property form error:',error)
    },
    onSuccess:(data)=>{
       console.log('mutation success data:', data)
      if(data.success){
        showToast(data.message,'success')
      }else{
        showToast(data.message,'error')
      }
    },
  })
   
  // useEffect(() => {
  //   console.log("Dirty fields:", dirtyFields);
  //   console.log("Is form dirty:", isDirty);
  //   // console.log("Watched values:", modifiedFieldValues);
  // }, [dirtyFields, isDirty, modifiedFieldValues]);

  const formIsEmpty = (obj) =>{
    if(Object.keys(obj).length === 0){
      return true
    }
    return false
  }

  const handleSubmit = ()=>{
    // console.log(dirtyFields)
    const isFormEmpty = formIsEmpty(modifiedFieldValues);
    if(isFormEmpty){
      showToast('No changes made','info')
      console.log('Form is empty');
      return;
    }
     console.log("Watched values:", modifiedFieldValues);
     const formData = new FormData();
     for (let key in modifiedFieldValues) {
        const value = modifiedFieldValues[key];
        if (key === 'images') {
          if (Array.isArray(value)) {
            value.forEach((file) => {
              if (file instanceof File) {
                formData.append('images', file);
              }
            });
          }
        } else if (typeof value === 'object' && value !== null){
          formData.append(key, JSON.stringify(value));
        } else if (value !== undefined && value !== null){
          formData.append(key, value);
        }
      }
      // const formData = new FormData();
      // for (const key in modifiedFieldValues){}
      mutation.mutate(formData)
  }

  //  return null

  return (
 
    <div className="form-tracker">
        <h1>Edit</h1>
        <div className="form-tracker-btn--holder">
            <Button onClick={handleSubmit} 
            disabled={isDirty=== false}
            type='submit'  text={'Save'} 
            iconLeft={<MdOutlineFileUpload/>}
            isLoading={isLoading}
          />
        </div>
    </div>
  )
};

export default FormChangeTracker;
