import React, { useEffect, useState } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import DistributorList from "./components/Table";
import { Link } from "react-router-dom";
import { getDistributorApi } from "@/routes/api-routes/dashboardApiRoutes";

const DistributorManager = () => {
  const [distributors, setDistributors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDistributors = async () => {
    try {
      setLoading(true);
      const response = await getDistributorApi();
      setDistributors(response?.data?.data || []); // adjust based on API response
    } catch (error) {
      console.error("Error fetching distributors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDistributors();
  }, []);

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">Distributor List</Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/distributor/form"
        >
          + Add Distributor
        </Button>
      </Box>

      {/* Loader or Table */}
      {loading ? (
        <Box display="flex" justifyContent="center" p={3}>
          <CircularProgress />
        </Box>
      ) : (
        <DistributorList data={distributors} />
      )}
    </Box>
  );
};

export default DistributorManager;
