// src/pages/Dashboard.jsx
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Dashboard = () => {
  const { role } = useAuth();

  const handleRead = async () => {
    try {
      const res = await axios.get("/api/data/read");
      alert(res.data.message);
    } catch (err) {
      alert("Read failed");
    }
  };

  const handleWrite = async () => {
    try {
      const res = await axios.post("/api/data/write");
      alert(res.data.message);
    } catch (err) {
      alert(err.response.data.message || "Write failed");
    }
  };

  return (
    <div>
      <h2>Welcome, {role}</h2>
      <button onClick={handleRead}>🔍 Read Access</button>
      <button onClick={handleWrite}>✍️ Write Access</button>
    </div>
  );
};

export default Dashboard;
