import React, { useState, useEffect } from "react";
import { fetchProducts, getTotalItemsInfo } from "../services/api";
import ProductCard from "../components/ProductCard";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total_items: 0,
    total_sust_level: 0,
  });

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // fetch products data
        const productData = await fetchProducts();
        setProducts(productData);

        // fetch stats for the summary boxes
        const statsData = await getTotalItemsInfo();
        setStats(statsData);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Product Dashboard
      </h1>

      {/* Summary Boxes +++ export styling to .css file*/}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            padding: "20px",
            textAlign: "center",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2>Total Items</h2>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>
            {stats.total_items}
          </p>
        </div>
        <div
          style={{
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            padding: "20px",
            textAlign: "center",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2>Total Sustainability Level</h2>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>
            {stats.total_sust_level}
          </p>
        </div>
        <div
          style={{
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            padding: "20px",
            textAlign: "center",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2>Average Sustainability</h2>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>
            {stats.total_items > 0
              ? (stats.total_sust_level / stats.total_items).toFixed(2)
              : "N/A"}
          </p>
        </div>
        <div
          style={{
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            padding: "20px",
            textAlign: "center",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2>Unique Materials</h2>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>
            {products.length > 0
              ? new Set(products.map((product) => product.material)).size
              : "N/A"}
          </p>
        </div>
      </div>

      {/* Product Cards */}
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
