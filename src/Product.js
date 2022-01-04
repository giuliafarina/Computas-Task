import React from "react";
import styles from "./product.module.css";


function capitalize(input) {
    if (typeof input !== 'string') return ''
    return input.charAt(0).toUpperCase() + input.slice(1)
}


function createArticle(article) {
    return <div key={article.art_id} className={styles.article}>
        <p className={styles.article_details}>{capitalize(article.name)}</p>
        <p className={styles.article_details}>{article.amount_of}</p>
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
    if (calculateAvailability(articles, inventory) > 0) {
        articles.map(article => {
            let items = inventory.filter(inventoryItem => inventoryItem.art_id === article.art_id)
            let inventoryArticle = items[0];
            let newStock = inventoryArticle.stock - article.amount_of;
            newStockFn(article.art_id, newStock)
        })

    }



}


function Product(props) {

    return <div className={styles.product_wrapper}>
        <h3 className={styles.title}>{props.name}</h3>
        <div className={styles.availability}><h4>Availability:
            {calculateAvailability(props.contain, props.inventory)}</h4>
            <button onClick={() => calculateStock(props.contain, props.inventory, props.updateStock)}>Sell 1</button>
        </div>
        <ul className={styles.articles_list}><p className={styles.articles_header}>Articles:</p>
            {props.contain.map(article => createArticle(article, props.inventory))}
        </ul>
    </div>
}

export default Product;
