import { Divider } from "primereact/divider";
import { AddTask } from "../../components/tasks/add/AddTasks";
import { TasksDisplay } from "../../components/tasks/display/TasksDisplay";
import { Panel } from "primereact/panel";
import useApi from "../../hooks/useApi";









export function MangeTasks({ userId, doctorId }) {
  console.log('ssad', userId, doctorId);
  const { data: tasks, request: restTasks } = useApi('/task')

  return <>
    <div>
      <div>
        <Panel toggleable header="add task" >
          <AddTask onAdd={() => { restTasks() }} doctorId={doctorId} userId={userId} />
        </Panel>
      </div>
      <Divider layout="horizontal" className="p-0 m-0 ">
        <b>Tasks</b>
      </Divider>
      <div className="p-0">
        <Panel header="tasks" className="h-full" >
          <TasksDisplay restData={restTasks} tasks={tasks} />
        </Panel>
      </div>
    </div>

  </>
}