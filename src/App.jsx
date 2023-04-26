import { useRef } from 'react';
import './App.css'
import { subscribeUser } from './subscription';
function App() {
  const NameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  const sendNotification = () => {
    const name = NameRef.current.value;
    const email = emailRef.current.value;
    const message = messageRef.current.value;
    const data = {
      name,
      email,
      message
    }

    subscribeUser(data)
  }
  return (
    <>
      <input type="text" placeholder="Enter your name" className="InputStyle"
        ref={NameRef}
      />
      <input type="text" placeholder="Enter your email" className="InputStyle"
        ref={emailRef}
      />
      <input type="textarea" placeholder="Enter your message" className="InputStyle"
        ref={messageRef}
      />
      <button className="btnStyle"
        type="button"
        onClick={sendNotification}
      >
        Send Notification
      </button>
    </>
  )
}

export default App
