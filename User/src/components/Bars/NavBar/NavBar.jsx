import React, { Component } from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router';
export function NavBar() {
  const navigate = useNavigate()
  const items = [
    {
      label: 'Activities',
      icon: 'pi pi-palette',
      items: [
        {
          label: 'List of Activities',
          icon: 'pi pi-palette',
          command: () => {
            navigate('/activity')
          }
        }
      ]
    },
    {
      label: 'Quit',
      icon: 'pi pi-fw pi-power-off'
    }
  ];

  const start = <img alt="logo" src="showcase/images/logo.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} height="40" className="p-mr-2"></img>;
  const end = <InputText placeholder="Search" type="text" />;

  return (
    <div>
      <div className="card">
        <Menubar model={items} start={start} />
      </div>
    </div>
  );
}
