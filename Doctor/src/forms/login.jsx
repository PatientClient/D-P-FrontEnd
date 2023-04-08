import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useAuth } from "../hooks/auth"
const LoginForm = () => {
  const [nationalId, setNationalId] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth()
  const handleLogin = async () => {
    // Handle login logic here
    // You can access nationalId and password states to get the entered values
    const token = await login(nationalId, password);
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <div className="p-field">
        <label htmlFor="nationalId">National ID</label>
        <InputText
          id="nationalId"
          value={nationalId}
          onChange={(e) => setNationalId(e.target.value)}
        />
      </div>
      <div className="p-field">
        <label htmlFor="password">Password</label>
        <InputText
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button label="Login" onClick={handleLogin} />
    </div>
  );
};

export default LoginForm;
