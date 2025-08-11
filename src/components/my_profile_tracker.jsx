import Button from "./Button"
import { MdOutlineFileUpload } from "react-icons/md";
import { useFormContext } from "react-hook-form";
import { updateAccount } from "../APIs"
import {useMutation,} from '@tanstack/react-query'
import { showToast } from "../utils/toast"
import {user} from '../store/user'

const MyProfileFormTracker = ()=>{
     const isUser = user((state)=>state.user);
     const profilePic= isUser?.profile_pic?.secure_url;
     const public_id = isUser?.profile_img
       const updateUser = user((state) => state.updateUser);
        const token = isUser.token || '';
    const {formState:{ dirtyFields, isDirty },watch, } = useFormContext();
  const watchedValues = watch();
  const modifiedFieldValues = Object.keys(dirtyFields).reduce((obj,key)=>{
    obj[key] = watchedValues[key];
    return obj;
  },{})
 const mutation = useMutation({
    mutationFn: (formData)=> updateAccount(token,formData),
  
    onError: (error) =>{
      showToast('Something went wrong','error')
      console.log('mutation update account error:',error)
    },
    onSuccess:(data)=>{
       console.log('mutation success data:', data)
      if(data && data.success){
          updateUser(data?.user);
        showToast(data.message,'success')
      }else{
        showToast(data.error?.message,'error')
      }
    },
  })

  const isLoading = mutation.isPending
   
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
      // showToast('No changes made','info')
      // console.log('Form is empty');
      return;
    }
    //  console.log("Watched values:", modifiedFieldValues);
     const formData = new FormData();
     for (let key in modifiedFieldValues) {
        const value = modifiedFieldValues[key];
        if (key === 'image') {
          if (Array.isArray(value)) {
            value.forEach((file) => {
              if (file instanceof File) {
                formData.append('image', file);
              }
            });
          }
        }  
        
        // else if (typeof value === 'object' && value !== null){
        //   formData.append(key, JSON.stringify(value));
        // }else{
        //   console.warn('property_features is not an object:', value)
        // }


        if (value !== undefined && value !== null){
          formData.append(key, value);
        }
      }
      // const formData = new FormData();
      // for (const key in modifiedFieldValues){}
      mutation.mutate(formData)
  }

    return(
        <div className="info-save-btn">
            <div className="personal-info">
                <h1>Details</h1>
                <h4>Updates your personal info here.</h4>
            </div>
            <div className="btn-wrapper">
                {/* <div>
                    <Button type="button"
                    text={'Cancel'}/>
                </div> */}
                <div className="submit-btn-wrapper">
                    <Button type="submit"
                    onClick={handleSubmit}
                      disabled={isDirty=== false}
                    iconLeft={<MdOutlineFileUpload color="#ffffff" size={20}/>}
                    isLoading={isLoading}
                    text={'Save'}/>
                </div>
            </div>
        </div>
    )
}

export default MyProfileFormTracker