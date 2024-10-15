import React, { useState, useEffect } from "react";
import axios from "axios";
import EmployeeDetailsCSS from "./EmployeeDetails.module.css";
import { FaPen } from "react-icons/fa";

const BankingDetail = () => {
  const [bankingDetails, setBankingDetails] = useState(null);
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountType, setAccountType] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [error, setError] = useState("");
  const [isEditable, setIsEditable] = useState(false);

  // Retrieve logged-in user's ID from local storage
  const user = JSON.parse(localStorage.getItem("user"));
  const loggedInUserID = user?.userID;

  // Fetch banking details for the logged-in user
  useEffect(() => {
    const fetchBankingDetails = async () => {
      try {
        if (loggedInUserID) {
          const response = await axios.get(`http://localhost:5239/api/BankingDetail/${loggedInUserID}`);
          
          if (response.data) {
            const details = response.data;
            setBankingDetails(details);
            setBankName(details.bankName);
            setAccountNumber(details.accountNumber);
            setAccountType(details.accountType);
            setBranchCode(details.branchCode);
          } else {
            setError("No banking details found for this user.");
          }
        } else {
          setError("User ID is missing.");
        }
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred while fetching banking details.");
      }
    };

    fetchBankingDetails();
  }, [loggedInUserID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5239/api/BankingDetail", {
        appUserId: loggedInUserID,
        bankName,
        accountNumber,
        accountType,
        branchCode,
      });

      setIsEditable(false);
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
              onChange={(e) => setBankName(e.target.value)}
              className={EmployeeDetailsCSS.inputField}
              required
              readOnly={!isEditable}
            />
          </div>

          <div className={EmployeeDetailsCSS.inputGroup}>
            <p>
              <strong>Account Number:</strong>
              <FaPen onClick={() => setIsEditable(true)} style={{ cursor: "pointer", marginLeft: "10px" }} />
            </p>
            <input
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
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
              onChange={(e) => setAccountType(e.target.value)}
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
              onChange={(e) => setBranchCode(e.target.value)}
              className={EmployeeDetailsCSS.inputField}
              required
              readOnly={!isEditable}
            />
          </div>
        </div>

        {isEditable && <button type="submit">Submit Banking Details</button>}
      </form>

      {bankingDetails === null && <div>Loading banking details...</div>}
    </div>
  );
};

export default BankingDetail;
