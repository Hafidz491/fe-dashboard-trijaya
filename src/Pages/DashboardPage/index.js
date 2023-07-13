import React, { useEffect } from 'react';
import Sidebar from '../../Component/Sidebar';
import Dashboard from '../../Component/Dashboard';

function DashboardPage() {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();

      const confirmationMessage = 'Anda yakin ingin meninggalkan halaman?';
      window.confirm();

      event.returnValue = confirmationMessage;

      return confirmationMessage;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  return (
    <>
      <Sidebar />
      <Dashboard />
    </>
  );
}

export default DashboardPage;
