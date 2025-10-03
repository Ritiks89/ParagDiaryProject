import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Typography } from "@mui/material";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const DistributorList = ({ data }) => {
  return (
    <div>
      <DataTable value={data} responsiveLayout="scroll" stripedRows>
        <Column field="partyCode" header="Party Code" />
        <Column field="name" header="Name" />
        <Column field="mobile" header="Mobile" />
        <Column field="route" header="Route" />
        <Column field="openingBalance" header="Opening Balance" />
        <Column field="loginId" header="Login ID" />
        <Column field="password" header="Password" />
      </DataTable>
    </div>
  );
};

export default DistributorList;
