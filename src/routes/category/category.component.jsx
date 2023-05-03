import { useContext, useState,useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { CategoriesContext } from '../../context/categories.context';
import './category.styles.scss';
import ProductCard from '../../components/product-card/product-card.component';

const Category = () => {
   const {category} = useParams();
   const {categoriesMap} = useContext(CategoriesContext);
   const [products, setProducts] = useState(categoriesMap[category]);

   useEffect(() => {
    setProducts(categoriesMap[category]);
   }, [category, categoriesMap])
   //const products = categoriesMap[category];
   return (
    <Fragment>
        <h2 className='category-title'>{category.toUpperCase()}</h2>
        <div className='category-container'> 
        {  products && //if products is undefined, don't render it
            products.map((product) => (<ProductCard key={product.id} product={product}/>))
        }
    </div>
    </Fragment>
    
   )
}

export default Category;