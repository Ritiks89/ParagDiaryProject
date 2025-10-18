import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button, Typography } from "@mui/material";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Link } from "react-router-dom";

const DistributorList = ({ data = [] }) => {
  // Template for the "Update Rate" column
  const updateRateTemplate = (rowData) => {
    return (
      <Link to={`/distributor/item-rates-detail/${rowData?.id}`}>
        <Button
          variant="contained"
          size="small"
          color="primary"
          sx={{
            textTransform: "none",
            borderRadius: "8px",
            fontSize: "0.8rem",
            padding: "4px 10px",
          }}
        >
          Update Rate
        </Button>
      </Link>
    );
  };

  return (
    <div>
      <DataTable
        value={data}
        responsiveLayout="scroll"
        stripedRows
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column field="partyCode" header="Party Code" />
        <Column field="name" header="Name" />
        <Column field="mobile" header="Mobile" />
        <Column field="route" header="Route" />
        <Column field="openingBalance" header="Opening Balance" />
        <Column field="email" header="Login ID" />
        <Column
          header="Action"
          body={updateRateTemplate}
          style={{ width: "150px", textAlign: "center" }}
        />
      </DataTable>
    </div>
  );
};

export default DistributorList;
