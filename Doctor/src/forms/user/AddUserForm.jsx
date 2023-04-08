import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useAddUserForm } from '../../hooks/Users/addUser';
import { RadioButton } from 'primereact/radiobutton';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Password } from 'primereact/password';
export const AddUserForm = () => {
  const { formData, handleInputChange, setFormData, handleSubmit, toast } = useAddUserForm();

  return (
    <div className="p-fluid p-formgrid p-grid">
      <div className="p-field p-col-12 p-md-4">
        <label htmlFor="nationalId">National ID*</label>
        <InputText id="nationalId" name="nationalId" value={formData.nationalId} onChange={handleInputChange} required />
      </div>

      <div className="p-field p-col-12 p-md-4">
        <label htmlFor="fullName">Full Name*</label>
        <InputText id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
      </div>


      <div className="p-field p-col-12 p-md-4">
        <label htmlFor="email">Email*</label>
        <InputText id="email" name="email" value={formData.email} onChange={handleInputChange} required />
      </div>
      <div className="p-field p-col-12 p-md-4">
        <label htmlFor="email">phone*</label>
        <InputMask id="phone" name="phone" value={formData.phone} onChange={handleInputChange} mask="05?9-999-9999" required />
      </div>

      <div className="p-field p-col-12 p-md-4">
        <label htmlFor="password">Password*</label>
        <Password value={formData.password} onChange={handleInputChange} required name='password' id='pawssowrd' />
      </div>

      <div className="p-field p-col-12 p-md-4">
        <label htmlFor="gender">Gender*</label>
        <div className="p-formgroup-inline">
          <div className="p-field-radiobutton">
            <RadioButton inputId="male" name="gender" value="male" onChange={handleInputChange} checked={formData.gender === 'male'} required />
            <label htmlFor="male">male</label>
          </div>
          <div className="p-field-radiobutton">
            <RadioButton inputId="female" name="gender" value="female" onChange={handleInputChange} checked={formData.gender === 'female'} required />
            <label htmlFor="female">female</label>
          </div>
        </div>
      </div>

      <div className="p-field p-col-12 p-md-4">
        <label htmlFor="birthdate">Birthdate*</label>
        <Calendar id="birthdate" name="birthdate" value={formData.birthdate} onChange={(e) => setFormData({ ...formData, birthdate: e.value })} required dateFormat="dd/mm/yy" yearRange="1900:2030" />
      </div>

      <div className="p-field p-col-12 p-md-4">
        <label htmlFor="address">address*</label>
        <InputText id="address" name="address" value={formData.address} onChange={handleInputChange} required dateFormat="dd/mm/yy" yearRange="1900:2030" />
      </div>

      <div className="p-field p-col-12">
        <Button label="Submit" icon="pi pi-user-plus" className="p-button-success" onClick={handleSubmit} />
      </div>
      <Toast ref={toast} />
    </div>
  );
};