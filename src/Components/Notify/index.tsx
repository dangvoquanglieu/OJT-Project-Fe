import React,{ useState, useEffect } from "react";
import { Message } from "semantic-ui-react";

export default function Notify({content}:any) {

  const [show, setShow] = useState<boolean>(true)

  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setShow(false)
    }, 3000)

    return () => {
      clearTimeout(timeId)
    }
  }, []);

  if (!show) {
    return null;
  }



  return (
    <div>
      <Message positive>
        <Message.Header>Notify</Message.Header>
        <p>
          {content}
        </p>
      </Message>
    </div>
  );
}