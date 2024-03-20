import React from "react";
import ProductItem from "@/components/ProductItem/productItem";

export default function Item(props){
    return <ProductItem {...props}/>;
}

export async function getStaticPaths() {
    const res = await fetch('http://localhost:4000/api/product/ids')
    const posts = await res.json()
    const paths = posts.map((id) => ({
      params: { id },
    }))
   
    return { paths, fallback: false }
  }

  export async function getStaticProps({ params }) {
    let post="";
    try{
    const res = await fetch(`http://localhost:4000/api/product/${params.id}`)
    if (res.ok) {
        post = await res.json()
      } else if (response.status === 404) {
        const errorData = await res.json();
        alert(errorData.error);
      }
    }
    catch(error){
        console.log('Error:', error);
    }
    return { props: { post } }
  }