import {
  useEffect,
  useState
} from "react";
import useApi from "../../hooks/useApi";
import useApiRequest from "../../hooks/useApiRequest";
import Stomp from 'stompjs';

export const useDashBoard = () => {

  const {
    data: users,
    setData: setUsers,
    request: refreshUsers
  } = useApi('/user')
  const {
    request: updateUser
  } = useApiRequest()
  const [connected, setConnected] = useState(false)
  const queueName = 'userProgress';
  const stompClient = Stomp.client('ws://localhost:15674/ws');



  const filterData = (status) => {
    return users.filter(user => user.status === status)
  }

  useEffect(() => {
    stompClient.connect('guest', 'guest', () => {
      setConnected(true);
      stompClient.subscribe(`/queue/${queueName}`, message => {
        const body = JSON.parse(message.body);
        updateUserStatus(body.message)

      });
    }, )
  }, [])

  const updateUserStatus = async (user) => {
    if (user.userId && user.status) {
      const res = await updateUser(`/user/${user.userId}`, 'PATCH', {
        status: user.status
      })
      console.log(res);
      if (res && !res.error) {
        refreshUsers()
      }
    }
  }


  return {
    users,
    setUsers,
    updateUser,
    connected,
    setConnected,
    filterData,
    refreshUsers
  }
}