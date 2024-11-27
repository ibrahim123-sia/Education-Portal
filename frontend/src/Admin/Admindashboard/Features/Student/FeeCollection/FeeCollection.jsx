import React, { useEffect,useState } from 'react';
import './FeeCollection.css';
import axios from 'axios';

const FeeCollection = () => {
    const [StudentID, setStudentID] = useState('');
    const [TotalFee, setTotalFee] = useState(0);
    const [PaidAmount, setPaidAmount] = useState(0);
    const [RemainingBalance, setRemainingBalance] = useState(0);
    const [PaymentDate, setPaymentDate] = useState('');
    
    
    const handleChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case 'StudentID':
                setStudentID(value);
                break;
            case 'TotalFee':
                setTotalFee(parseFloat(value));
                break;
            case 'PaidAmount':
                const paid = parseFloat(value);
                setPaidAmount(paid);
                setRemainingBalance(TotalFee - paid);
                break;
            
            case 'PaymentDate':
                setPaymentDate(value);
                break;
            default:
                break;
        }
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const PaymentStatus =
            PaidAmount === TotalFee
                ? 'Paid'
                : PaidAmount > 0 && PaidAmount < TotalFee
                ? 'Partially Paid'
                : 'Unpaid';
    
        try {
            const response = await axios.post('http://localhost:5000/FeeCollection', {
                StudentID,
                TotalFee,
                PaidAmount,
                RemainingBalance,
                PaymentDate,
                PaymentStatus
            });
    
            if (response.status === 200) {
                alert('Form submitted successfully!');
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
            <h1>Fee Collection Form</h1>
            <form onSubmit={handleSubmit}>
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
                        value={RemainingBalance}
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
                                ? 'Paid': 'Unpaid'
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
                    />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default FeeCollection;
