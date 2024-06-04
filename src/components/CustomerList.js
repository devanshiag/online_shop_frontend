import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosConfig';
import styles from './CustomerList.module.css';
import { useNavigate } from 'react-router-dom';


const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axiosInstance.get('/all');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers', error);
      }
    };
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/${id}`);
      setCustomers(customers.filter(customer => customer.id !== id));
      alert('Customer deleted successfully!');
    } catch (error) {
      console.error('Error deleting customer', error);
      alert('An error occurred while deleting the customer.');
    }
  };

  const handleEdit = (id) => {
    navigate(`/customers/${id}/edit`);
  };

  return (
    <div className={styles.container}>
      <h1>Customer List</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Wallet Balance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.age}</td>
              <td>{customer.email}</td>
              <td>{customer.wallet_balance}</td>
              <td>
                <button onClick={() => handleDelete(customer.id)} className={styles.deleteButton}>Delete</button>
                <button onClick={() => handleEdit(customer.id)} className={styles.editButton}>Edit</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
