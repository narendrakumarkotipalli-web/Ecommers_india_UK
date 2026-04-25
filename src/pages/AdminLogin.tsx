import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, LogIn } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import './AdminLogin.css';

const AdminLogin: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  useDocumentTitle('Admin Portal');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleAutoFill = () => {
    setEmail('admin@karyaclothing.com');
    setPassword('karya_admin_2026');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@karyaclothing.com' && password === 'karya_admin_2026') {
      onLogin();
      navigate('/kavya-clothing/admin/dashboard');
    } else {
      alert('Invalid credentials. Hint: Use Auto-fill.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h2>KARYA <span>ADMIN</span></h2>
          <p>Access your collection management dashboard</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <User size={18} />
            <input 
              type="email" 
              placeholder="Admin Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="input-group">
            <Lock size={18} />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="login-btn">
            <LogIn size={18} /> Login
          </button>
        </form>

        <div className="divider"><span>OR</span></div>

        <button className="autofill-btn" onClick={handleAutoFill}>
          Auto-fill Mock Credentials
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
