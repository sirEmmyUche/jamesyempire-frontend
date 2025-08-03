import ImageUploadField from "./image_upload"
import Button from "./Button"
import PhoneInputField from "./phone_inputs"
import Form from "./form"
import InputField from "./inputs"

const MyProfile = ()=>{

    const handleOnSubmit = (data) => {
    console.log("Form data:", data);
  };

    return (
            <div className="my-profile-pg">
                <Form onSubmit={handleOnSubmit} defaultValues={{ phone: "" }}>
                <div >
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
                <div className="name-input-main-holder">
                    <h4>Name</h4>
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
                <div className="email-input-main-holder">
                    <h4>Email</h4>
                    <div className="child-email-input-holder">
                        <InputField
                        type="email"
                        // label="Email"
                        name="email"
                        />
                    </div>
                </div>
                <div className="image-input-main-holder">
                    <div>
                        <h4>Your photo</h4>
                        <p>This photo will be displayed on your profile.</p>
                    </div>
                    <div className="drop-zone-holder">
                    <ImageUploadField
                    name="profile_pics"
                    maxFiles={1}
                    />
                    </div>
                </div>
                <div>
                    <PhoneInputField
                    name="phone"
                    label="Phone Number"
                    placeholder={"+234 xxx xxxx"}
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
            </Form>
        </div>
        )
    }

export default MyProfile