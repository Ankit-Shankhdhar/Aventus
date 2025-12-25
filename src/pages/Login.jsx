import React from 'react';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import styles from '../styles/Login.module.css';

const Login = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if(!email || !password){
            setError('Please fill in all required fields.');
            return;
        }
        
        try{
            setIsLoading(true);

            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
            if(!res.ok){  
                const errBody = await res.json().catch(() => ({}));
                throw new Error(errBody.message || 'Login failed');
            }  

            const data = await res.json();
            console.log('Login successful:', data);

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/admin/dashboard');
        }catch(err){
            setError('An error occurred. Please try again.');
        }finally{
            setIsLoading(false);
        }
    };

  return (
    <div className={styles.container}>
      <NavBar />
      <main className={styles.main}>
        <div className={styles.card}>
          {/* Header */}
          <div className={styles.header}>
            <h1 className={styles.title}>Welcome Back</h1>
            <p className={styles.subtitle}>Sign in to access your account</p>
          </div>

          {/* Form */}
          <form className={styles.form} onSubmit={handleSubmit}>
            {error && (
              <div style={{
                padding: '12px 16px',
                backgroundColor: '#fee2e2',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                color: '#991b1b',
                fontSize: '14px',
                marginBottom: '16px'
              }}>
                {error}
              </div>
            )}

            {/* Email */}
            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <div className={styles.inputWrap}>
                <Mail className={styles.inputIcon} size={16} />
                <input
                  type="email"
                  className={styles.input}
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div className={styles.field}>
              <label className={styles.label}>
                Password
                <button
                  type="button"
                  className={styles.linkRight}
                  onClick={() => {}}
                >
                  Forgot password?
                </button>
              </label>
              <div className={styles.inputWrap}>
                <Lock className={styles.inputIcon} size={16} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={styles.input}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPassword((p) => !p)}
                >
                  {showPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
            </div>

            {/* Primary button */}
            <button type="submit" className={styles.primaryBtn} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  Sign In
                  <span className={styles.arrow}>→</span>
                </>
              )}
            </button>

            <style>{`
              @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
            `}</style>

            {/* Social buttons */}

            <p className={styles.disclaimer}>
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
