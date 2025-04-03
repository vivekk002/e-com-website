import AdminLayout from "./components/admin-view/layout";
import AuthLayout from "./components/auth/layout";
import AdminDashboard from "./pages/admin-vieew/dashboard";
import Adminfeatures from "./pages/admin-vieew/features";
import AdminOrdersPage from "./pages/admin-vieew/orders";
import Adminproducts from "./pages/admin-vieew/products";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import { Routes, Route } from "react-router-dom";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/auth/not-fount";
import ShoppingHome from "./pages/shopping-view/Home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingCheckout from "./pages/shopping-view/Checkout";
import ShoppingAccount from "./pages/shopping-view/Account";
import CheckAuth from "./components/common/CheckAuth";
import UnauthPage from "./pages/auth/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function App() {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return <Skeleton className="w-[700px] h-[600px] bg-black rounded" />;
  }

  return (
    <div className="flex flex-col overflow-hidden bg-white w-screen min-h-screen">
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<Adminproducts />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="features" element={<Adminfeatures />} />
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/unauth-page" element={<UnauthPage />} />
      </Routes>
    </div>
  );
}

export default App;
