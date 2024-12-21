import React, { useState } from 'react';
import './FeeCollection.css';
import axios from 'axios';

const FeeCollection = () => {
    const [ReceiptID, setReceiptID] = useState('');
    const [StudentID, setStudentID] = useState('');
    const [TotalFee, setTotalFee] = useState();
    const [PaidAmount, setPaidAmount] = useState();
    const [RemainingBalance, setRemainingBalance] = useState();
    const [PaymentDate, setPaymentDate] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (value === '') {
            
            switch (name) {
                case 'TotalFee':
                    setTotalFee('');
                    setRemainingBalance('');
                    break;
                case 'PaidAmount':
                    setPaidAmount('');
                    setRemainingBalance('');
                    break;
                case 'StudentID':
                    setStudentID('');
                    break;
                case 'PaymentDate':
                    setPaymentDate('');
                    break;
                default:
                    break;
            }
        } else {
            
            switch (name) {
                case 'StudentID':
                    setStudentID(value);
                    break;
                case 'TotalFee':
                    setTotalFee(value);
                    setRemainingBalance(value - PaidAmount);
                    break;
                case 'PaidAmount':
                    setPaidAmount(value);
                    setRemainingBalance(TotalFee - value);
                    break;
                case 'PaymentDate':
                    setPaymentDate(value);
                    break;
                default:
                    break;
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const date = new Date(PaymentDate);
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear().toString().slice(-2);
        const UniqueReceiptID = `${StudentID}-${month}${year}`;
        setReceiptID(UniqueReceiptID);

        const PaymentStatus =
            PaidAmount === TotalFee
                ? 'Paid'
                : PaidAmount > 0 && PaidAmount < TotalFee
                ? 'Partially Paid'
                : 'Unpaid';

        const AdminID = localStorage.getItem('adminId'); 

        if (!AdminID) {
            alert('AdminID not found in local storage.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/FeeCollection', {
                ReceiptID: UniqueReceiptID,
                StudentID,
                TotalFee,
                PaidAmount,
                RemainingBalance,
                PaymentDate,
                PaymentStatus,
                
            });

            if (response.status === 200) {
                alert('Form submitted successfully!');
                setStudentID('');
                setTotalFee('');
                setPaidAmount('');
                setRemainingBalance('');
                setPaymentDate('');
            } else {
                alert('Failed to submit the form.');
            }
        } catch (error) {
            console.error('Error submitting form:', error.message);
            alert('There was an error submitting the form.');
        }
    };

    return (
        <div className="FC">
            <form onSubmit={handleSubmit}>
                <h1>Fee Collection Form</h1>

                <div className="form-group">
                    <label htmlFor="StudentID">Student ID:</label>
                    <input
                        type="text"
                        name="StudentID"
                        placeholder="e.g., C9-SA-0001"
                        value={StudentID}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="TotalFee">Total Fee:</label>
                    <input
                        type="number"
                        name="TotalFee"
                        placeholder="Enter total fee"
                        value={TotalFee}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="PaidAmount">Paid Amount:</label>
                    <input
                        type="number"
                        name="PaidAmount"
                        placeholder="Enter amount paid"
                        value={PaidAmount}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="RemainingBalance">Remaining Balance:</label>
                    <input
                        type="number"
                        name="RemainingBalance"
                        value={RemainingBalance !== '' ? RemainingBalance : ''}
                        readOnly
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="PaymentStatus">Payment Status:</label>
                    <input
                        type="text"
                        name="PaymentStatus"
                        value={
                            PaidAmount === TotalFee
                                ? 'Paid'
                                : PaidAmount > 0 && PaidAmount < TotalFee
                                ? 'Partially Paid'
                                : 'Unpaid'
                        }
                        readOnly
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="PaymentDate">Payment Date:</label>
                    <input
                        type="date"
                        name="PaymentDate"
                        value={PaymentDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default FeeCollection;
