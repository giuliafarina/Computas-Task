import React from "react";
import styles from "./article.module.css"


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

function Article(props) {
    return <>
        <p className={styles.articles_header}>Articles:</p>
        <ul className={styles.articles_list}>
            {props.articles.map(article => createArticle(article, props.inventory))}
        </ul>
    </>
}

export default Article;