import { useEffect } from 'react'
import Form from '../components/form'
import InputField from '../components/inputs'
import TextArea from './text_area_field'
import Button from '../components/Button'
import SelectField from '../components/selectField'
import ImageUploadField from './image_upload'
import { useFormContext,useWatch } from 'react-hook-form';
import { MdOutlineFileUpload } from "react-icons/md";
import PropertyFeatures from './property_features'
import FormChangeTracker from './property_form_tracker'

const PropertyForm = ({ mode = 'create', propertyData = {} }) => {
  const isLoading = false;
// console.log('property data:', propertyData)
  // Define defaultValues based on mode
  const defaultValues = mode === 'edit' ? {
    title: propertyData.title || '',
    address: propertyData.address || '',
    country: propertyData.country || '',
    state: propertyData.state || '',
    price: propertyData.price || '',
    status: propertyData.status || '',
    available_for: propertyData.available_for || '',
    category: propertyData.category || '',
    description: propertyData.description || '',
    images: propertyData.images || [],
    bathrooms:propertyData.property_features.bathrooms || '',
    bedrooms:propertyData.property_features.bedrooms || '',
    square:propertyData.property_features.square || '',
    model:propertyData.property_features.model || '',
    make:propertyData.property_features.make || '',
    year:propertyData.property_features.year || '',
    capacity:propertyData.property_features.capacity || '',
    vessel:propertyData.property_features.vessel || '',
    cabin:propertyData.property_features.cabin || '',
  } : {};

  const handleOnSubmit = (data) => {
        console.log('Submitted data:', data);
        const formData = new FormData();
    for (let key in data) {
      if (key === 'images') {
        if (Array.isArray(data.images)) {
          data.images.forEach((file) => formData.append('images', file));
        } else {
          console.log('No images found or image is not an array');
        }
      } else {
        formData.append(key, data[key]);
      }
    }
    // pass the form data into the mutation method here
    // mutation.mutate(formData)
  };

  const statusOption = [
    { value: 'available', label: 'Available' },
    { value: 'unavailable', label: 'Unavailable' },
  ];
  const availableForOption = [
    { value: 'rent', label: 'Rent' },
    { value: 'buy', label: 'Buy' },
    { value: 'book', label: 'Book' },
  ];
  const categoryOptions = [
    { value: 'boat', label: 'Boat' },
    { value: 'house', label: 'House' },
    { value: 'jet', label: 'Jet' },
    { value: 'car', label: 'Car' },
  ];

  return (
    <section id="property-form">
      <Form onSubmit={handleOnSubmit} defaultValues={defaultValues}>
        {mode === 'edit' && (<div className='form-tracker-holder'><FormChangeTracker /></div>)}
        {mode === 'create' && (<div className='create-new-property'><h1>Upload New Property</h1></div>)}
     
        <div className="parent-input-holder">
          <div className="child-input-holder">
            <InputField
              type="text"
              label="Title"
              name="title"
              validationRules={mode === 'create' ? { required: 'Title is required' } : {}}
            />
          </div>
          <div className="child-input-holder">
            <InputField
              type="text"
              label="Address"
              name="address"
              validationRules={mode === 'create' ? { required: 'Address is required' } : {}}
            />
          </div>
        </div>
        <div className="parent-input-holder">
          <div className="child-input-holder">
            <InputField
              type="text"
              label="Country"
              name="country"
              validationRules={mode === 'create' ? { required: 'Country is required' } : {}}
            />
          </div>
          <div className="child-input-holder">
            <InputField
              type="text"
              label="City"
              name="state"
              validationRules={mode === 'create' ? { required: 'City is required' } : {}}
            />
          </div>
        </div>
        <div className="parent-input-holder">
          <div className="child-input-holder">
            <InputField
              type="text"
              label="Price"
              name="price"
              validationRules={mode === 'create' ? { required: 'Price is required' } : {}}
            />
          </div>
          <div className="child-input-holder">
            <SelectField
              options={statusOption}
              name="status"
              label="Status"
              validationRules={mode === 'create' ? { required: 'Status is required' } : {}}
            />
          </div>
        </div>
        <div className="parent-input-holder">
          <div className="child-input-holder">
            <SelectField
              options={availableForOption}
              name="available_for"
              label="Service"
              validationRules={mode === 'create' ? { required: 'Service is required' } : {}}
            />
          </div>
          <div className="child-input-holder">
            <SelectField
              options={categoryOptions}
              name="category"
              label="Category"
              validationRules={mode === 'create' ? { required: 'Category is required' } : {}}
            />
          </div>
        </div>
        <div className="parent-input-holder">
          <PropertyFeatures />
        </div>
        <div className="parent-input-holder">
          <TextArea
            name="description"
            placeholder="Describe details of property"
            validationRules={
              mode === 'create'
                ? {
                    required: 'Description is required',
                    pattern: {
                      value: /^.{0,100}$/,
                      message: 'Description cannot exceed 100 characters',
                    },
                  }
                : {}
            }
          />
        </div>
        <ImageUploadField
          name="images"
          rules={mode === 'create' ? { required: 'Please upload at least one image' } : {}}
        />
        {
            mode == 'create' && (
              <div className='create-mode-main-btn-holder'>
                <div className='-btn-holder'>
                  <Button
                  type="submit"
                  text="Upload"
                  iconLeft={<MdOutlineFileUpload />}
                  isLoading={isLoading}
                  />
                </div>
              </div>
            )
        }
      </Form>
    </section>
  );
};

