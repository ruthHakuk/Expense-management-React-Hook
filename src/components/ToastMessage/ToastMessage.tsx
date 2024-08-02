
import React, { useEffect, useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { Message } from '../../Models/message.model';
import { IRootState } from '../..';
import { setLoededStatus } from '../../redux/slices/expenseSlice';

const ToastMessage: React.FC = () => {
  const dispatch=useDispatch()
  const message :Message= useSelector((state: any)=>state.message.message)
  //משתנה לבדוק מתי קורה שינוי ברידאקס של ההודעה כדי לדעת מתי להציג הודעה
  const isLoaded:boolean =useSelector((state: any)=>state.expencesList.isLoaded)
  const [show, setShow] = useState<boolean>(false);
//תסגור ותפתח את ההודעה בהתאם
const handleClose=()=>{
  setShow(false)
}
 //מופעל כשיש שינוי ברידאקס של ההודעה 
  useEffect(() => {
   if(isLoaded){
      setShow(true)
      dispatch(setLoededStatus())
    }
    }
  , [isLoaded])

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 9999,
    }}>
      <Toast show={show} onClose={handleClose} delay={3000} autohide bg={message.type.toLowerCase()}>
        <Toast.Header closeButton={false}>
          <strong className="me-auto">{message.type}</strong>
        </Toast.Header>
        <Toast.Body>{message.text}</Toast.Body>
      </Toast>
    </div>
  );
}

export default ToastMessage;
