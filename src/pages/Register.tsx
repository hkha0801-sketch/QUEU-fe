import React from "react";
 
const Register: React.FC = () => {
  return (
    <div className="auth-layout">
      <div className="auth-left">
        <img src="/Logo.png" alt="QUEU" className="auth-logo" />
        <p className="auth-tagline">Get Started with Us</p>
        <p className="auth-tagline-sub">Complete these easy steps to register your account.</p>
        <div className="auth-steps">
          <div className="auth-step">
            <span className="auth-step-num">1</span>
            Sign up your account
          </div>
          <div className="auth-step">
            <span className="auth-step-num">2</span>
            Set up your information
          </div>
          <div className="auth-step">
            <span className="auth-step-num">3</span>
            Set up your profile
          </div>
        </div>
      </div>

        

 
      <div className="auth-right">
        <h2 className="auth-title">Sign Up Account</h2>
        <p className="auth-subtitle">Enter your personal data to create your account.</p>
 
        <div className="auth-social">
          <button className="auth-social-btn">
            <img src="https://www.google.com/favicon.ico" alt="Google" width={18} />
            Google
          </button>
          <button className="auth-social-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.165c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            Github
          </button>
        </div>
 
        <div className="auth-divider">
          <span />
          <p>or</p>
          <span />
        </div>
 
        <div className="auth-form">
          <div className="auth-row">
            <div className="auth-field">
              <label>First Name</label>
              <input type="text" placeholder="eg. Khoi" />
            </div>
            <div className="auth-field">
              <label>Last Name</label>
              <input type="text" placeholder="eg. Anh" />
            </div>
          </div>
 
          <div className="auth-field">
            <label>Email</label>
            <input type="email" placeholder="khoicoder1@gmail.com" />
          </div>
 
          <div className="auth-field">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
            <small>Must be at least 8 characters.</small>
          </div>
 
          <button className="auth-submit">Sign Up</button>
 
          <p className="auth-switch">
             Already have an account? <a href="/login">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};
 
export default Register;
 
