import React, { useEffect, useState } from 'react';
import {
  FaArrowLeft,
  FaClock,
  FaEnvelope,
  FaLock,
  FaSignOutAlt,
  FaUser,
  FaUserPlus,
  FaUserShield,
  FaUsers,
} from 'react-icons/fa';
import { apiRequest } from '../lib/api';

const goTo = (path) => window.location.assign(path);

const AuthLayout = ({ children }) => (
  <main className="auth-shell">
    <a href="/" className="auth-back-link">
      <FaArrowLeft />
      Portfolio
    </a>
    {children}
  </main>
);

const Login = () => {
  const [role, setRole] = useState('user');
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { user } = await apiRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ ...form, role }),
      });
      goTo(`/dashboard/${user.role}`);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <section className="auth-card" aria-labelledby="login-title">
        <div className="auth-heading">
          <div className="auth-heading-icon">
            {role === 'admin' ? <FaUserShield /> : <FaUser />}
          </div>
          <div>
            <p className="auth-eyebrow">Secure access</p>
            <h1 id="login-title">Sign in</h1>
          </div>
        </div>

        <div className="auth-role-tabs" role="tablist" aria-label="Account type">
          <button
            type="button"
            className={role === 'user' ? 'active' : ''}
            onClick={() => setRole('user')}
          >
            <FaUser /> User
          </button>
          <button
            type="button"
            className={role === 'admin' ? 'active' : ''}
            onClick={() => setRole('admin')}
          >
            <FaUserShield /> Admin
          </button>
        </div>

        <form className="auth-form" onSubmit={submit}>
          <label>
            Email address
            <span className="auth-input-wrap">
              <FaEnvelope />
              <input
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                placeholder="you@example.com"
              />
            </span>
          </label>

          <label>
            Password
            <span className="auth-input-wrap">
              <FaLock />
              <input
                type="password"
                required
                minLength="8"
                autoComplete="current-password"
                value={form.password}
                onChange={(event) => setForm({ ...form, password: event.target.value })}
                placeholder="Enter your password"
              />
            </span>
          </label>

          {error && <p className="auth-error" role="alert">{error}</p>}

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : `Sign in as ${role}`}
          </button>
        </form>

        {role === 'user' && (
          <p className="auth-switch">
            New user? <a href="/register">Create an account</a>
          </p>
        )}
      </section>
    </AuthLayout>
  );
};

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await apiRequest('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      goTo('/dashboard/user');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <section className="auth-card" aria-labelledby="register-title">
        <div className="auth-heading">
          <div className="auth-heading-icon"><FaUserPlus /></div>
          <div>
            <p className="auth-eyebrow">User account</p>
            <h1 id="register-title">Create account</h1>
          </div>
        </div>

        <form className="auth-form" onSubmit={submit}>
          <label>
            Full name
            <span className="auth-input-wrap">
              <FaUser />
              <input name="name" required minLength="2" value={form.name} onChange={update} />
            </span>
          </label>
          <label>
            Email address
            <span className="auth-input-wrap">
              <FaEnvelope />
              <input name="email" type="email" required value={form.email} onChange={update} />
            </span>
          </label>
          <label>
            Password
            <span className="auth-input-wrap">
              <FaLock />
              <input name="password" type="password" required minLength="8" value={form.password} onChange={update} />
            </span>
          </label>

          {error && <p className="auth-error" role="alert">{error}</p>}

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Create user account'}
          </button>
        </form>

        <p className="auth-switch">Already registered? <a href="/login">Sign in</a></p>
      </section>
    </AuthLayout>
  );
};

const Dashboard = ({ requiredRole }) => {
  const [user, setUser] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const session = await apiRequest('/api/auth/me');
        if (session.user.role !== requiredRole) {
          goTo(`/dashboard/${session.user.role}`);
          return;
        }

        const data = await apiRequest(`/api/dashboard/${requiredRole}`);
        setUser(session.user);
        setDashboard(data);
      } catch (requestError) {
        if (requestError.status === 401 || requestError.status === 403) {
          goTo('/login');
          return;
        }
        setError(requestError.message);
      }
    };

    load();
  }, [requiredRole]);

  const logout = async () => {
    await apiRequest('/api/auth/logout', { method: 'POST' });
    goTo('/login');
  };

  if (error) return <AuthLayout><p className="auth-error">{error}</p></AuthLayout>;
  if (!user || !dashboard) return <AuthLayout><p className="dashboard-loading">Loading dashboard...</p></AuthLayout>;

  const isAdmin = requiredRole === 'admin';

  return (
    <main className="dashboard-shell">
      <header className="dashboard-header">
        <a href="/" className="dashboard-brand">Ayush <span>Singh</span></a>
        <div className="dashboard-user">
          <span>{user.name}</span>
          <span className="dashboard-role">{user.role}</span>
          <button type="button" onClick={logout} title="Sign out"><FaSignOutAlt /></button>
        </div>
      </header>

      <section className="dashboard-content">
        <div className="dashboard-title-row">
          <div>
            <p>{isAdmin ? 'Administration' : 'Your account'}</p>
            <h1>{isAdmin ? 'Admin dashboard' : 'User dashboard'}</h1>
          </div>
          {isAdmin ? <FaUserShield /> : <FaUser />}
        </div>

        <div className="dashboard-stats">
          <article>
            <FaEnvelope />
            <span>Email</span>
            <strong>{user.email}</strong>
          </article>
          <article>
            <FaClock />
            <span>Last login</span>
            <strong>{user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : 'First session'}</strong>
          </article>
          {isAdmin && (
            <article>
              <FaUsers />
              <span>Registered users</span>
              <strong>{dashboard.totalUsers}</strong>
            </article>
          )}
        </div>

        {isAdmin ? (
          <section className="dashboard-table-panel">
            <h2>Recent users</h2>
            <div className="dashboard-table-wrap">
              <table>
                <thead><tr><th>Name</th><th>Email</th><th>Joined</th><th>Last login</th></tr></thead>
                <tbody>
                  {dashboard.recentUsers.map((item) => (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td>{item.lastLoginAt ? new Date(item.lastLoginAt).toLocaleString() : 'Never'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : (
          <section className="dashboard-profile-panel">
            <h2>Account ready</h2>
            <p>{dashboard.message}. Your MongoDB-backed user session is active.</p>
          </section>
        )}
      </section>
    </main>
  );
};

const AuthPortal = ({ route }) => {
  if (route === '/register') return <Register />;
  if (route === '/dashboard/admin') return <Dashboard requiredRole="admin" />;
  if (route === '/dashboard/user') return <Dashboard requiredRole="user" />;
  return <Login />;
};

export default AuthPortal;