export default PropertyForm;


// const PropertyForm = ({mode='create'})=>{

//     const isLoading = false

//      const handleOnSubmit = (data) => {
//         console.log("Submitted data:", data);
//         const formData = new FormData();
//         for(let key in data){
//             if (key == 'images'){
//                 if(Array.isArray(data.images)){
//                     data.images.forEach(file=>formData.append('images',file))
//                 }else{
//                     console.log('No images found or image is not an array')
//                 }
//             }else{
//                 formData.append(key,data[key]);
//             }
//         }
//         // pass the form data into the mutation method here
//         // mutation.mutate(formData)
//       };

//     const statusOption = [
//         {value:'available',label:'available'},
//         {value:'unavailable',label:'unavailable'},
//     ]
//     const availableForOption = [
//         {value:'rent',label:'rent'},
//         {value:'buy',label:'buy'},
//         {value:'book',label:'book'},
//     ]
//      const categoryOptions = [
//         { value: "boat", label: "Boat" },
//     { value: "house", label: "House" },
//     { value: "jet", label: "Jet",},
//     { value: "car", label: "Car",}
//     ]

    
//     return(<section id='property-form'>
//         {/* <div></div> */}
//         <Form onSubmit={handleOnSubmit}>
//             <div className='parent-input-holder'>
//                 <div className='child-input-holder'>
//                     <InputField type='text' label={'title'} name={'title'}
//                      validationRules={mode === 'create' ? { required: "required" } : {}}
//                     />
//                 </div>
//                 <div className='child-input-holder'>
//                     <InputField type='text' label={'address'} name={'address'}
//                      validationRules={mode === 'create' ? { required: "required" } : {}}
//                     />
//                 </div>
//             </div>
//             <div className='parent-input-holder'>
//                 <div className='child-input-holder'>
//                      <InputField type='text' label={'country'} name={'country'}
//                       validationRules={mode === 'create' ? { required: "required" } : {}}/>
//                 </div>
//                 <div className='child-input-holder'>
//                     <InputField type='text' label={'city'} name={'state'}
//                      validationRules={mode === 'create' ? { required: "required" } : {}}
//                      />
//                 </div>
//             </div>

//             <div className='parent-input-holder'>
//                 <div className='child-input-holder'>
//                      <InputField type='text' label={'price'} name={'price'}
//                       validationRules={mode === 'create' ? { required: "required" } : {}}
//                       />
//                 </div>
//                 <div className='child-input-holder'>
//                     <SelectField options={statusOption}
//                     name="status"
//                     label="status"
//                     validationRules={mode === 'create' ? { required: "required" } : {}}
//                     />
//                 </div>
//             </div>
           
//             <div className='parent-input-holder'>
//                 <div className='child-input-holder'>
//                      <SelectField options={availableForOption}
//                         name="available_for"
//                         label="service"
//                         validationRules={mode === 'create' ? { required: "required" } : {}}
//                         />
//                 </div>
//                 <div className='child-input-holder'>
//                     <SelectField options={categoryOptions}
//                         name="category"
//                         label="category"
//                          validationRules={mode === 'create' ? { required: "required" } : {}}
//                         />
//                 </div>
//             </div>
//             <div className='parent-input-holder'>
//                 <PropertyFeatures/>
//             </div>
//              <div className='parent-input-holder'>
//                  <TextArea name={'description'} 
//                     placeholder={'Describe details of property'}
//                     validationRules={mode === 'create' ?{
//                         required:"required",
//                         pattern:{
//                             value:/^.{0,100}$/,
//                             message:'100 words exceeded'
//                         }
//                     }:{}}/>
//             </div>
//             <ImageUploadField
//                         name="images"
//                         // control={methods.control}
//                         rules={mode === 'create' ?{ required: "Please upload at least one image" }:{}}
//                     />

//             {
//                 mode === 'create'? ( <Button type='submit'  text={'Upload'} 
//             iconLeft={<MdOutlineFileUpload />}
//              isLoading={isLoading}/>) 
//              : ( <FormChangeTracker/>)
//             }
           
             
//         </Form>
//     </section>)
// }

// export default PropertyForm

