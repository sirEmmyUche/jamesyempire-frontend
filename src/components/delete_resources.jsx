import { useState } from "react"
import {useMutation,} from '@tanstack/react-query'
import { showToast } from '../utils/toast'
import { user } from "../store/user"
import UseModal from "./useModal"
import Button from "./Button";
import { RiDeleteBin6Fill } from "react-icons/ri"

const DeleteResources =({resourceAPIFn, resourceId})=>{
    const [isOpen, setIsOpen] = useState(false);
    const isUser = user((state) => state.user); 
    const token = isUser?.token || ''
    function openModal() {
    setIsOpen(true);
    }

    function closeModal() {
    setIsOpen(false);
    }

    const mutation = useMutation({
        mutationFn: async () => resourceAPIFn(resourceId,token),
      
        onError: (error) =>{
          showToast('Something went wrong','error')
          console.log('mutation property form error:',error)
        },
        onSuccess:(data)=>{
        //    console.log('mutation success data:', data)
          if(data?.success){
            showToast(data?.message,'success')
          }else{
            showToast(data?.error?.message,'error')
          }
        },
      })
      const isLoading = mutation.isPending; 

    return(
        <div className="delete-resorces-section">
            <div className="danger-zone-div">
                <h3>Danger Zone</h3>
                <p>Delete</p>
            </div>
            <div className="click-to-open-modal-div">
                <p>Deleting any resources would lead to permanent loss of data associated with the resources.</p>
                <p>This action cannot be undone.</p>
                <div className="btn-wrapper">
                     <Button
                     text={'Proceed'}
                     type='button'
                     onClick={openModal}/>
                </div>
            </div>
            {/* <div onClick={closeModal}> close me</div> */}
            <UseModal isOpen={isOpen} onRequestClose={closeModal}>
                <div className="delete-resource-group">
                    <h3>Are you sure you want to delete this resources?</h3>
                    <div className="delete-resource-btn-wrapper">
                        <div className="cancel-delete-btn">
                            <Button text={'Cancle'} 
                            onClick={closeModal}/>
                        </div>
                        <div className="delete-btn">
                            <Button text={'Delete'}
                            isLoading={isLoading}
                            iconLeft={<RiDeleteBin6Fill size={16} color="#ffffff"/>}
                            onClick={mutation.mutate}/>
                        </div>
                    </div>
                </div>
            </UseModal>
        </div>
    )
}

export default DeleteResources