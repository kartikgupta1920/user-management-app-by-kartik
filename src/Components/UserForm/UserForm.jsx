import React, { useState } from 'react';
import axios from 'axios';
import styles from '../UserForm/UserForm.module.css';

const UserForm = ({ user, onSuccess }) => {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (user) {
        await axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
          name,
          email,
          phone,
        });
      } else {
        await axios.post('https://jsonplaceholder.typicode.com/users', {
          name,
          email,
          phone,
        });
      }
      onSuccess();
    } catch (error) {
      console.error('Failed to save user.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
        className={styles.input}
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className={styles.input}
      />
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
        required
        className={styles.input}
      />
      <button type="submit" disabled={loading} className={styles.button}>
        {user ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default UserForm;
