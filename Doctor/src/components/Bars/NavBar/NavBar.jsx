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
        },
        {
          label: 'New Activity',
          icon: 'pi pi-palette',
          command: () => {
            navigate('/activity/add')
          }
        },
        {
          label: 'Delete Activity',
          icon: 'pi pi-fw pi-trash'
        },
        {
          label: 'Edit Activity',
          icon: 'pi pi-fw pi-trash'
        },
        {
          separator: true
        },
        {
          label: 'Export',
          icon: 'pi pi-fw pi-external-link'
        }
      ]
    },
    {
      label: 'Users',
      icon: 'pi pi-fw pi-user',
      items: [
        {
          label: 'List of users',
          icon: 'pi pi-fw pi-user-plus',
          command: () => {
            navigate('/user')
          }

        },
        {
          label: 'New',
          icon: 'pi pi-fw pi-user-plus',
          command: () => {
            navigate('/user/add')
          }

        },
        {
          label: 'Edit',
          icon: 'pi pi-fw pi-user-plus',

        },
        {
          label: 'Delete',
          icon: 'pi pi-fw pi-user-minus',

        }

      ]
    },
    {
      label: 'Events',
      icon: 'pi pi-fw pi-calendar',
      items: [
        {
          label: 'Edit',
          icon: 'pi pi-fw pi-pencil',
          items: [
            {
              label: 'Save',
              icon: 'pi pi-fw pi-calendar-plus'
            },
            {
              label: 'Delete',
              icon: 'pi pi-fw pi-calendar-minus'
            }
          ]
        },
        {
          label: 'Archieve',
          icon: 'pi pi-fw pi-calendar-times',
          items: [
            {
              label: 'Remove',
              icon: 'pi pi-fw pi-calendar-minus'
            }
          ]
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
