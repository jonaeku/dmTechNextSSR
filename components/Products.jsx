import styles from '../styles/Products.module.css'

const Products = (props) => {
    const { productData } = props;
    const getImageUrl = (productData) => {
        return productData[0].replace("{transformations}", "f_auto,q_auto,c_fit")
    }
    return (
        <div className={styles.productList}>
            {
                productData.products.map(element => {
                    return (
                        <a href={`https://www.dm.de/search?query=${element.gtin}&searchType=product`}>
                            <div className={styles.productPreview}>
                                <img className={styles.productImg} src={getImageUrl(element.imageUrlTemplates)} layout='fill'
                                    objectFit='contain' />
                                <p>{element.title}</p>
                            </div>
                        </a>
                    )
                }
                )
            }
        </div>
    );
}

export default Products;