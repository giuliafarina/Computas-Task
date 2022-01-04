import React from "react";
import Product from './Product';
import products from './products';
import inventory from './inventory';
import { useState } from 'react/cjs/react.development';
import styles from "./product-container.module.css";

function ProductContainer() {



    products.forEach(product => {
        product.contain_articles.forEach(article => {
            //mapping through the inventory list to find matching ids
            let matchingArticles = inventory.filter(inventoryItem => inventoryItem.art_id === article.art_id)
            //assigning property "name" to article
            article.name = matchingArticles[0].name
        })

    })


    const [num, setNum] = useState(inventory);
    const setArticleStock = (art_id, newStock) => {
        const newInventory = [...num];
        const item = newInventory.find((item) => item.art_id === art_id);
        item.stock = newStock;
        setNum(newInventory);
    }


    return <>
        <h1 className={styles.header}>Products</h1>
        <div className={styles.container}>
            {products.map(product => <Product key={product.id}
                name={product.name}
                contain={product.contain_articles}
                inventory={num}
                updateStock={setArticleStock}
            />)}
        </div>
    </>
}
export default ProductContainer;