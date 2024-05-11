import { React,useEffect, useState } from "react";

function Product({ id }) {
    const [productDetails,setProductDetails] = useState([])

    useEffect(() => {
        const fetchProductData = async() => {
            try {
                const res = await fetch(`https://fakestoreapi.com/products/${id}`)
                const data = await res.json();
                console.log(data)
                setProductDetails(data)

            }catch(error) {
                console.log(error)

            }
        } 
        fetchProductData()
    },[])
    return(

        <div className="product-list">
           
            {
                productDetails && 
                <>
                <h2>{productDetails.title}</h2>
                <img src={productDetails.image} />
                <h2>{productDetails.price}</h2>
                </>
            }
            
        </div>
    )

}

export default Product