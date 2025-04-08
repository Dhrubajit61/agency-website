import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const apiUrl = "http://127.0.0.1:8000";

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("access_token"); // ⚠️ For now using localStorage

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(`${apiUrl}/api/user-info`, {
          headers: {
            Authorization: `Bearer ${token}`, // 🔐 Send token in header
          },
        });

        console.log("User info:", response.data);

        if (!response.data.valid) {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error validating token:", error);
        navigate("/login");
      }
    };

    checkToken();
  }, [navigate]);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard! You are authenticated.</p>
    </div>
  );
};

export default Dashboard;
