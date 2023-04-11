import React, { useRef, useState } from "react";
import { useFormik } from 'formik';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { Calendar } from 'primereact/calendar'; // import the Calendar component
import useApiRequest from "../../../hooks/useApiRequest"

export function AddTask({ userId, doctorId, onAdd }) {
  const toast = useRef(null);
  const { request: addTask } = useApiRequest()
  const [time, setTime] = useState(null); // add state to hold the selected time
  if (!userId || !doctorId) {
    return <h1>sign In to add task</h1>
  }
  const show = () => {
    toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: formik.values.value });
  };
  const showError = (msg) => {
    toast.current.show({ severity: 'warn', summary: 'Warning', detail: msg, life: 3000 });
  };
  const formik = useFormik({
    initialValues: {
      value: ''
    },
    validate: (data) => {
      let errors = {};

      if (!data.value) {
        errors.value = 'task title is requre.';
      }

      return errors;
    },
    onSubmit: async (data) => {
      if (!data.value || !time) {
        showError('all fields are required')
        return
      }
      const res = data ? await addTask('/task', 'POST', { title: data.value, taskTime: time, assignedBy: doctorId, assignedTo: userId }) : null
      if (data && res && !res.error) show(data);
      else if (!data || !res || res.error) showError('can not add task')
      formik.resetForm();
      onAdd()
      setTime('')
    }
  });

  const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
  };

  return (
    <>
      <div className="card flex w-full	 ">
        <form onSubmit={formik.handleSubmit} className="flex justify-content-center flex-column gap-2 w-full p-2">
          <span className="p-float-label w-auto">
            <Toast ref={toast} />
            <InputText
              id="value"
              name="value"
              value={formik.values.value}
              onChange={(e) => {
                formik.setFieldValue('value', e.target.value);
              }}
              className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('value') })}
            />

            <label htmlFor="input_value">add task</label>
          </span>
          {getFormErrorMessage('value')}

          <div className="w-full">
            <label htmlFor="calendar-timeonly" className="font-bold block mb-2">
              Time Only
            </label>
            <Calendar
              value={time}
              onChange={(e) => setTime(e.value)}
              timeOnly
              hourFormat="24"
              className="w-full"
            />
          </div>
          <Button type="submit" label="Add Task" />
        </form>
      </div>
    </>
  );
}
