import { useEffect } from 'react'
import Form from '../components/form'
import InputField from '../components/inputs'
import TextArea from './text_area_field'
import Button from '../components/Button'
import SelectField from '../components/selectField'
import ImageUploadField from './image_upload'
// import { useFormContext,useWatch } from 'react-hook-form';
import { MdOutlineFileUpload } from "react-icons/md";
import PropertyFeatures from './property_features'
import FormChangeTracker from './property_form_tracker'
import {useMutation,} from '@tanstack/react-query'
import { uploadProperty,updateProperty} from '../APIs'
import { showToast } from '../utils/toast'
// import { useForm } from 'react-hook-form';

const PropertyForm = ({ mode = 'create', propertyData = {},}) => {
  // console.log('propertyData',propertyData)
  // const {reset,} = useForm();

  const mutation = useMutation({
    mutationFn: mode === 'edit'? async (formData)=> updateProperty(token,formData)
   : async (formData)=>{
    // console.log(formData)
    return uploadProperty(token,formData)
   } ,
  
    onError: (error) =>{
      showToast('Something went wrong','error')
      console.log('mutation property form error:',error)
    },
    onSuccess:(data)=>{
       console.log('mutation success data:', data)
      if(data.success){
        showToast(data.message,'success')
      }else{
        showToast(data.message,'error')
      }
    },
  })
  const isLoading = mutation.isPending;
  
  // console.log('property data:', propertyData)
  // Define defaultValues based on mode

const defaultValues = mode === 'edit' ? {
    title: propertyData.title ,
    address: propertyData.address ,
    country: propertyData.country,
    state: propertyData.state || '',
    price: propertyData.price || '',
    status: propertyData.status || '',
    available_for: propertyData.available_for || '',
    category: propertyData.category || '',
    description: propertyData.description || '',
    images: propertyData.images || [],
    bathrooms:propertyData?.property_features?.bathroom || '',
    bedrooms:propertyData?.property_features?.bedroom || '',
    square:propertyData.property_features?.square || '',
    model:propertyData.property_features?.model || '',
    make:propertyData.property_features?.make || '',
    year:propertyData.property_features?.year || '',
    capacity:propertyData.property_features?.capacity || '',
    vessel:propertyData.property_features?.vessel || '',
    cabin:propertyData.property_features?.cabin || '',
  } : {};

// useEffect(()=>{
//   const isPropertyDetailsReady = async()=>{
//      if(mode === 'edit' ) {
//       console.log('form has changed')
//       // reset();
//      }
//   }
//   isPropertyDetailsReady()
// },[propertyData,isDataLoading,])

  const handleOnSubmit = (data) => {
      const formData = new FormData();
      for (let key in data) {
        const value = data[key];
        if (key === 'images') {
          if (Array.isArray(value)) {
            value.forEach((file) => {
              if (file instanceof File) {
                formData.append('images', file);
              }
            });
          }
        } else if (typeof value === 'object' && value !== null){
          formData.append(key, JSON.stringify(value));
        } else if (value !== undefined && value !== null){
          formData.append(key, value);
        }
      }
      mutation.mutate(formData)
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
  const id = propertyData.property_id
  return (
    <section id="property-form">
      <Form onSubmit={handleOnSubmit} defaultValues={async()=> defaultValues}>
        {mode === 'edit' && (<div className='form-tracker-holder'>
          <FormChangeTracker isLoading={isLoading} id={id} />
          </div>)
        }
        {mode === 'create' && (<div className='create-new-property'><h1>Upload New Property</h1></div>)}
     
        <div className="parent-input-holder">
          <div className="child-input-holder">
            <InputField
              type="text"
              label="Title"
              name="title"
              validationRules={mode === 'create' ? { 
                required: 'Title is required' ,
                pattern: {
                    value: /^.{0,100}$/,
                    message: 'title cannot exceed 50 characters',
                  },
              } 
                : {}}
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
                      value: /^.{0,300}$/,
                      message: 'Description cannot exceed 150 characters',
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
