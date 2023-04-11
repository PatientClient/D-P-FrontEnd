import { useRef, useState } from "react";
import useApi from "../useApi";






import { Badge } from 'primereact/badge';
import React from "react";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import useApiRequest from "../useApiRequest";
import { Button } from 'primereact/button';
import { statuses } from "../../globalData";
import { useNavigate } from "react-router";
export function useUsersDataView() {
  const { request: requsestCusomer, data: customers, setData } = useApi("/user")
  const { request } = useApiRequest("/user")
  const [globalFilter1, setGlobalFilter1] = useState(null);
  const [globalFilter2, setGlobalFilter2] = useState(null);
  const [globalFilter3, setGlobalFilter3] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const navigate = useNavigate();
  const toast = useRef(null);

  const dataTableFuncMap = {
    'globalFilter1': setGlobalFilter1,
    'globalFilter2': setGlobalFilter2,
    'globalFilter3': setGlobalFilter3
  };

  async function deleteRecored(e) {
    console.log(e);
    try {
      const res = await request(`/user/${e}`, "DELETE")
      if (res.error) {
        throw new Error(res.error)
      }
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'User Deleted successfully!', life: 3000 });

    } catch (e) {
      toast.current.show({ severity: 'error', summary: e.message, detail: 'delete user fields!', life: 3000 });

    }

    requsestCusomer()
  }

  const DeleteBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button icon='pi pi-trash' onClick={() => { deleteRecored(rowData._id) }} className="p-button-rounded p-button-danger " />
      </React.Fragment>
    );
  }
  const profileBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button icon='pi pi-user' onClick={() => { navigate(`/user/profile/${rowData._id}`) }} className="p-button-rounded p-button-info " />
      </React.Fragment>
    );
  }
  const NameBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <img alt={rowData.fullName} src="showcase/demo/images/flag_placeholder.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${rowData.fullName}`} width="30" />
        <span className="image-text">{rowData.fullName}</span>
      </React.Fragment>
    );
  }
  const cityBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {/* <img alt={rowData.country.code} src="showcase/demo/images/flag_placeholder.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${rowData.country.code}`} width="30" /> */}
        <span className="image-text">{rowData.address}</span>
      </React.Fragment>
    );
  }
  const DoctorBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <img alt={rowData.doctor?.name} src="showcase/demo/images/flag_placeholder.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${rowData.doctor?.name}`} width="30" />
        <span className="image-text">{rowData.doctor?.name}</span>
      </React.Fragment>
    );
  }

  const statusBodyTemplate = (rowData) => {
    let badgeColor = "danger"
    switch (rowData.status) {
      case 'NotActive':
        badgeColor = 'danger';
        break
      case 'InProgress':
        badgeColor = 'warning';
        break
      case 'Active':
        badgeColor = 'success';
        break
      default:
        badgeColor = 'danger';
        break
    }
    console.log("class", badgeColor);
    return <Badge value={rowData.status} className={`p-badge-${badgeColor}`}></Badge>;
  }

  const renderHeader = (globalFilterKey) => {
    return (
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText type="search" onInput={(e) => dataTableFuncMap[`${globalFilterKey}`](e.target.value)} placeholder="Global Search" />
      </span>
    );
  }

  const header2 = renderHeader('globalFilter2');
  const statusFilter = <Dropdown value={selectedStatus} options={statuses} onChange={(e) => setSelectedStatus(e.value)} placeholder="Select a Status" className="p-column-filter" showClear />;

  return {
    statusFilter,
    header2,
    renderHeader,
    statusBodyTemplate,
    DoctorBodyTemplate,
    cityBodyTemplate,
    NameBodyTemplate,
    statuses,
    dataTableFuncMap,
    selectedStatus,
    setSelectedStatus,
    globalFilter3,
    setGlobalFilter3,
    globalFilter2,
    setGlobalFilter2,
    globalFilter1,
    customers,
    DeleteBodyTemplate,
    toast,
    setData,
    profileBodyTemplate
  }

}