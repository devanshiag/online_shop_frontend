import React, { useState } from 'react';
import axiosInstance from '../api/axiosConfig';
import styles from './RegistrationForm.module.css';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    password: '',
    wallet_balance: '',
  });

  //validations 
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = formData.name ? "" : "Name is required.";
    if (formData.name) {
      const namePattern = /^[A-z][A-z0-9-_]{3,23}$/;
      tempErrors.name = namePattern.test(formData.name) ? "" : "Name must be 3-23 chars long without any special chars.";
    }
    tempErrors.age = formData.age ? "" : "Age is required.";
    if (formData.age < 13|| formData.age > 110){
      tempErrors.age = "Age must be between 13 and 110."
    }
    tempErrors.email = formData.email ? "" : "Email is required.";
    if (formData.email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      tempErrors.email = emailPattern.test(formData.email) ? "" : "Email is not valid.";
    }
    
    if (!formData.password) {
      tempErrors.password = "Password is required.";
    } else {
      if (formData.password.length < 8) {
        tempErrors.password = "Password must be at least 8 characters long.";
      } else if (!/[A-Z]/.test(formData.password)) {
        tempErrors.password = "Password must contain at least one uppercase letter.";
      } else if (!/[!@#$%^&*]/.test(formData.password)) {
        tempErrors.password = "Password must contain at least one special character.";
      } else if (!/[a-z]/.test(formData.password)) {
        tempErrors.password = "Password must contain at least one lowercase character.";
      } else if (!/[0-9]/.test(formData.password)) {
        tempErrors.password = "Password must contain at least one digit.";
      }
    }
    tempErrors.wallet_balance = formData.wallet_balance ? "" : "Wallet balance is required.";
    if (formData.wallet_balance < 0){
      tempErrors.wallet_balance = "Balance cannot be negative."
    }
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  //changes in the form input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };

  //form submission after filling details
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
    try {
      const response = await axiosInstance.post('/', formData);
      console.log(response.data);
      alert('Customer registered successfully!');
      navigate('/customers');
    } catch (error) {
      if (error.response) {
        const responseData = error.response.data;
        console.error(responseData.message || "An error occurred while registering the customer.");
      }
      else{
        console.error(error);
      }
      alert('An error occurred while registering the customer.');
    }
  }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.header}>
        <h1>Register Customer</h1>
      </div>
      <div className={styles.gridContainer}>
      <div className={styles.gridItem}>
        <label className={styles.label}>Name:</label>
        <input
          type="text"
          name="name"
          placeholder='username'
          value={formData.name}
          onChange={handleChange}
          className={styles.input}
          required
        />
        {errors.name && <span className={styles.error}>{errors.name}</span>}

      </div>
      <div className={styles.gridItem}>
        <label className={styles.label}>Age:</label>
        <input
          type="number"
          name="age"
          placeholder='0'
          value={formData.age}
          onChange={handleChange}
          className={styles.input}
          required
        />
        {errors.age && <span className={styles.error}>{errors.age}</span>}

      </div>
      <div  className={styles.gridItem}>
        <label className={styles.label}>Email:</label>
        <input
          type="email"
          name="email"
          placeholder='example@domain.com'
          value={formData.email}
          onChange={handleChange}
          className={styles.input}
          required
        />
        {errors.email && <span className={styles.error}>{errors.email}</span>}

      </div>
      <div  className={styles.gridItem}>
        <label className={styles.label}>Password:</label>
        <input
          type="password"
          name="password"
          placeholder='password'
          value={formData.password}
          onChange={handleChange}
          className={styles.input}
          required
        />
        {errors.password && <span className={styles.error}>{errors.password}</span>}

      </div>
      <div  className={styles.gridItem}>
        <label className={styles.label}>Wallet Balance:</label>
        <input
          type="number"
          name="wallet_balance"
          placeholder='0'
          value={formData.wallet_balance}
          onChange={handleChange}
          className={styles.input}
          required
        />
        {errors.wallet_balance && <span className={styles.error}>{errors.wallet_balance}</span>}

      </div>
      </div>
      <button type="submit" className={styles.button}>Register</button>
    </form>
  );
};

export default RegistrationForm;
