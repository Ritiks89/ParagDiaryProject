import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const ProductList = ({ data = [] }) => {
  return (
    <DataTable value={data} responsiveLayout="scroll">
      <Column field="productCode" header="Product Code" />
      <Column field="productName" header="Product Name" />
      <Column field="rate" header="Rate" />
      <Column field="gst" header="GST (%)" />
      <Column field="unit" header="Unit" />
      <Column field="crate" header="Crate" />
    </DataTable>
  );
};

export default ProductList;
