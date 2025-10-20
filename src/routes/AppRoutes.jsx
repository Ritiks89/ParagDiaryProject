import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginAuthentication from "@/features/auth/login-authentication";
import ResetPassword from "@/features/auth/reset-password";
import Layout from "@/features/admin/layout";
import DistributorManager from "@/features/admin/manage-distributor-users/manage-list";
import DistributorForm from "@/features/admin/manage-distributor-users/manage-form";
import ProductForm from "@/features/admin/manage-items/manage-form";
import ProductManager from "@/features/admin/manage-items/manage-list";
import DistributorRateUpdate from "@/features/admin/manage-rate";
import ProductManagerSpecialRate from "@/features/admin/manage-rate/manage-list";
import ItemsDistributor from "@/features/distributor/manage-list";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect root path to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* AUTH ROUTES START */}
        <Route path="/login" element={<LoginAuthentication />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* AUTH ROUTES END */}

        <Route path="/distributor" element={<Layout />}>
          <Route index element={<DistributorManager />} />
          <Route path="form" element={<DistributorForm />} />
          <Route path="item-rates" element={<DistributorRateUpdate />} />
          <Route
            path="item-rates-detail/:id"
            element={<ProductManagerSpecialRate />}
          />
        </Route>

        <Route path="/itemList" element={<Layout />}>
          <Route index element={<ProductManager />} />
          <Route path="form" element={<ProductForm />} />
        </Route>

        <Route path="/Items" element={<Layout />}>
          <Route index element={<ItemsDistributor />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
