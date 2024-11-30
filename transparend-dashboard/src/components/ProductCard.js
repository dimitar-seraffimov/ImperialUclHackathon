import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const ProductCard = ({ product }) => {
  return (
    <Card style={{ maxWidth: 300, margin: "10px" }}>
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography>Materials: {product.materials}</Typography>
        <Typography>Produced: {product.productionDate}</Typography>
        <Typography>
          Sustainability Score: {product.sustainabilityScore}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
