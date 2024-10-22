import React, { useState, useEffect } from "react";
import axios from "axios";
import EmployeeDetailsCSS from "./EmployeeDetails.module.css";
import { FaPen } from "react-icons/fa";
import { useParams } from "react-router-dom";  // Import useParams for getting the employee ID from the route

const BankingDetail = () => {
  const { id } = useParams();  // Get the employee ID from the route
  const [bankingDetails, setBankingDetails] = useState(null);
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountType, setAccountType] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [error, setError] = useState("");
  const [isEditable, setIsEditable] = useState(false);

  // Fetch banking details for the employee using the provided ID
  useEffect(() => {
    const fetchBankingDetails = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:5239/api/employee/${id}`);
          if (response.data) {
            const employee = response.data;
            const details = employee.bankingDetail; // Assuming banking details are inside the employee object
            if (details) {
              setBankingDetails(details);
            } else {
              setError("No banking details found for this employee.");
            }
          } else {
            setError("No employee data found.");
          }
        } else {
          setError("Employee ID is missing.");
        }
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred while fetching banking details.");
      }
    };

    fetchBankingDetails();
  }, [id]);

  useEffect(() => {
    if (bankingDetails) {
      setBankName(bankingDetails.bankName);
      setAccountNumber(bankingDetails.accountNumber);
      setAccountType(bankingDetails.accountType);
      setBranchCode(bankingDetails.branchCode);
    }
  }, [bankingDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5239/api/BankingDetail", {
        appUserId: id, // Send the employee ID
        bankName,
        accountNumber,
        accountType,
        branchCode,
      });

      setIsEditable(false); // Disable editing after successful submission
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while saving banking details.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {error && <div>{error}</div>}
        <h3>Banking Details</h3>
        <div className={EmployeeDetailsCSS.row}>
          <div className={EmployeeDetailsCSS.inputGroup}>
            <p>
              <strong>Bank Name:</strong>
              <FaPen onClick={() => setIsEditable(true)} style={{ cursor: "pointer", marginLeft: "10px" }} />
            </p>
            <input
              value={bankName}
              onChange={isEditable ? (e) => setBankName(e.target.value) : null}
              className={EmployeeDetailsCSS.inputField}
              required
              readOnly={!isEditable} // Read-only if not editable
            />
          </div>

          <div className={EmployeeDetailsCSS.inputGroup}>
            <p>
              <strong>Account Number:</strong>
              <FaPen onClick={() => setIsEditable(true)} style={{ cursor: "pointer", marginLeft: "10px" }} />
            </p>
            <input
              value={accountNumber}
              onChange={isEditable ? (e) => setAccountNumber(e.target.value) : null}
              className={EmployeeDetailsCSS.inputField}
              required
              readOnly={!isEditable}
            />
          </div>
        </div>

        <div className={EmployeeDetailsCSS.row}>
          <div className={EmployeeDetailsCSS.inputGroup}>
            <p>
              <strong>Account Type:</strong>
              <FaPen onClick={() => setIsEditable(true)} style={{ cursor: "pointer", marginLeft: "10px" }} />
            </p>
            <input
              value={accountType}
              onChange={isEditable ? (e) => setAccountType(e.target.value) : null}
              className={EmployeeDetailsCSS.inputField}
              required
              readOnly={!isEditable}
            />
          </div>

          <div className={EmployeeDetailsCSS.inputGroup}>
            <p>
              <strong>Branch Code:</strong>
              <FaPen onClick={() => setIsEditable(true)} style={{ cursor: "pointer", marginLeft: "10px" }} />
            </p>
            <input
              value={branchCode}
              onChange={isEditable ? (e) => setBranchCode(e.target.value) : null}
              className={EmployeeDetailsCSS.inputField}
              required
              readOnly={!isEditable}
            />
          </div>
        </div>

        {isEditable && <button type="submit">Submit Banking Details</button>}
      </form>

      {bankingDetails === null && <div>Banking details not found.</div>}
    </div>
  );
};

export default BankingDetail;
