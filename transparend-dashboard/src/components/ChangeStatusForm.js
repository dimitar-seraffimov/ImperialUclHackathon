import React, { useState } from "react";
import { changeStatus } from "../services/api";

const ChangeStatusForm = () => {
  const [id, setId] = useState("");
  const [newStatus, setNewStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await changeStatus(id, newStatus);
      console.log("Status changed:", result);
      alert("Status updated successfully!");
    } catch (error) {
      alert("Failed to update status.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Item ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="New Status"
        value={newStatus}
        onChange={(e) => setNewStatus(e.target.value)}
        required
      />
      <button type="submit">Change Status</button>
    </form>
  );
};

export default ChangeStatusForm;
