import data from '../property_sample.json'

export const getAllProperty = async ()=>{
    const res = await fetch('../property_sample.json',{
        // headers: {
        //     'Content-Type': 'application/json',
        // },
        // credentials:true,
    })
    const data = await res.json();
    return data
}