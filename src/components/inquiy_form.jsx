import Form from "./form";
import InputField from "./inputs";
import Button from "./Button";
import TextArea from "./text_area_field";
import PhoneInputField from "./phone_inputs";
import { showToast } from "../utils/toast";
import {useMutation,} from '@tanstack/react-query'
import { adResponse } from "../APIs";
const AdsInquiryForm = () => {
    const mutation = useMutation({
            mutationFn: async (formData)=> adResponse(formData),
            onSuccess:(data)=>{
                //  console.log('data from login:',data)
                if(data && !data.success){
                    console.log(data)
                    if(data?.error?.details?.fields){
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

         const handleSubmit = (formData)=>{
        mutation.mutate(formData)
    }
  return (
    <section className="ads-inquiry-form">
    <div className="form-header">
        <h1>Jamesy Empire Investor Interest Form</h1>
        <p>Thank you for your interest in Jamesy Empire.</p>
        <p>We work with a select network of discerning investors looking for luxury properties in Abuja and Lagos, 
            including Eko Atlantic and other high-value areas.
            Kindly fill out this short form so we can better understand your investment goals and share the right opportunities with you.
        </p>
    </div>
    <div className="form-holder">
        <Form onSubmit={handleSubmit}>
            <div className="input-wrapper">
            <InputField 
            type="text"
            placeholder={'Name'}
              name="name"
              validationRules={{ required: 'Name is required' }} />
            </div>

            <div className="input-wrapper">
            <InputField type="email"
              placeholder="Email"
              name="email"
              validationRules={{ required: 'Email is required' }} />
            </div>
            <div className="input-wrapper" >
            <InputField type="text"
              placeholder="Desired property location"
              name="location"
              validationRules={{ required: 'Location is required' }} />
            </div>
            <div className="input-wrapper">
            <PhoneInputField
                name="phone"
                placeholder={"+234 xxx xxxx"}
                allowRules={true}
                validationRules={{ required: 'Phone number is required' }}
                country="ng"
            />
            </div>
            <div className="input-wrapper">
            <TextArea
                name="message"
                placeholder="Any other message"
            />
            </div>
            <div className="btn-wrapper">
            <Button type="submit"
            isLoading={isLoading}
            text={'submit'}/>
            </div>
        </Form>
    </div>
    </section>
  );
};

export default AdsInquiryForm;
