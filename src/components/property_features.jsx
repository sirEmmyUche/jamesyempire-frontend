import { useFormContext, useWatch } from "react-hook-form";
import InputField from "../components/inputs";
import { AnimatePresence, motion } from "motion/react"

const PropertyFeatures = () => {
  const { control } = useFormContext();
  const category = useWatch({ control, name: "category" });

    const features = {
        house:(
            <>  
                <div className="child-input-holder">
                    <InputField type='number' min={1} placeholder={'bedroom'} name={'bedroom'}/>
                </div>
                <div className="child-input-holder">
                    <InputField type='number' min={1} placeholder={'bathroom'} name={'bathroom'}/>
                </div>
                <div className="child-input-holder">
                    <InputField type='number' min={50} placeholder={'200m square'} name={'square'}/>
                </div>
                
            </>
        ),
         car:(
            <>
                <div className="child-input-holder">
                    <InputField type='text' placeholder={'brand'} name={'make'}/>
                </div>
                <div className="child-input-holder">
                     <InputField type='text' placeholder={'model'} name={'model'}/>
                </div>
                <div className="child-input-holder">
                    <InputField type='year' min={1} placeholder={'year'} name={'year'}/>
                </div>
            </>
        ),
         boat:(
            <>
                <div className="child-input-holder">
                    <InputField type='text' placeholder={'brand'} name={'make'}/>
                </div>
                <div className="child-input-holder">
                    <InputField type='text' placeholder={'model'} name={'model'}/>
                </div>
                <div className="child-input-holder">
                    <InputField type='year' min={1} placeholder={'year'} name={'year'}/>
                </div>
            </>
        ),
         jet:(
            <>
                <div className="child-input-holder">
                    <InputField type='text' placeholder={'capacity'} name={'capacity'}/>
                </div>
                <div className="child-input-holder">
                    <InputField type='text' placeholder={'model'} name={'model'}/>
                </div>
                <div className="child-input-holder">
                    <InputField type='year' min={1} placeholder={'vessel'} name={'vessel'}/>
                </div>
            </>
        )
    }

  return (
    // features[category] ?? null
    //  <AnimatePresence initial={false}>
    // <motion.div initial={{ opacity: 0, scale: 0 }}
    //     animate={{ opacity: 1, scale: 1 }}
    //     exit={{ opacity: 0, scale: 0 }}
    //     key="box"
    //     // className='home-calender-holder'
    //     >
        
        <div className="property-category-features">{features[category] ?? null}</div>
    // </motion.div>
    // </AnimatePresence>
)
};

export default PropertyFeatures;
