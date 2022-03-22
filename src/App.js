import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./AppLayouts/Header/Header";

const Home = React.lazy(() => import("./pages/Home/Home"));
const DangKi = React.lazy(() => import("./pages/DangKi/Dangki"));
const DangNhap = React.lazy(() => import("./pages/DangNhap/Dangnhap"));
const Cart = React.lazy(() => import("./pages/Cart/Cart"));
const User = React.lazy(() => import("./pages/UserAccount/User"));
const Products = React.lazy(() => import("./pages/Products/Products"));
const ProductDetail = React.lazy(() =>
  import("./pages/ProductDetail/ProductDetail")
);
const NotFound = React.lazy(() => import("./pages/NotFound/NotFound"));
const Footer = React.lazy(() => import("./AppLayouts/Footer/Footer"));

function App() {
  return (
    <div>
      <Header />
      <Suspense fallback={<h1>Loadding...</h1>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="sign-up" element={<DangKi />} />
          <Route path="sign-in" element={<DangNhap />} />
          <Route path="cart" element={<Cart />} />
          <Route path="user-profile" element={<User />} />
          <Route path="products" element={<Products />}>
            <Route path=":id" element={<ProductDetail />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
