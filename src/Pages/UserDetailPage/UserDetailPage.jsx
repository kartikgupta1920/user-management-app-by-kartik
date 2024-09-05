import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserForm from '../../Components/UserForm/UserForm';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
import styles from '../UserDetailPage/UserDetailPage.module.css';

const UserDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        setUser(response.data);
      } catch (err) {
        setError('Failed to fetch user.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      navigate('/');
    } catch (error) {
      setError('Failed to delete user.');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      {user && (
        <>
          <UserForm user={user} onSuccess={() => navigate('/')} />
          <button onClick={handleDelete} className={styles.deleteButton}>
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default UserDetailPage;
