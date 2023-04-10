import React, { useState, useEffect } from 'react';
import { OrderList } from 'primereact/orderlist';
import useApi from "../../hooks/useApi"
import { Badge } from 'primereact/badge';
import { getBadgeColor } from '../../utils/BadgeColor';

export function Users({ users, setData, title }) {
  const itemTemplate = (item) => {
    const badgeColor = getBadgeColor(item.status)
    return (
      <div className="flex flex-wrap p-2 align-items-center gap-3">
        <img className="w-4rem shadow-2 flex-shrink-0 border-round" src={item.image || "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"} alt={item.fullName} />
        <div className="flex-1 flex flex-column gap-2 xl:mr-8">
          <span className="font-bold">{item.fullName}</span>
          <div className="flex align-items-center gap-2">
            <i className="pi pi-tag text-sm"></i>
            <span>{item?.doctor?.name}</span>
          </div>
        </div>
        <Badge value={item.status} className={`font-bold text-900 p-badge-${badgeColor}`} />
      </div>
    );
  };



  return (
    <div className="card xl:flex xl:justify-content-center">
      <OrderList value={users} onChange={(e) => setData(e.value)} itemTemplate={itemTemplate} header={title} filter filterBy="fullName"></OrderList>    </div>
  )
}