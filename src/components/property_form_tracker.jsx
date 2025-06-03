import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import Button from "./Button";
import { MdOutlineFileUpload } from "react-icons/md";

const FormChangeTracker = ({action}) => {
  const {formState:{ dirtyFields, isDirty },watch, } = useFormContext();
  const watchedValues = watch();
  const modifiedFieldValues = Object.keys(dirtyFields).reduce((obj,key)=>{
    obj[key] = watchedValues[key];
    return obj;
  },{})
   
  useEffect(() => {
    // console.log("Dirty fields:", dirtyFields);
    // console.log("Is form dirty:", isDirty);
    // console.log("Watched values:", modifiedFieldValues);
  }, [dirtyFields, isDirty, modifiedFieldValues]);

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
      console.log('Form is empty');
      return;
    }
     console.log("Watched values:", modifiedFieldValues);
    //mutation.mutate(modifiedFieldValues)
  }

   const isLoading = false
  //  return null

  return (
 
    <div className="form-tracker">
        <h1>Edit</h1>
        <div className="form-tracker-btn--holder">
            <Button onClick={handleSubmit} 
            disabled={isDirty=== false}
            type='button'  text={'Save'} 
            iconLeft={<MdOutlineFileUpload/>}
            isLoading={isLoading}
          />
        </div>
    </div>
  )
};

export default FormChangeTracker;
