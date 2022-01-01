import React, { useState } from "react";
import Product from "./Product";

function ProductContainer(props) {
    return <ul>
        {props.products.map(product => <Product key={product.id}
            name={product.name}
            contain={product.contain_articles}
            inventory={props.inventory}
            updateStock={props.setArticleStock}
        />)}
    </ul>
}

export default ProductContainer;