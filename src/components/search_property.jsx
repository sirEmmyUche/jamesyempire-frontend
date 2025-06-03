import { useState } from "react"
import Form from "./form"
import InputField from "./inputs"
import SelectField from "./selectField"
import Button from "./Button"
import { IoSearchSharp } from "react-icons/io5";
import {useQuery,keepPreviousData,useQueryClient } from '@tanstack/react-query'

const Search = ()=>{
    const [propertyAvailableFor, setPropertyAvailableFor] = useState('buy')
    const isLoading = false

    const handlepropertyAvailableFor = (args)=> {
        setPropertyAvailableFor(args)
    }

    const handleOnSubmit = (data) => {
        // console.log("Submitted data:", data);
        let formData = {...data, propertyAvailableFor}
        console.log("Submitted data:", formData);
        // pass the form data into the mutation method here
      };

    const options = [
        { value: "boat", label: "Boat" },
    { value: "house", label: "House" },
    { value: "jet", label: "Jet",}
    ]

    return(<div className="search-property-holder">
        <ul>
            <li
                className={propertyAvailableFor==='buy'?'--prop-selected':''}
                onClick={()=>{handlepropertyAvailableFor('buy')}}>
                Buy
            </li>
            <li 
                className={propertyAvailableFor==='rent'?'--prop-selected':''}
                onClick={()=>{handlepropertyAvailableFor('rent')}}>
                Rent
            </li>
            <li 
                className={propertyAvailableFor==='book'?'--prop-selected':''}
                onClick={()=>{handlepropertyAvailableFor('book')}}>
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
                        name={'location'}/>
                    </div>
                    <div className="subchild">
                        <SelectField options={options}
                        name="category"
                        label="Type"
                        // validationRules={{ required: "Please select a property type" }}
                        />
                    </div>
                    <div className="subchild">
                        <InputField
                        type={"number"}
                        min='1'
                        placeholder={'number of bedrooms'}
                        label={'Bedrooms'}
                        name={'numberOfBedrooms'}/>
                    </div>
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