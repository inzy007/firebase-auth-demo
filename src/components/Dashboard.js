import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './Dashboard.css';

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const loadingToast = toast.loading('Signing out...');
      await logout();
      toast.dismiss(loadingToast);
      toast.success('Successfully signed out!');
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
      toast.error('Failed to sign out. Please try again.');
    }
  }

  function getUserAvatar(user) {
    if (user.photoURL) {
      return user.photoURL;
    }

    const seed = encodeURIComponent(user.displayName || user.email || 'default');

    return `https://api.dicebear.com/8.x/initials/png?seed=${seed}&backgroundColor=e0e0e0&radius=50`;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <div className="welcome-card">
          <h2>Welcome back!</h2>
          {currentUser && (
            <div className="user-info">
              <img
                src={getUserAvatar(currentUser)}
                alt="Profile"
                className="profile-image"
              />
              <div className="user-details">
                <p className="user-name">{currentUser.displayName}</p>
                <p className="user-email">{currentUser.email}</p>
              </div>
            </div>
          )}
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-item">
            <h3>📊 Analytics</h3>
            <p>View your analytics data</p>
          </div>

          <div className="dashboard-item">
            <h3>⚙️ Settings</h3>
            <p>Manage your account settings</p>
          </div>

          <div className="dashboard-item">
            <h3>📈 Reports</h3>
            <p>Generate and view reports</p>
          </div>

          <div className="dashboard-item">
            <h3>👥 Team</h3>
            <p>Manage your team members</p>
          </div>
        </div>
      </div>
    </div>
  );
}
