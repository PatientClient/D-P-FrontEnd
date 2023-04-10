import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';
import Stomp from 'stompjs';
import { Messages } from 'primereact/messages';


export function Message() {
  const msgs = useRef(null);
  const toast = useRef(null);
  const [messages, setMessage] = useState([])
  const [connected, setConnected] = useState(false)
  const queueName = 'userProgress';
  const stompClient = Stomp.client('ws://localhost:15674/ws');

  useEffect(() => {
    stompClient.connect('guest', 'guest', () => {
      setConnected(true);
      stompClient.subscribe(`/queue/${queueName}`, message => {
        let color = 'info'
        const body = JSON.parse(message.body);
        if (body.message === 'progress') {
          color = 'warn';
        }
        toast.current?.show({ severity: 'success', label: "Error", summary: 'success', detail: `new Message `, life: 3000 });
        msgs.current?.show(
          { sticky: true, severity: color.toString(), summary: 'Info', detail: 'Message Content', closable: false }
        );
        setMessage(prevMessages => [...prevMessages, body]);
      })

    });
  }, [])

  return (
    <div>
      <h1>connected:{" " + connected}</h1>
      <Toast ref={toast} />
      <Messages ref={msgs} />
      <h1> real time messages</h1>
      <div>
        {
          messages.length > 0 && messages.map((message, i) =>
            <h1 key={i}>{message.message}</h1>
          )
        }
      </div>
    </div>
  );
}
