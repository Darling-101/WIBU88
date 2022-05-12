import { createContext } from "react";
import { apiUrl } from "./constants";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";


export const ProductContext = createContext(null);


const ProductContextProvider = ({ children }) => {

  const [product1, setProduct] = useState({})
  const [listProduct, setListProduct] = useState([]);

  const Add = async (data) => {
    try {
      const res = await axios.post(`${apiUrl}/products/create`, data);
      return res.data;
    } catch (error) {
      console.log(error);
      return { success: false, message: error.response.data.message };
    }
  };

  const getAll = async () => {
    try {
      const res = await axios.get(`${apiUrl}/products`);
      setListProduct(res.data.data)
      return res.data;
    } catch (error) {
      console.log(error);
      return { success: false, message: error.response.data.message };
    }
  };

  useEffect(()=>{
    getAll();
  },[])

  const getProductById = async (id) => {
    try {
      const res = await axios.get(`${apiUrl}/products/${id}`)
      setProduct(res.data.data)
      return res.data
    } catch (error) {
      console.log(error);
      return { success: false, message: error.response.data.message };
    }
  };

  const updateProduct = async (id,data)=>{
    try {
      const res = await axios.put(`${apiUrl}/products/update/${id}`,data)
      return res.data
    } catch (error) {
      console.log(error);
      return { success: false, message: error.response.data.message };
    }
  }

  const deleteProduct = async (id) =>{
    try {
      const res = await axios.delete(`${apiUrl}/products/delete/${id}`)
      return res.data
    } catch (error) {
      console.log(error);
      return { success: false, message: error.response.data.message };
    }
  }

  const getProductByCat = async (cat) => {
    try{
      const res = await axios.post(`${apiUrl}/products/home/`, cat);
      return res.data
    }catch(error){
      return { success: false, message: error.response.data.message };
    }
  }


  const value = { Add, getAll,getProductByCat, getProductById, product1,updateProduct,deleteProduct,listProduct };
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export default ProductContextProvider;
