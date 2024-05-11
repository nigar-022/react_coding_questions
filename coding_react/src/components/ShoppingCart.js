import React, { useState, useEffect } from "react";

function ShoppingCart() {
  const [cartData, setcartData] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [sort, setSort] = useState("asc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartResponse = await fetch("https://fakestoreapi.com/carts/2");
        const cartDatas = await cartResponse.json();
        console.log(cartDatas);
        setcartData(cartDatas.products);

        const productDetailsPromise = cartDatas.products.map(
          async (product) => {
            const res = await fetch(
              `https://fakestoreapi.com/products/${product.productId}`
            );
            const productData = await res.json();
            console.log(productData);
            return productData;
          }
        );

        const productDetails = await Promise.all(productDetailsPromise);
        console.log(productDetails);
        setProductDetails(productDetails);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    console.log("select");
    setSort(e.target.value);

    if (e.target.value === "desc") {
      const descData = productDetails.sort((a, b) => b.price - a.price);
      setProductDetails(descData);
    } else {
      const ascData = productDetails.sort((a, b) => a.price - b.price);
      setProductDetails(ascData);
    }
  };
  return (
    <div className="App">
      <header className="">
        <h1>Hello React</h1>
      </header>
      <select value={sort} onChange={handleChange}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      <div className="container">
        <ul>
          {
            productDetails &&
              productDetails.map((product, index) => (
                <li key={index}>
                  <h2>{product.title}</h2>
                  <img src={product.image} />
                  <h3>{product.price}</h3>
                </li>
              ))
            // productData &&
            // productData.map((product) => <Product id={product.productId} key={product.productId}/>)
          }
        </ul>
      </div>
    </div>
  );
}

export default ShoppingCart;
