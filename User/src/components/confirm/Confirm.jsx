import React, { useRef, useState } from 'react';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

export function Confirm({ severityColor, message, lableMessage, accept, reject }) {
  const [visible, setVisible] = useState(false);
  const toast = useRef(null);
  const buttonEl = useRef(null);

  return (
    <>
      <Toast ref={toast} />
      <ConfirmPopup target={buttonEl.current} visible={visible} onHide={() => setVisible(false)}
        message={`${message} ?`} icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
      <div className="card flex justify-content-center">
        <Button ref={buttonEl} severity={severityColor} onClick={() => setVisible(true)} icon="pi pi-check" label={lableMessage} />
      </div>
    </>
  )
}
