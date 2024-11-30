import React, { useState } from "react";
import { addItem } from "../services/api";

const AddItemForm = () => {
  const [status, setStatus] = useState("");
  const [sustLevel, setSustLevel] = useState("");
  const [material, setMaterial] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await addItem(status, parseInt(sustLevel), material);
      console.log("Item added:", result);
      alert("Item added successfully!");
    } catch (error) {
      alert("Failed to add item.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Sustainability Level"
        value={sustLevel}
        onChange={(e) => setSustLevel(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Material"
        value={material}
        onChange={(e) => setMaterial(e.target.value)}
        required
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItemForm;
