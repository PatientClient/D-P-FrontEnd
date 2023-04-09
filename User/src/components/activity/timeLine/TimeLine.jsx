import React from 'react';
import { Timeline } from 'primereact/timeline';
import { Dialog } from 'primereact/dialog';
import { statuses } from '../../../globalData';
import { Badge } from 'primereact/badge';

export function TimeLine({ progress }) {

  const customizedMarker = (item) => {
    console.log("progress", progress);
    if (item === progress) {
      return (
        <Badge className="pi pi-check-circle p-badge-lg" severity="success" />
      );
    } else {
      return (
        <Badge className="" severity="danger" />
      );
    }
  };
  return (
    <div className="card">
      <div className="card">
        <Timeline value={statuses}
          content={(item) => item}
          align="alternate"
          marker={customizedMarker}

        />
      </div>
    </div>
  )
}
