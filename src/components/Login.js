import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { auth, googleProvider, microsoftProvider, githubProvider, yahooProvider } from '../firebase';
import { linkWithCredential, fetchSignInMethodsForEmail, signInWithPopup } from 'firebase/auth';
import YahooIcon from '../assets/yahoo.svg';
import './Login.css';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState('');
  const { loginWithGoogle, loginWithMicrosoft, loginWithGithub, loginWithYahoo, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  async function handleLogin(loginFunction, providerName, provider) {
    try {
      setLoading(true);
      setProvider(providerName);

      const loadingToast = toast.loading(`Signing in with ${providerName}...`);

      await loginFunction();

      toast.dismiss(loadingToast);
      toast.success(`Successfully signed in with ${providerName}!`);
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to log in:', error);

      if (error.code === 'auth/account-exists-with-different-credential') {
        await handleAccountExistsError(error, provider, providerName);
      } else {
        toast.error(`Failed to sign in with ${providerName}. ${getErrorMessage(error.code)}`);
      }
    }
    setLoading(false);
    setProvider('');
  }

  async function handleAccountExistsError(error, _newProvider, newProviderName) {
    try {
      // Get the email of the account that already exists
      const email = error.customData.email;

      // Get existing sign-in methods for this email
      const methods = await fetchSignInMethodsForEmail(auth, email);
      const existingProvider = methods[0];

      let existingProviderName = 'unknown provider';
      if (existingProvider.includes('google')) existingProviderName = 'Google';
      else if (existingProvider.includes('microsoft')) existingProviderName = 'Microsoft';
      else if (existingProvider.includes('github')) existingProviderName = 'GitHub';
      else if (existingProvider.includes('yahoo')) existingProviderName = 'Yahoo';

      // Show confirmation dialog
      const userConfirmed = window.confirm(
        `An account with email ${email} already exists with ${existingProviderName}. ` +
        `Would you like to link your ${newProviderName} account to it and sign in?`
      );

      if (userConfirmed) {
        // Get the existing provider
        let existingProviderObj;
        if (existingProvider.includes('google')) existingProviderObj = googleProvider;
        else if (existingProvider.includes('microsoft')) existingProviderObj = microsoftProvider;
        else if (existingProvider.includes('github')) existingProviderObj = githubProvider;
        else if (existingProvider.includes('yahoo')) existingProviderObj = yahooProvider;

        // Sign in with the existing provider first
        const loadingToast = toast.loading('Linking accounts...');
        const result = await signInWithPopup(auth, existingProviderObj);

        // Link the new credential to the existing account
        const credential = error.credential;
        await linkWithCredential(result.user, credential);

        toast.dismiss(loadingToast);
        toast.success(`Successfully linked ${newProviderName} account and signed in!`);
        navigate('/dashboard');
      } else {
        toast.error('Sign in cancelled. Please use your existing provider to sign in.');
      }
    } catch (linkError) {
      console.error('Error linking accounts:', linkError);
      toast.error('Failed to link accounts. Please try signing in with your existing provider.');
    }
  }

  function getErrorMessage(errorCode) {
    switch (errorCode) {
      case 'auth/popup-closed-by-user':
        return 'Sign in was cancelled.';
      case 'auth/popup-blocked':
        return 'Pop-up was blocked. Please allow pop-ups and try again.';
      case 'auth/cancelled-popup-request':
        return 'Sign in was cancelled.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      default:
        return 'Please try again.';
    }
  }

  async function handleGoogleLogin() {
    await handleLogin(loginWithGoogle, 'Google', googleProvider);
  }

  async function handleMicrosoftLogin() {
    await handleLogin(loginWithMicrosoft, 'Microsoft', microsoftProvider);
  }

  async function handleGithubLogin() {
    await handleLogin(loginWithGithub, 'GitHub', githubProvider);
  }

  async function handleYahooLogin() {
    await handleLogin(loginWithYahoo, 'Yahoo', yahooProvider);
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome</h2>
        <p>Firebase Auth Demo</p>
        <div className="login-buttons">
          <button
            className='si-material-button'
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <div className='si-material-button-state'></div>
            <div className='si-material-button-content-wrapper'>
              <div className='si-material-button-icon'>
                <svg
                  version='1.1'
                  viewBox='0 0 48 48'
                  style={{ display: 'block' }}
                  width='18'
                  height='18'
                >
                  <path fill='#EA4335' d='M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z' />
                  <path fill='#4285F4' d='M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z' />
                  <path fill='#FBBC05' d='M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z' />
                  <path fill='#34A853' d='M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z' />
                  <path fill='none' d='M0 0h48v48H0z' />
                </svg>
              </div>
              <span className='si-material-button-contents'>
                {loading && provider === 'google' ? 'Signing in...' : 'Sign in with Google'}
              </span>
              <span style={{ display: 'none' }}>Sign in with Google</span>
            </div>
          </button>

          <button
            className='si-material-button'
            onClick={handleMicrosoftLogin}
            disabled={loading}
          >
            <div className='si-material-button-state'></div>
            <div className='si-material-button-content-wrapper'>
              <div className='si-material-button-icon'>
                <svg
                  version='1.1'
                  viewBox='0 0 48 48'
                  style={{ display: 'block' }}
                  width='18'
                  height='18'
                >
                  <rect x="3" y="3" width="20" height="20" fill="#f25022" />
                  <rect x="25" y="3" width="20" height="20" fill="#7fba00" />
                  <rect x="3" y="25" width="20" height="20" fill="#00a4ef" />
                  <rect x="25" y="25" width="20" height="20" fill="#ffb900" />
                </svg>
              </div>
              <span className='si-material-button-contents'>
                {loading && provider === 'microsoft' ? 'Signing in...' : 'Sign in with Microsoft'}
              </span>
              <span style={{ display: 'none' }}>Sign in with Google</span>
            </div>
          </button>

          <button
            className='si-material-button'
            onClick={handleGithubLogin}
            disabled={loading}
          >
            <div className='si-material-button-state'></div>
            <div className='si-material-button-content-wrapper'>
              <div className='si-material-button-icon'>
                <svg
                  version='1.1'
                  viewBox='0 0 24 24'
                  style={{ display: 'block' }}
                  width='18'
                  height='18'
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
              <span className='si-material-button-contents'>
                {loading && provider === 'github' ? 'Signing in...' : 'Sign in with GitHub'}
              </span>
              <span style={{ display: 'none' }}>Sign in with GitHub</span>
            </div>
          </button>

          <button
            className='si-material-button'
            onClick={handleYahooLogin}
            disabled={loading}
          >
            <div className='si-material-button-state'></div>
            <div className='si-material-button-content-wrapper'>
              <div className='si-material-button-icon'>
                <img src={YahooIcon} alt="Yahoo Icon" width="18" height="18" />
              </div>
              <span className='si-material-button-contents'>
                {loading && provider === 'yahoo' ? 'Signing in...' : 'Sign in with Yahoo'}
              </span>
              <span style={{ display: 'none' }}>Sign in with Yahoo</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
