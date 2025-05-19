import {useState} from 'react'
import Button from "./Button"
import {MdEditCalendar} from "react-icons/md"; //import this way to optimise build time 
import { MdCancel } from "react-icons/md"; //import this way to optimise build time 
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { AnimatePresence, motion } from "motion/react"
import Form from './form';
import InputField from './inputs';
import { IoSearchSharp } from "react-icons/io5";

function BrowseProperties(){
    const [value, setValue] = useState(null);
    const [showCalender, setShowCalender] = useState(false);
    const [propertyAvailableFor, setPropertyAvailableFor] = useState('book')

    const handleClickDate = (value) => {
        // console.log('Value is:', value)
        const stringifyValue = value.toLocaleDateString();
        setValue(stringifyValue)
    }
    // const isLoading = true
    const handleShowCalender = ()=>{
        setShowCalender(!showCalender)
    }

    const handlepropertyAvailableFor = (args)=> {
        setPropertyAvailableFor(args)
    }

    const handleOnSubmit = (data) => {
        // console.log("Submitted data:", data);
        let formData = {...data, propertyAvailableFor}
        console.log("Submitted data:", formData);
        // pass the form data into the mutation method here
      };

    return(
        <div className="browse-prop-main-holder">
            <ul>
                <li 
                className={propertyAvailableFor==='book'?'--prop-selected':''}
                onClick={()=>{handlepropertyAvailableFor('book')}}>Book</li>
                <li 
                className={propertyAvailableFor==='rent'?'--prop-selected':''}
                onClick={()=>{handlepropertyAvailableFor('rent')}}>Rent</li>
                <li 
                 className={propertyAvailableFor==='buy'?'--prop-selected':''}
                onClick={()=>{handlepropertyAvailableFor('buy')}}>Buy</li>
            </ul>
            <div className="search-criteria-holder">
                <div className="--home-location">
                    <h4>Location</h4>
                    <p>Select Location</p>
                    {/* <input type='search'/> */}
                </div>
                <div className="--home-date">
                    <h4>When</h4>
                    <div className='home--date--content'  onClick={handleShowCalender}>
                        <p>{value ? value:'Select date'}</p>
                        <span>{!showCalender?
                            <MdEditCalendar color='#7065f0'/>
                            : <MdCancel color='#7065f0'/>
                        }</span>
                    </div>
                    <AnimatePresence initial={false}>
                    {
                    showCalender ? (
                    <motion.div initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        key="box"
                        className='home-calender-holder'>
                       <Calendar minDate={new Date()}
                        onClickDay={(value, event) => handleClickDate(value)}/>  
                    </motion.div>
                    ) : null
                    }
                    </AnimatePresence>
                </div>
                <div className="--home-btn">
                    <Button 
                    type='button'
                    text={'Browse Properties'}/>
                </div>
            </div>
            <div className="form-holder">
                <Form onSubmit={handleOnSubmit}>
                    <div className="input-holder">
                        <InputField 
                        type={'search'} 
                        placeholder={'enter location'} 
                        name={'searchQuery'}
                        // label="Email" //add label for good seo
                        validationRules={{
                        required: "this field is required",
                        // pattern: {
                        //     value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        //     message: "enter a valid email address",
                        //     },
                        }}/>
                        <div className="btn-holder">
                            <Button type="submit" 
                            // text={'search'} 
                            // isLoading={isLoading}
                            iconRight={<IoSearchSharp size={20} />}/>
                        </div>
                    </div>
                    {/* <div className="btn-holder">
                        <Button type="submit" text={'submit'}/>
                    </div> */}
                </Form>
            </div>
        </div>
    )
}

export default BrowseProperties