import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from '../../components/Admin/AdminLayout';
import { UserList } from '../../components/Admin/UserManagement/UserList';
import { ContentList } from '../../components/Admin/ContentManagement/ContentList';
import { ActivityLog } from '../../components/Admin/ActivityMonitoring/ActivityLog';
import { SiteSettings } from '../../components/Admin/Settings/SiteSettings';

export function AdminRoutes() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/users" replace />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/content" element={<ContentList />} />
        <Route path="/activity" element={<ActivityLog />} />
        <Route path="/settings" element={<SiteSettings />} />
      </Routes>
    </AdminLayout>
  );
}