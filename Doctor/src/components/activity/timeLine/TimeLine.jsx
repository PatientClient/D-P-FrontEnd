import React from 'react';
import { Timeline } from 'primereact/timeline';
import { Dialog } from 'primereact/dialog';
import { statuses } from '../../../globalData';

export function TimeLine() {


  return (
    <div className="card">
      <div className="card">
        <Timeline value={statuses} content={(item) => item}
          className={(item, index) => index === 1 ? 'reached-point' : null} />
      </div>
    </div>
  )
}
