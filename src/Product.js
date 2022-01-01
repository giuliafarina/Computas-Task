import React, { useState } from "react";
import styles from "./product.module.css";




function createArticle(article) {
    return <div key={article.art_id}>
        <p>{article.name}</p>
        <p>{article.amount_of}</p>
    </div>
}

function calculateAvailability(articles, inventory) {
    let newItems = articles.map(article => {
        let items = inventory.filter(inventoryItem => inventoryItem.art_id === article.art_id)
        let inventoryArticle = items[0];
        let availability = Math.floor(inventoryArticle.stock / article.amount_of);
        return availability;
    })
    return Math.min(...newItems);
}

function calculateStock(articles, inventory, newStockFn) {
    articles.map(article => {
        let items = inventory.filter(inventoryItem => inventoryItem.art_id === article.art_id)
        let inventoryArticle = items[0];
        let newStock = inventoryArticle.stock - article.amount_of;
        newStockFn(article.art_id, newStock)
    })


}




function Product(props) {
    const [countProduct, setCountProduct] = useState(calculateAvailability(props.contain, props.inventory));
    // const [countArticle, setCountArticle] = useState(props.contain.map(article => createArticle(article, props.inventory)));
    console.log("inventory", props.inventory)

    return <div className={styles.container}>
        <p>{props.name}</p><button onClick={() => setCountProduct(countProduct - 1)} >Sell 1</button>
        <p>Availability:
            {calculateAvailability(props.contain, props.inventory)}</p>
        <button onClick={() => calculateStock(props.contain, props.inventory, props.updateStock)}>Giulia is the best</button>
        <p>{countProduct}</p>
        <ul>Articles:
            {props.contain.map(article => createArticle(article, props.inventory))}
        </ul>
    </div>
}

export default Product;
