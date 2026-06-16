import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './UserProfile.css';

const UserProfile = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [saved, setSaved] = useState(false);

  if (!isLoggedIn) return (
    <div className="profile-login-prompt">
      <p>🔐 Please login to view your profile</p>
      <button onClick={() => navigate('/login')}>Login</button>
    </div>
  );

  const handleSave = () => {
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">
          <div className="avatar-circle">{user?.name?.charAt(0)?.toUpperCase()}</div>
        </div>

        <div className="profile-info">
          {editing ? (
            <div className="profile-edit">
              <input value={name} onChange={e => setName(e.target.value)} className="profile-input" placeholder="Your name" />
              <div className="profile-edit-btns">
                <button className="save-btn" onClick={handleSave}>Save Changes</button>
                <button className="cancel-btn" onClick={() => setEditing(false)}>Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <h1 className="profile-name">{name || user?.name}</h1>
              {saved && <p className="profile-saved">✓ Profile updated!</p>}
              <button className="edit-btn" onClick={() => setEditing(true)}>✏️ Edit Name</button>
            </>
          )}
          <p className="profile-email">📧 {user?.email}</p>
        </div>

        <div className="profile-stats">
          <div className="stat-card"><span className="stat-icon">📦</span><strong>0</strong><span>Orders</span></div>
          <div className="stat-card"><span className="stat-icon">❤️</span><strong>0</strong><span>Wishlist</span></div>
          <div className="stat-card"><span className="stat-icon">⭐</span><strong>4.9</strong><span>Rating</span></div>
        </div>

        <div className="profile-actions">
          <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;