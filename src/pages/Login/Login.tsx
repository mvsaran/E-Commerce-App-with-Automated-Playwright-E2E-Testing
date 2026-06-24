import { useState, type FC } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { ShoppingBag } from 'lucide-react';
import './Login.css';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      login(email);
      setIsLoading(false);
      navigate('/');
    }, 1000);
  };

  return (
    <div className="login-container page-container">
      <div className="login-box glass-panel animate-fade-in">
        <div className="login-header">
          <ShoppingBag size={48} className="logo-icon mb-4 mx-auto" />
          <h2 className="text-center gradient-text">Welcome Back</h2>
          <p className="text-center text-sm mt-4">Sign in to access your cart and complete checkout.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form flex flex-col gap-4">
          <Input 
            label="Email Address" 
            type="email" 
            placeholder="you@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input 
            label="Password" 
            type="password" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <Button type="submit" fullWidth isLoading={isLoading} className="mt-4">
            Sign In
          </Button>
        </form>
        
        <div className="login-footer text-center mt-4 text-sm">
          <p>Don't have an account? <a href="#">Sign up</a></p>
        </div>
      </div>
    </div>
  );
};
