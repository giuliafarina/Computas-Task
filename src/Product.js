import React from "react";
import styles from "./product.module.css";


function capitalize(input) {
    if (typeof input !== 'string') return ''
    return input.charAt(0).toUpperCase() + input.slice(1)
}

function createArticle(article) {
    return <li key={article.art_id} className={styles.article}>
        <p className={styles.article_details}>{capitalize(article.name)}</p>
        <p className={styles.article_details}>{article.amount_of}</p>
    </li>
}

function calculateAvailability(articles, inventory) {
    const availabilityPerArticle = articles.map(article => {
        const inventoryArticle = inventory.find(inventoryItem => inventoryItem.art_id === article.art_id)
        const articleAvailability = Math.floor(inventoryArticle.stock / article.amount_of);

        return articleAvailability;
    })
    // Math.min can't take a list as an argument, but it takes one or more numbers
    return Math.min(...availabilityPerArticle);
}

function calculateStock(articles, inventory, updateStockCallback) {
    if (calculateAvailability(articles, inventory) > 0) {
        articles.map(article => {
            const inventoryArticle = inventory.find(inventoryItem => inventoryItem.art_id === article.art_id)
            const newStock = inventoryArticle.stock - article.amount_of;
            updateStockCallback(article.art_id, newStock)
        })
    }
}


function Product(props) {
    return <div className={styles.product_wrapper}>
        <h3 className={styles.title}>{props.name}</h3>
        <div className={styles.availability}>
            <h4>Availability:
                {calculateAvailability(props.articles, props.inventory)}
            </h4>
            <button onClick={() => calculateStock(props.articles, props.inventory, props.updateStockCallback)}>
                Sell 1
            </button>
        </div>
        <p className={styles.articles_header}>Articles:</p>
        <ul className={styles.articles_list}>
            {props.articles.map(article => createArticle(article, props.inventory))}
        </ul>
    </div>
}

export default Product;
