import { createContext, useState, useEffect } from "react";

//import PRODUCTS from '../shop-data'
//import SHOP_DATA from "../shop-data";

import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils"; 

export const CategoriesContext = createContext({
    categoriesMap: [],
});

export const CategoriesProvider = (({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);  // 'categories' is the name of the collection
    // })

    useEffect(() => {
        const getCategoriesMap = async () => { //this is the way to call an async funcion in useEffect
            //console.log('useEffect here00!');
            const categoryMap = await getCategoriesAndDocuments();
            // console.log(categoryMap);
            setCategoriesMap(categoryMap);
        }
        //console.log('useEffect here!');
        
        getCategoriesMap();
    }, []);


    const value = {categoriesMap};
    //console.log('ff');
    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
})