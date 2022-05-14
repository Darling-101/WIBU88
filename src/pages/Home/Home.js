import React from "react";
import { useEffect } from "react";
import Slide from "./components/Slide/Slide";
import Banner from "./components/Banner/Banner";

const categories = [{cat:'new', title: 'Truyện mới cập nhật'}, {cat: 'fantasy', title:'Truyện thanh giả tưởng'}]

function Home() {

  useEffect(()=>{
    window.scroll(0,0);
  },[])
  return (
    <div>
      <Banner/>
      {categories.map((cat, index) =>{
        return <Slide key={index} cat ={cat}/>
      })}
    </div>
  );
}

export default Home;
