import ImageUploadField from "./image_upload"
import Button from "./Button"
import PhoneInputField from "./phone_inputs"
import Form from "./form"

const MyProfile = ()=>{

    const handleOnSubmit = (data) => {
    console.log("Form data:", data);
  };
    return (
            <Form onSubmit={handleOnSubmit} defaultValues={{ phone: "" }}>
                <div>
                    <div>
                        <h1>Personal info</h1>
                        <h4>Updates your personal info here.</h4>
                    </div>
                    <div>
                        <div>
                            <Button type="button"
                            text={'Cancel'}/>
                        </div>
                        <div>
                            <Button type="submit"
                            text={'Save changes'}/>
                        </div>
                    </div>
                </div>
                <div>
                    <PhoneInputField
                    name="phone"
                    label="Phone Number"
                    placeholder="+234 xxx xxxx"
                    allowRules = {false}
                    // validationRules={{ required: "Phone number is required" }}
                     validationRules={{
                        required: "Phone number is required",
                        pattern: {
                        value: /^\+\d{1,15}$/,
                        message: "Phone number must start with + and digits",
                        },
                    }}
                    country="ng"/>
                </div>
                <ImageUploadField
                        name="profile_pics"
                        maxFiles={1}
                        // isEditMode={true}
                        // control={control}
                        // rules={{ required: 'At least one image is required' }}
                        // initialImages={[
                        //     'https://example.com/images/image1.jpg',
                        //     'https://example.com/images/image2.jpg',
                        // ]}
                    />
            </Form>
        )
    }

export default MyProfile