import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import InputField from "../components/inputs";

const PropertyFeatures = () => {
        const { control, resetField} = useFormContext();
        const category = useWatch({ control, name: "category" });

        useEffect(()=>{
            resetField('property_features')
        },[category,resetField])

        const features = {
        house: [
            { type: 'text', name: 'property_features.bedroom', placeholder: 'Bedroom' },
            { type: 'text',name: 'property_features.bathroom', placeholder: 'Bathroom' },
            { type: 'text',name: 'property_features.square', placeholder: '200m square' },
        ],
        car: [
            { type: 'text', name: 'property_features.make', placeholder: 'Make e.g benz' },
            { type: 'text', name: 'property_features.model', placeholder: 'Model e.g GLK' },
            { type: 'text', name: 'property_features.year', placeholder: 'Year' },
        ],
        jet:[
            {type:'text', name:'property_features.capacity', placeholder:'Capacity', },
            {type:'text', name:'property_features.model', placeholder:'Model', },
            {type:'text', name:'property_features.vessel', placeholder:'Vessel e.g private, economy', },
        ],
        boat:[
            {type:'text', name:'property_features.capacity', placeholder:'Capacity', },
            {type:'text', name:'property_features.vessel', placeholder:'Vessel e.g yacht', },
            {type:'text', name:'property_features.cabin', placeholder:'Cabin', },
        ]
        };

    return (
    <div className="property-category-features">
        {features[category]?.map((field) => (
        <div key={field.name} className="child-input-holder">
            <InputField {...field} />
        </div>
        ))}
    </div>
    );
};

export default PropertyFeatures;
