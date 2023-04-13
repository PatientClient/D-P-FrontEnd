import { useEffect, useState } from "react"
import { TaskList } from "../../components/task/list/TaskList"
import useApi from "../../hooks/useApi"

function useUserData() {
  const [user, setUser] = useState()
  const { request } = useApi()

  useEffect(() => {
    async function fetchUserData() {
      const userData = await request('/user/signedInUser')
      setUser(userData)
    }
    fetchUserData()
  }, [request])

  return user
}

export function Tasks() {
  const user = useUserData()

  if (!user) {
    return <h1>login to access this page</h1>
  }

  const { data: tasks, request: updateData } = useApi(`/task/${user._id}/userTasks`)

  return <TaskList id={user._id} onChange={updateData} tasks={tasks} />
}
