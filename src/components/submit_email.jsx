import Button from "./Button"
import InputField from "./inputs"
import Form from "./form"


const SubmitEmail = ()=>{
   
    const handleOnSubmit = (data) => {
        console.log("Submitted data:", data);
        // pass the form data into the mutation method here
      };

    return(<div className="submit-email-container">
        <h1>Are you a landlord?</h1>
        <h3>Discover ways to increase your home's value and get listed.</h3>
        <div className="form-holder">
            <Form onSubmit={handleOnSubmit}>
                <div className="input-holder">
                    <InputField 
                    type={'email'} 
                    placeholder={'example@mail.com'} 
                    name={'email'}
                    // label="Email" //add label for good seo
                    validationRules={{
                    required: "email is required",
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "enter a valid email address",
                        },
                    }}/>
                    <div className="btn-holder">
                        <Button type="submit" text={'submit'}/>
                    </div>
                </div>
                {/* <div className="btn-holder">
                    <Button type="submit" text={'submit'}/>
                </div> */}
            </Form>
        </div>
        <p>Join over <span>5,000+ </span>landlords in our community</p>
    </div>)
}

export default SubmitEmail