import Button from "./Button"
import Form from "./form"
import InputField from "./inputs"
import { MdOutlineFileUpload } from "react-icons/md";
import {useMutation,} from '@tanstack/react-query'
import { showToast } from "../utils/toast";
import { changePassword } from "../APIs";
import { user } from "../store/user";

const ChangePassword = ()=>{
     const isUser = user((state)=>state.user);
    const token = isUser.token || '';
    // const updateUser = user((state) => state.updateUser);

    const mutation = useMutation({
            mutationFn: async (formData)=>changePassword(token,formData),
            onSuccess:(data)=>{
                //  console.log('data from login:',data)
                if(data && !data.success){
                    if(data.error?.details?.fields){
                        let errorMessage = data?.error?.details?.fields?.map((field)=>field.message)
                        errorMessage.forEach((message)=>showToast(message,'error'))
                    }else{
                        showToast(data?.error?.message,'error')
                    }
                }else if(data && data.success){
                         showToast(data.message, 'success')
                }
            },
            onError: (error)=>{
                console.error(error)
                showToast('Something went wrong.','error')
            }
        })
        const isLoading = mutation.isPending

     const handleOnSubmit = (formData) => {
    console.log("Form data:", formData);
    mutation.mutate(formData)
  };

    return(
        <div className="change-password">
            <Form onSubmit={handleOnSubmit} >
                <div className="change-pword-upload-btn">
                     <h1>Change Password</h1>
                     <div className="btn-wrapper">
                        <Button type="submit"
                        text={'submit'}
                        isLoading={isLoading}
                        iconRight={<MdOutlineFileUpload size={20} color="#ffffff"/>}/>
                    </div>
                </div>  
                <div className="input-wrapper">
                    <InputField
                    type="password"
                    name={'currentPassword'}
                    label={'Current password'}
                    validationRules={{
                        required:'required'
                    }}/>
                </div>
                <div className="input-wrapper">
                    <InputField
                    type="password"
                    name={'newPassword'}
                    label={'New password'}
                    validationRules={{
                        required:'required',
                        pattern: {
                            value: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*\-_+.?])(?=.{8,})/,
                            message: 'Password must be at least 8 characters long with lowercase, uppercase, number, and special character.',
                            },
                    }}
                    />
                </div>
                <div className="input-wrapper">
                    <InputField
                      type="password"
                    name={'confirmNewPassword'}
                    label={'Confirm new password'}
                    validationRules={{
                        required:'required'
                    }}/>
                </div>
            </Form>
        </div>
    )
}
export default ChangePassword