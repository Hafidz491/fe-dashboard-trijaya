import React, { useEffect } from 'react';

import './style.css';
import Sidebar from '../../Component/Sidebar';
import DetailsProject from '../../Component/DetailsProject';

function DetailsProjectPage() {
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
      <DetailsProject />
    </>
  );
}

export default DetailsProjectPage;
