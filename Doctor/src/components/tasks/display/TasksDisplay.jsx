import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { OverlayPanel } from 'primereact/overlaypanel';
import { ConfirmDialog } from 'primereact/confirmdialog'; // For <ConfirmDialog /> component
import { confirmDialog } from 'primereact/confirmdialog'; // For confirmDialog method
import { Button } from 'primereact/button';
import useApiRequest from '../../../hooks/useApiRequest';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';

import { Divider } from 'primereact/divider';
import { ScrollPanel } from 'primereact/scrollpanel';

export function TasksDisplay({ tasks, restData }) {
  if (!tasks || !tasks.length > 0) return <h1>no tasks available</h1>;

  const taskTimeTemplate = rowData => {
    const taskTime = new Date(rowData.taskTime);
    const hours = taskTime.getHours();
    const minutes = taskTime.getMinutes();
    return `${hours}:${minutes}`;
  };
  const deleteTask = rowData => {
    const [visible, setVisible] = useState(false);
    const toast = useRef(null);
    const { request: deleteRecord } = useApiRequest()
    const accept = async () => {
      const res = await deleteRecord(`/task/${rowData._id}`, 'DELETE')
      console.log('delete result', res);
      if (res && !res.error) {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'record deleted', life: 3000 });
        await restData()
        return
      }
      else {
        reject()
      }
    }

    const reject = () => {
      toast.current.show({ severity: 'warn', summary: 'Rejected', detail: '', life: 3000 });
    }
    return <>
      <Toast ref={toast} />
      <ConfirmDialog visible={visible} onHide={() => setVisible(false)} message="Are you sure you want to proceed?"
        header="Confirmation" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
      <div className="card flex justify-content-center">
        <Button onClick={() => setVisible(true)} icon="pi pi-trash" rounded severity='warning' label="" />
      </div>
    </>
  }

  const TaskNotes = (rowData) => {
    const toast = useRef(null);
    const { request } = useApiRequest()
    const [visible, setVisible] = useState(false);
    const overlayPanelRef = useRef(null);
    const [deleteNoteVisablity, setDeleteNoteVisiblity] = useState(false)

    const acceptDeleteNote = async (id) => {
      debugger
      if (!rowData._id || !id) {
        rejectDeleteNote(id);
        return;
      }
      const res = await request(`/task/${rowData._id}/notes/${id}`, 'DELETE')
      console.log('deletedNote', res);
      if (res && !res.error) {
        restData()
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'note deleted', life: 3000 });
        return
      }
      rejectDeleteNote()
    }

    const rejectDeleteNote = () => {
      toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'delete request rejected', life: 3000 });
    }
    const notesTemplate = note => {
      return (
        <div className='w-full'>
          <div className='flex justify-content-between align-content-center flex-wrap p-1  '>
            <Toast ref={toast} />
            <ConfirmDialog closable visible={deleteNoteVisablity} onHide={() => setDeleteNoteVisiblity(false)} message="Are you sure you want to proceed?"
              header="Confirmation" icon="pi pi-exclamation-triangle" accept={() => acceptDeleteNote(note._id)} reject={rejectDeleteNote} />
            <p>{note.note}</p>
            <Button onClick={() => setDeleteNoteVisiblity(true)} icon="pi pi-minus" rounded severity='danger'></Button>
            <Divider />
          </div>
        </div>
      );
    };
    function notesBodyHeader() {
      const [NoteVisabilty, setNoteVisabilty] = useState(false);
      const [noteValue, setNoteValue] = useState(null)
      const toast = useRef(null)
      const cancelAddNote = () => {
        setNoteVisabilty(false)
        toast.current.show({ severity: 'warn', summary: 'canceled', detail: 'note canceled', life: 3000 });
      }
      const addNote = async () => {
        if (!noteValue || !rowData._id) cancelAddNote()
        const res = await request(`/task/${rowData._id}/notes`, 'POST', { note: noteValue })
        console.log('addedNote', res);
        if (res && !res.error) {
          toast.current.show({ severity: 'info', summary: 'success', detail: 'Note Added', life: 3000 });
          restData()
          setNoteVisabilty(false)
        }
      }
      const footerContent = (
        <div>
          <Button label="cancel" icon="pi pi-times" severity='danger' onClick={cancelAddNote} className="p-button-text" />
          <Button label="add" icon="pi pi-check" severity='info' onClick={addNote} autoFocus />
        </div>
      );
      return <>
        <div className='flex justify-content-between'>
          <div>
            <h1>notes</h1>
          </div>
          <div>
            <Button type="button" onClick={() => { setNoteVisabilty(true) }} icon="pi pi-plus" rounded severity='success' />
            <Dialog closable header="add note" visible={NoteVisabilty} style={{ width: '50vw' }} onHide={() => setNoteVisabilty(false)} footer={footerContent}>
              <InputTextarea className='w-full h-auto' onChange={(e) => { setNoteValue(e.target.value) }} placeholder='enter note for the task . . . . .' />
            </Dialog>
            <Toast ref={toast} />
          </div>
        </div>
      </>
    }
    return (
      <>
        <Button type="button" icon="pi pi-search" label="Notes" onClick={(e) => overlayPanelRef.current.toggle(e)} />

        <OverlayPanel ref={overlayPanelRef} dismissable={true} onHide={() => setVisible(false)} className='w-full '>
          <ScrollPanel style={{ width: '100%', height: '200px' }} className="custombar1">
            <DataTable value={rowData.notes} header={notesBodyHeader}>
              <Column header="Note" body={notesTemplate} className='w-full' />
            </DataTable>
          </ScrollPanel>
        </OverlayPanel >
      </>
    );
  };




  return (
    <>
      <h1>TasksDisplay</h1>
      <div>
        <ScrollPanel style={{ width: '100%', height: '30vh' }} className="custombar1">
          <DataTable value={tasks}>
            <Column field="assignedTo.fullName" header="Assigned To" />
            <Column field="title" header="Title" />
            <Column field="taskTime" header="Task Time" body={taskTimeTemplate} />
            <Column field="taskTime" header="Delete" body={deleteTask} />
            <Column header="notes" body={TaskNotes} />
          </DataTable>
        </ScrollPanel>
      </div>
    </>
  );
}
