import React, { useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import useApi from '../../../hooks/useApi';
import useApiRequest from '../../../hooks/useApiRequest';

export const AddActivity = () => {
  const toast = useRef(null);
  const { data: doctor } = useApi("/doctor/signedInDoctor", "POST", { token: JSON.parse(localStorage.getItem("token")) });
  const { request } = useApiRequest()
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  if (!doctor || doctor.error) {
    toast.current?.show({ severity: 'warn', summary: 'Error', detail: 'Please sign in as a doctor to add an activity.' });
    return <h1>login to access this page</h1>;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const activity = { name, description, duration, createdBy: doctor?.doctor._id };
    //add to db//
    try {

      const res = await request("/activities", 'POST', activity);
      if (res && !res.error) {
        toast.current.show({ severity: 'success', label: "success", summary: 'success', detail: `Activity ${res.name} activity craeted `, life: 3000 });
        setName('');
        setDescription('');
        setDuration(0);
      }
      else if (!res || res.error) {
        toast.current.show({ severity: 'danger', label: "Error", summary: 'Error', detail: `${res.error || "failed to create activity"} `, life: 3000 });
      }
    } catch (error) {
      toast.current.show({ severity: 'danger', label: "Error", summary: 'Error', detail: `${error.message || "failed to create activity"} `, life: 3000 });

    }

  };

  return (
    <form onSubmit={handleSubmit}>
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
        <Button type="submit" label="Add Activity" className="p-button-lg p-mt-3" />
      </div>
      <Toast ref={toast} />
    </form>
  );
};
