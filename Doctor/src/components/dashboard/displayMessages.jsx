import { useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import Stomp from 'stompjs';
import useApiRequest from '../../hooks/useApiRequest';


export function Message() {
  const msgs = useRef(null)
  const { request } = useApiRequest()
  const [connected, setConnected] = useState(false)
  const queueName = 'AlertQueue';
  const stompClient = Stomp.client('ws://localhost:15674/ws');

  useEffect(() => {
    stompClient.connect('guest', 'guest', () => {
      setConnected(true);
      stompClient.subscribe(`/queue/${queueName}`, message => {
        const body = message.body;
        const res = JSON.parse(body)
        console.log(res);
        handleMsgs(res.message)
      });
    },)
  }, [])


  async function handleMsgs(body) {
    console.log("body", body);
    const user = await request(`/user/${body.userId}`)
    msgs.current?.show(
      { sticky: true, severity: body.BadgeColor, summary: 'Info', detail: `${user.fullName} ${body.userStatus}`, closable: true }
    );
  }
  return (
    <div style={{ width: '90%' }}>
      <h4>messages Component</h4>
      <h4>connected: {"" + connected}</h4>
      {/* <Button onClick={handleClick} label={"click"} /> */}
      <Messages ref={msgs} />
    </div>
  );
}
