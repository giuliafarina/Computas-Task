import React from "react";
import Article from "./Article";
import styles from "./product.module.css";



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
        <Article
            articles={props.articles}
            inventory={props.inventory}
        />
    </div>
}

export default Product;
