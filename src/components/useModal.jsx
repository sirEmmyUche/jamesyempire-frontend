import Modal from 'react-modal'
import { IoCloseSharp } from "react-icons/io5";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    padding:0,
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const UseModal = ({children, isOpen, onRequestClose})=>{
    return(
        <Modal 
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
        >
            <div className='close-modal'>
                <div onClick={onRequestClose} className='close-modal-icon-wrapper'>
                     <IoCloseSharp color='#ffffff' size={20}/>
                </div>
            </div>
            {children}
        </Modal>
    )
}

export default UseModal