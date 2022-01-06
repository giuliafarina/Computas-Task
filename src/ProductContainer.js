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
            const matchingArticle = inventory.find(inventoryItem => inventoryItem.art_id === article.art_id)
            //assigning property "name" to article
            article.name = matchingArticle.name
        })

    })


    const [updatedInventory, setInventory] = useState(inventory);

    const updateStockCallback = (art_id, newStock) => {
        const newInventory = [...updatedInventory];
        const item = newInventory.find((item) => item.art_id === art_id);
        item.stock = newStock;
        setInventory(newInventory);
    }


    return <>
        <h1 className={styles.header}>Products</h1>
        <div className={styles.container}>
            {products.map(product => <Product key={product.id}
                name={product.name}
                articles={product.contain_articles}
                inventory={updatedInventory}
                updateStockCallback={updateStockCallback}
            />)}
        </div>
    </>
}
export default ProductContainer;