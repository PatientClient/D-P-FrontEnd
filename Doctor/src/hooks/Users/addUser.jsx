











import { useState, useRef } from 'react';
import useApi from '../useApi';
import { useSelector } from 'react-redux';
import useApiRequest from '../useApiRequest';

export const useAddUserForm = () => {
  const loggedIn = useSelector((state) => state.auth)
  const { data: doctor } = useApi("/doctor/signedInDoctor", "POST", { token: JSON.parse(localStorage.getItem("token")) });
  const { request } = useApiRequest()
  const [formData, setFormData] = useState({
    nationalId: '',
    fullName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    gender: '',
    birthdate: '',
    doctor: ''
  });

  const toast = useRef(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(doctor);
    setFormData({ ...formData, ["doctor"]: doctor.doctor._id });
    if (validateForm()) {
      try {
        // submit form data to the server
        console.log(formData);
        const res = await request("/user", "POST", formData)
        if (res.error) {
          throw new Error(res)
        }
        // show success message
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'User added successfully!', life: 3000 });
        // clear form data
        setFormData({
          nationalId: '',
          fullName: '',
          email: '',
          password: '',
          phone: '',
          address: '',
          gender: '',
          birthdate: '',
        });
      } catch (error) {
        throw new Error(error)
      }
      
    } else {
      // show error message
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please fill all required fields!', life: 3000 });
      console.log(formData);
    }
  };


  const validateForm = () => {
    return (
      formData.nationalId &&
      formData.fullName &&
      formData.email &&
      formData.password &&
      formData.phone &&
      formData.address &&
      formData.gender &&
      formData.birthdate &&
      formData.doctor
    );
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
    toast,
    setFormData
  };
};
