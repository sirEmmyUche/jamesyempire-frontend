import { useState, useMemo } from "react"
import ImageUploadField from "./image_upload"
import Button from "./Button"
import PhoneInputField from "./phone_inputs"
import Form from "./form"
import InputField from "./inputs"
import {user} from '../store/user'
import { MdOutlineFileUpload } from "react-icons/md";
import { useFormContext, useForm } from "react-hook-form"
import { updateAccount } from "../APIs"
import {useMutation,} from '@tanstack/react-query'
import { showToast } from "../utils/toast"

const MyProfile = ()=>{
     const isUser = user((state)=>state.user);
     const profilePic= isUser?.profile_pic?.secure_url;
       const updateUser = user((state) => state.updateUser);
        const token = isUser.token || '';
   

     let profilePicPlaceholder = "/images/user-profile-pic-placeholder.png"

    const initialImages = useMemo(() => {
        //  let imgSrc;
        if(!profilePic) return [profilePicPlaceholder];
        if(profilePic == '') return [profilePicPlaceholder]
        return Array.isArray(profilePic) ? profilePic : [profilePic];
    }, 
    [profilePic]);

    const defaultValues = useMemo(()=>{
         const defaultValue = {
        firstname : isUser.firstname || '',
        lastname : isUser.lastname || '',
        email : isUser.email || '',
        phone: isUser.phone || '',
        profile_pics: initialImages.map((url, index) => ({
              preview: url,
              isServerImage: false,
              id: `local-${Date.now()}-${Math.random()}`,
            })),
        
        // isUser?.profile_pics || '',
    }
    return defaultValue
    },[isUser])

    const mutation = useMutation({
    mutationFn: (formData)=> updateAccount(token,formData),
  
    onError: (error) =>{
      showToast('Something went wrong','error')
      console.log('mutation update account error:',error)
    },
    onSuccess:(data)=>{
       console.log('mutation success data:', data)
      if(data && data.success){
          updateUser(data.user);
        showToast(data.message,'success')
      }else{
        showToast(data.error?.message,'error')
      }
    },
  })
  const isLoading = mutation.isPending;

   const handleOnSubmit = (data) => {
    console.log('my profile-data:',data)
      const formData = new FormData();
      for (let key in data) {
        const value = data[key];
        if (key === 'profile_pics') {
          if (Array.isArray(value)) {
            value.forEach((file) => {
              if (file instanceof File) {
                formData.append('profile_pics', file);
              }
            });
          }
        } 
        else if (value !== undefined && value !== null){
          formData.append(key, value);
        }
      }
      mutation.mutate(formData)
  };

    return (
            <div className="my-profile-pg">
                <Form onSubmit={handleOnSubmit} 
                autoResetOnDefaultChange={true}
                   defaultValues={async()=> defaultValues}
                >
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
                            iconLeft={<MdOutlineFileUpload color="#ffffff" size={20}/>}
                            isLoading={isLoading}
                            text={'Save'}/>
                        </div>
                    </div>
                </div>
                <div className="name-input-main-holder">
                    <div className="box --ishide">
                        <h4>Name</h4>
                    </div>
                    <div className="child-name-input-holder">
                        <div className="box">
                            <InputField
                            type="text"
                            label="First name"
                            name="firstname"
                            />
                        </div>
                        <div className="box">
                            <InputField
                            type="text"
                            label="Last name"
                            name="lastname"
                            />
                        </div>
                    </div>
                </div>
                <div className="main-phone-input-holder">
                    <div className="box">
                        <h4>Phone</h4>
                    </div>
                    <div className="child-phone-input-holder">
                    <PhoneInputField
                        name="phone"
                        // label="Phone"
                        placeholder={"+234 xxx xxxx"}
                        allowRules = {false}
                        // validationRules={{
                        //     required: "Phone number is required",
                        //     pattern: {
                        //     value: /^\+\d{1,15}$/,
                        //     message: "Phone number must start with + and digits",
                        //     },
                        // }}
                        country="ng"/>
                    </div>
                </div>
                <div className="email-input-main-holder">
                    <div className="box">
                        <h4>Email</h4>
                    </div>
                    <div className="child-email-input-holder">
                        <InputField
                        type="email"
                        // label="Email"
                        name="email"
                        />
                    </div>
                </div>
                <div className="image-input-main-holder">
                    <div className="box">
                        <h4>Profile Pics</h4>
                        {/* <p>This photo will be displayed on your profile.</p> */}
                    </div>
                    <div className="drop-zone-holder">
                        <ImageUploadField
                        name="profile_pics"
                        maxFiles={1}
                        isProfileImage={true}
                        />
                    </div>
                </div>
            </Form>
        </div>
        )
    }

export default MyProfile