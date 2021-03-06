import React from "react";
import { Button, Typography, CircularProgress } from "@mui/material";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { apiUrl } from "../../context/constants";
import axios from "axios";
import { useState } from "react";
import styles from "./style.module.css";
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import { useSnackbar } from "notistack";
import { AuthContext } from "../../context/AuthContext";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});
function ProductDetail() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState();
  const { addToCart, getCartList } = useContext(CartContext);
  const [cart, setCart] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [fetching, setFetching] = useState(false);
  const [ffetching, setFetchings] = useState(false);
  const navigate = useNavigate();
  const {
    authState: { isAuthenticated },
  } = useContext(AuthContext);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    setCart(cart);
  }, []);

  const getData = async () => {
    try {
      setFetching(true);
      const res = await axios.get(`${apiUrl}/products/${id}`);
      setFetching(false);
      setProduct(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddToCart = async (id) => {
    if (isAuthenticated === true) {
      setFetchings(true);
      await addToCart(id);
      await getCartList();
      setFetchings(false);
      enqueueSnackbar("Th??m v??o gi?? h??ng th??nh c??ng", {
        variant: "success",
        autoHideDuration: 2000,
      });
    } else {
      enqueueSnackbar("????ng nh???p ??i b???n!!", {
        variant: "warning",
        autoHideDuration: 2000,
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (fetching === true) {
    return (
      <div style={{ margin: "400px 50%", minWidth: "100%" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <div className={styles.container}>
        <img src={product?.image} alt="" />
        <div className={styles.right}>
          <p className={styles.name}>{product?.name}</p>
          <Typography mb={"15px"} variant="h4" color={"red"}>
            Gi??:
            {" " +
              new Intl.NumberFormat("de-De", {
                style: "currency",
                currency: "VND",
              }).format(product?.price)}
          </Typography>
          <div className={styles.info}>
            <Typography>
              <b>T??c Gi???: </b> {product?.author}
            </Typography>
            <Typography>
              <b>?????i t?????ng: </b>
              {product?.target}
            </Typography>
            <Typography>
              <b>Khu??n kh???: </b>
              {product?.khuonKho}
            </Typography>
            <Typography>
              <b>S??? trang: </b>
              {product?.soTrang}
            </Typography>
            <Typography>
              <b>Th??? lo???i: </b>
              {product?.categories.map((cate) => {
                return cate + ", ";
              })}
            </Typography>
            <Typography>
              <b>Tr???ng l?????ng: </b>
              {product?.weight}
            </Typography>
            <Typography>
              <b>B??? s??ch: </b>
              {product?.combo}
            </Typography>

            {/* <Typography component="legend" variant="p">
          <b>Y??u th??ch</b>
        </Typography> */}
            <StyledRating
              name="customized-color"
              defaultValue={product?.rating}
              value={3.5}
              precision={0.5}
              icon={<FavoriteIcon fontSize="inherit" />}
              emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            />
          </div>
          <br />
          <div>
            <Button
              onClick={() => handleAddToCart(product._id)}
              fullWidth
              variant="contained"
              style={{ marginTop: "10px" }}
            >
              Th??m v??o gi??? h??ng{" "}
              {ffetching === true ? (
                <CircularProgress
                  style={{
                    marginLeft: "10px",
                    height: "20px",
                    width: "20px",
                    color: "yellow",
                  }}
                />
              ) : (
                <ShoppingCartOutlined sx={{ marginLeft: "10px" }} />
              )}
            </Button>
            <Link to="/reading-trial" style={{textDecoration: 'none'}}>
              <Button
                fullWidth
                variant="contained"
                style={{ marginTop: "10px" }}
              >
                ?????c th??? <MenuBookRoundedIcon sx={{ marginLeft: "10px" }} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <p className={styles.title}>N???i dung</p>
        <p className={styles.des}>{product?.description}</p>
      </div>

      <div className={styles.bottom}>
        <p className={styles.title}>B??nh lu???n</p>
        <p className={styles.des}>Truy???n hay qu??</p>
      </div>
    </div>
  );
}

export default ProductDetail;
