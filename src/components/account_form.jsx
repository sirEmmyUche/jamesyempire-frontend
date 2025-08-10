import {useMutation,} from '@tanstack/react-query'
import InputField from './inputs'
import Button from './Button'
import Form from './form'
import { logIn, signUp } from '../APIs'
import { showToast } from '../utils/toast'
import { user } from '../store/user'
import { useNavigate } from 'react-router-dom'
import 'react-phone-input-2/lib/style.css'

const AccountForm = ({mode='signup'})=>{
    const updateUser = user((state) => state.updateUser);
    const navigate = useNavigate();
    // const from = location.state?.from  || '/' 
    const mutation = useMutation({
        mutationFn: mode == 'login'? async (formData)=>logIn(formData) : async (formData)=>signUp(formData),
        onSuccess:(data)=>{
            //  console.log('data from login:',data)
            if(data && !data.success){
                if(data.error.details.fields){
                    let errorMessage = data?.error?.details?.fields?.map((field)=>field.message)
                    errorMessage.forEach((message)=>showToast(message,'error'))
                }else{
                    showToast(data?.error?.message,'error')
                }
            }else if(data && data.success){
                if(mode === 'login'){
                     updateUser(data.user);
                     showToast(data.message, 'success')
                }else{
                      showToast(data.message, 'success')
                    navigate('/login', { replace: true });
                }
            }
        },
        onError: (error)=>{
            console.error(error)
            showToast('Something went wrong.','error')
        }
    })
    const isLoading = mutation.isPending

    const handleSubmit = (formData)=>{
        mutation.mutate(formData)
    }

    return(
        <Form onSubmit={handleSubmit}>
            {
                mode == 'signup' && (
                    <div>
                        <div className='input-field-wraper'>
                            <InputField  type='text' name={'firstname'} 
                            label={'First name'} placeholder={'Jon'}
                            validationRules={{required:'required'}}
                            />
                        </div>
                         <div className='input-field-wraper'>
                            <InputField  type='text' name={'lastname'} label={'Last name'} 
                            validationRules={{required:'required'}}
                            placeholder={'Doe'}/>
                        </div>
                    </div>
                )
            }
            <div className='input-field-wraper'>
                <InputField type='email' name={'email'} label={'Email'}
                validationRules={{required:'required'}}
                 placeholder={'example@mymail.com'}/>
            </div>
            <div className='input-field-wraper'>
                <InputField type='password' name={'password'} 
                validationRules={{required:'required'}}
                label={'Password'}/>
            </div>
            <div className='btn-holder'>
                <Button type='submit' isLoading={isLoading} text={mode ==='login'?'login':'sign up'}/>
            </div>
        </Form>
    )
}

export default AccountForm 