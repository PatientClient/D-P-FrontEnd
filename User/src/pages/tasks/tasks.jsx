import { useEffect, useState } from "react"
import { TaskList } from "../../components/task/list/TaskList"
import useApi from "../../hooks/useApi"




export function Tasks() {
  const { data: user } = useApi('/user/signedInUser')
  if (!user) {
    return <h1>not loggedIn</h1>
  }


  return <TaskList id={user._id}  />
}
