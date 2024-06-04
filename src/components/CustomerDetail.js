import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from '../api/axiosConfig';
import styles from './CustomerList.module.css';
import { useNavigate } from 'react-router-dom';
import { KeycloakContext } from '../KeycloakContext';

const CustomerDetail = () => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const keycloak = useContext(KeycloakContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const email = keycloak.tokenParsed.email; // Ensure the email is included in the token
        console.log(email);
        const response = await axiosInstance.get(`/email/${email}`);
        setCustomer(response.data);
      } catch (error) {
        console.error('Error fetching customer', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomer();
  }, [keycloak]);
  
    const handleDelete = async (id) => {
      try {
        await axiosInstance.delete(`/${id}`);
        setCustomer([]);
        alert('Customer deleted successfully!');
      } catch (error) {
        console.error('Error deleting customer', error);
        alert('An error occurred while deleting the customer.');
      }
    };
  
    const handleEdit = (id) => {
      navigate(`/customers/${id}/edit`);
    };

    if (loading) {
      return <div>Loading...</div>;
    }

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
  {customer ? (
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
  ) : (
    // Optional: Display a message if no customer is found
    <tr>
      <td colSpan="5">No customer data available.</td>
    </tr>
  )}
</tbody>

      </table>
    </div>
  );
};

export default CustomerDetail;