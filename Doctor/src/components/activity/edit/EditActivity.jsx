import React, { useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import useApiRequest from '../../../hooks/useApiRequest';

export const EditActivity = ({ activity, visible, onHide }) => {
  const { request } = useApiRequest();
  const [name, setName] = useState(activity?.name || '');
  const [description, setDescription] = useState(activity?.description || '');
  const [duration, setDuration] = useState(activity?.duration || 0);
  const toast = useRef(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedActivity = { ...activity, name, description, duration };
    //update activity in db
    try {
      console.log(activity);
      const res = await request(`/activities/${activity._id}`, 'PATCH', updatedActivity);
      if (res && !res.error) {
        toast.current.show({ severity: 'success', label: "success", summary: 'success', detail: `Activity ${res.name} updated`, life: 3000 });
        onHide();
      }
      else if (!res || res.error) {
        toast.current.show({ severity: 'danger', label: "Error", summary: 'Error', detail: `${res.error || "failed to update activity"}`, life: 3000 });
      }
    } catch (error) {
      toast.current.show({ severity: 'danger', label: "Error", summary: 'Error', detail: `${error.message || "failed to update activity"}`, life: 3000 });
    }
  };

  return (
    <Dialog header="Edit Activity" visible={visible} style={{ width: '50vw' }} onHide={onHide}>
      <form onSubmit={handleUpdate}>
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="name" className="p-d-block">Activity title</label>
            <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} required className="p-inputtext-lg p-d-block" />
          </div>
          <div className="p-field">
            <label htmlFor="description" className="p-d-block">Description</label>
            <InputTextarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required className="p-inputtext-lg p-d-block" />
          </div>
          <div className="p-field">
            <label htmlFor="duration" className="p-d-block">Duration (in hours)</label>
            <InputNumber id="duration" value={duration} onChange={(e) => setDuration(e.value)} required mode="decimal" min={0} max={10} className="p-inputtext-lg p-d-block" />
          </div>
          <Button type="submit" label="Update Activity" className="p-button-lg p-mt-3" />
        </div>
      </form>
      <Toast ref={toast} />
    </Dialog>
  );
};
