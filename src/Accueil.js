import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Accueil = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/accueil');
  }, [navigate]);
  return (
    <div>
      <h1 className="mt-4">Welcome to the Home Page</h1>
    </div>
  );
}

export default Accueil;