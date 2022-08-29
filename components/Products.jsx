import styles from "../styles/Products.module.css";

const Products = ({ products }) => {
  const getImageUrl = (product) => {
    return product[0].replace("{transformations}", "f_auto,q_auto,c_fit");
  };
  return (
    <div className={styles.productList}>
      {products.map((product) => {
        return (
          <div key={product.id}>
            <a
              href={`https://www.dm.de/p${product.gtin}.html`}
            >
              <div className={styles.productPreview}>
                <img
                  className={styles.productImg}
                  src={getImageUrl(product.imageUrlTemplates)}
                  layout="fill"
                  objectFit="contain"
                />
                <p>{product.title}</p>
              </div>
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
