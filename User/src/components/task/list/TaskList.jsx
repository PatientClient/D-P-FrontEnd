





import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import { Ripple } from 'primereact/ripple';
import { Toast } from 'primereact/toast';
import useApiRequest from '../../../hooks/useApiRequest';
import { useRef } from 'react';
import useApi from '../../../hooks/useApi';

export function TaskList({ id }) {
  if(!id){
    return <h1>login</h1>
  }
  const { data: tasks ,request:onChange} = useApi(`/task/${id}/userTasks`)
  const { request: updateStatus } = useApiRequest()
  if (!tasks) return <h1>no tasks</h1>
  const taskTimeTemplate = rowData => {
    const taskTime = new Date(rowData.taskTime);
    const hours = taskTime.getHours();
    const minutes = taskTime.getMinutes();
    return `${hours}:${minutes}`;
  };
  const template = (options) => {
    const toggleIcon = options.collapsed ? 'pi pi-chevron-down' : 'pi pi-chevron-up';
    const className = `${options.className} justify-content-start`;
    const titleClassName = `${options.titleClassName} ml-2 text-primary`;
    const style = { fontSize: '1.25rem' };

    return (
      <div className={className}>
        <button className={options.togglerClassName} onClick={options.onTogglerClick}>
          <span className={toggleIcon}></span>
          <Ripple />
        </button>
        <span className={titleClassName} style={style}>Details</span>
      </div>
    );
  };

  const statysBodyTemplate = (rowData) => {
    const toast = useRef(null)
    const status = rowData.status;
    let Badge
    switch (status) {
      case 'Pending':
        Badge = 'warning'
        break;
      case 'complete':
        Badge = 'info'
        break;
      default:
        Badge = 'error'
        break;
    }
    const handleStatusChange = async () => {
      if (status !== 'Pending') {
        return
      }
      const res = await updateStatus(`/task/${rowData._id}`, 'PATCH', { status: "Complete" })
      console.log(res);
      if (res && !res.error) {
        toast.current.show({ severity: 'info', summary: 'updated', detail: 'Status Updated Successfuly!', life: 3000 });
        //update screen
        onChange()
        return
      }
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'something went wrong !', life: 3000 });

    }
    return <>
      <Toast ref={toast} />
      <Button onClick={handleStatusChange} label={status} severity={Badge} />
    </>
  }
  return <>
    <DataTable value={tasks}>
      <Column field="title" header="Task Title"></Column>
      <Column body={taskTimeTemplate} header="Due Date"></Column>
      <Column field="notes" header="Notes"
        body={(rowData) => (
          <Panel headerTemplate={template} toggleable collapsed={true}>
            <DataTable value={rowData.notes} header={false}>
              <Column field="note" header={null}></Column>
            </DataTable>
          </Panel>
        )}
      ></Column>
      <Column body={statysBodyTemplate} header="status"></Column>
    </DataTable>
  </>
}