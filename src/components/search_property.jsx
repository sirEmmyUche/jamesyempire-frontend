import { useState } from "react";
import Form from "./form"
import InputField from "./inputs"
import SelectField from "./selectField"
import Button from "./Button"
import { IoSearchSharp } from "react-icons/io5";
import { useIsFetching } from "@tanstack/react-query";

const Search = ({onSubmit,})=>{
    const [available_for, setAvailable_for] = useState('')
    const isLoading = useIsFetching({
        queryKey: ['properties',],
    }) > 0;

    const handleAvailable_for = (args)=> {
        setAvailable_for(args)
    }

    const handleOnSubmit = (data) => {
        // console.log("Submitted data:", data);
        let formData = {...data, available_for}
        // pass the form data into the query params here
        onSubmit(formData) 
      };

    const options = [
        { value: "boat", label: "Boat" },
    { value: "house", label: "House" },
    { value: "jet", label: "Jet",},
    { value: "car", label: "Car",}
    ]

    return(<div className="search-property-holder">
        <ul>
            <li
                className={available_for===''?'--prop-selected':''}
                onClick={()=>{handleAvailable_for('')}}>
                All
            </li>
            <li
                className={available_for==='buy'?'--prop-selected':''}
                onClick={()=>{handleAvailable_for('buy')}}>
                Buy
            </li>
            <li 
                className={available_for==='rent'?'--prop-selected':''}
                onClick={()=>{handleAvailable_for('rent')}}>
                Rent
            </li>
            <li 
                className={available_for==='book'?'--prop-selected':''}
                onClick={()=>{handleAvailable_for('book')}}>
                Book
            </li>
        </ul>
        <div className="child-2">
            <Form onSubmit={handleOnSubmit}>
                <div className="holder">
                    <div className="subchild">
                        <InputField
                        type={"text"}
                        placeholder={'enter city'}
                        label={'Location'}
                        name={'state'}/>
                    </div>
                    <div className="subchild">
                        <SelectField options={options}
                        name="category"
                        label="Type"
                        // validationRules={{ required: "Please select a property type" }}
                        />
                    </div>
                    {/* <div className="subchild">
                        <InputField
                        type={"number"}
                        min='1'
                        placeholder={'number of bedrooms'}
                        label={'Bedrooms'}
                        name={'property_features.bedroom'}/>
                    </div> */}
                    <div className="btn-holder">
                        <Button type="submit"
                        iconRight={<IoSearchSharp size={20} color="#7065f0" />}
                        isLoading={isLoading}/>
                    </div>
                </div>
            </Form>
        </div>
    </div>)
    }

export default Search