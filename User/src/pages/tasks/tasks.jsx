import { TaskList } from "../../components/task/list/TaskList"
import useApi from "../../hooks/useApi"



export function Tasks() {
  const { data: tasks, request: updateData } = useApi('/task')

  return <>
    <TaskList onChange={updateData} tasks={tasks} />
  </>
}