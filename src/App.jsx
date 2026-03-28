import { Routes, Route } from 'react-router-dom';
import NewHome from './components/NewHome';
import CaseSelection from './components/CaseSelection';
import StartupDetail from './components/StartupDetail';
import Auth from './components/Auth';
import AdminPanel from './components/AdminPanel';
import UserPanel from './components/UserPanel';
import AdminDashboard from './components/admin/Dashboard';
import UserManagement from './components/admin/UserManagement';
import CaseManagement from './components/admin/CaseManagement';
import AuditLogs from './components/admin/AuditLogs';
import AdminSettings from './components/admin/Settings';
import UserDashboard from './components/user/Dashboard';
import MyCases from './components/user/MyCases';
import SubmitCase from './components/user/SubmitCase';
import Notifications from './components/user/Notifications';
import UserSettings from './components/user/Settings';
import './index.css';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<NewHome />} />
      <Route path="/cases" element={<CaseSelection />} />
      <Route path="/startup/:id" element={<StartupDetail />} />
      <Route path="/auth" element={<Auth />} />
      
      <Route path="/admin" element={<AdminPanel />}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="cases" element={<CaseManagement />} />
        <Route path="logs" element={<AuditLogs />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
      
      <Route path="/user" element={<UserPanel />}>
        <Route index element={<UserDashboard />} />
        <Route path="cases" element={<MyCases />} />
        <Route path="submit" element={<SubmitCase />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="settings" element={<UserSettings />} />
      </Route>
    </Routes>
  );
}
