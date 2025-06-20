
import React from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import AdminLogin from '@/components/Admin/AdminLogin';
import AdminPanel from '@/components/Admin/AdminPanel';

const AdminContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-12">
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto">
            <AdminLogin />
          </div>
        ) : (
          <AdminPanel />
        )}
      </main>
    </div>
  );
};

const Admin = () => {
  return (
    <AuthProvider>
      <AdminContent />
    </AuthProvider>
  );
};

export default Admin;
