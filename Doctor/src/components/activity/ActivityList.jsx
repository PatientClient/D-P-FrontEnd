import React, { useState, useEffect } from 'react';
import { DataView } from 'primereact/dataview';
import { useActivityView } from '../../hooks/activity/dataView';
import { Toast } from 'primereact/toast';

export default function ActivityList() {
  const { activities, getSeverity, itemTemplate, header, toast } = useActivityView()
  return (
    <div className="card">
      <DataView value={activities} itemTemplate={itemTemplate} layout='grid' header={header()} />
      <Toast ref={toast} />
    </div>
  )
}
