import 'primereact/resources/themes/saga-blue/theme.css';
import { Toast } from 'primereact/toast';
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import 'primeicons/primeicons.css';
import { useUsersDataView } from '../../../hooks/Users/useUsersDataView';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { statuses } from '../../../globalData';

export const UsersList = () => {
  const { toast, customers, setData: setCustomer, header2, globalFilter2, selectedCustomer2, DeleteBodyTemplate, setSelectedCustomer2, NameBodyTemplate, cityBodyTemplate, DoctorBodyTemplate, statusBodyTemplate, statusFilter } = useUsersDataView()
  const [editRow, setEditRow] = useState({
    fullName: '',
    address: '',
    status: ''
  })
  let originalRows = {};

  const statusEditor = (productKey, props) => {
    return (
      <Dropdown value={props.rowData.status} options={statuses} optionLabel="label" optionValue="value"
        onChange={(e) => {
          setEditRow(prevState => ({ ...prevState, ['status']: e.target.value }));
        }} style={{ width: '100%' }} placeholder="Select a Status"
        itemTemplate={(option) => {
          return <span className={`product-badge status-${option.toLowerCase()}`}>{option}</span>
        }} />
    );
  }

  const onRowEditInit = (event) => {
    originalRows[event.index] = { ...customers[event.index] };
    setEditRow({
      fullName: '',
      address: '',
      status: ''
    })
  }



  const onRowEditCancel = (event) => {
    let customerss = [...customers];
    customerss[event.index] = originalRows[event.index];
    delete originalRows[event.index];
  }


  const inputTextEditor = (productKey, props, field) => {
    return <InputText type="text" onChange={(e) => {
      setEditRow(prevState => ({ ...prevState, [field]: e.target.value }));
    }} />;
  }


  return (

    <div className="card">
      <DataTable width="auto" value={customers} paginator rows={10} header={header2} globalFilter={globalFilter2}
        onRowEditCancel={onRowEditCancel} selectionMode="single" dataKey="_id"
        stateStorage="local" stateKey="dt-state-demo-local" emptyMessage="No customers found." editMode='row' onRowEditInit={onRowEditInit} className="editable-cells-table">
        <Column field="fullName" header="Name" body={NameBodyTemplate} sortable filter filterPlaceholder="Search by name" editor={(props) => inputTextEditor(props.rowData._id, props, "fullName")}></Column>
        <Column header="city" body={cityBodyTemplate} sortable sortField="address" filter filterField="address" editor={(props) => inputTextEditor(props.rowData._id, props, 'address')} filterMatchMode="contains" filterPlaceholder="Search by city"></Column>
        <Column field="doctor.name" header="Doctor Name" body={DoctorBodyTemplate} sortable sortField="doctor.name" filter filterField="doctor.name" filterMatchMode="contains" filterPlaceholder="Search by name"></Column>
        <Column field="status" header="Status" body={statusBodyTemplate} sortable filter filterMatchMode="equals" editor={(props) => statusEditor(props.rowData._id, props)} filterElement={statusFilter}></Column>
        <Column header="Delete" body={DeleteBodyTemplate}></Column>
        <Column rowEditor headerStyle={{ width: '7rem' }} bodyStyle={{ textAlign: 'center' }}></Column>

      </DataTable>
      <Toast ref={toast} />
    </div>


  );
}
