import React, { useEffect } from 'react';

import './style.css';
import Sidebar from '../../Component/Sidebar';
import Project from '../../Component/Project';

function ProjectsPage() {
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
      <Project />
    </>
  );
}

export default ProjectsPage;
