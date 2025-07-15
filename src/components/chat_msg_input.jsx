import Button from './Button';
import {useForm,useWatch} from 'react-hook-form'
import { IoMdSend } from "react-icons/io";

const ChatMsgInput = ({emit})=>{

     const {register, handleSubmit, reset,control,
        formState: {isDirty,},} = useForm();

     const watchMessageField = useWatch({ control, name: "message" });

      const sendMessage = async(data)=>{
        // console.log(data)
        if(isDirty == false){
            //  console.log('isDirty:',isDirty)
              reset();
            return;
        }else if(watchMessageField == ''){
            // console.log('watchMessageField :',watchMessageField )
             reset();
            return;
        }
        const message = data.message.trim();
        if(message == ''){
             reset();
            return
        }
        emit(message)
        //  emit('chat-message', {message})
        reset();
    }

    return(
        <form onSubmit={handleSubmit(sendMessage)}>
            <div className='txt-btn-wrapper'>
                <div className='chat-txtmsg-area'>
                    <textarea placeholder='type message'{...register('message',)}/>
                </div>
                <div className='btn-wrapper'>
                    <Button type='submit'>
                        <IoMdSend color='#ffffff' size={20}/>
                    </Button>
                </div>
            </div>
        </form>
        )
}
export default ChatMsgInput