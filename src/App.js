import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Menu from './Menu';
import Accueil from './Accueil';
import Produits from './Produits';

function App() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "samsung tv",
      description: "Description samsung ...",
      price: 1200.99,
      category: "4k"
    },
    {
      id: 2,
      name: "LG tv",
      description: "Description LG ...",
      price: 1000.99,
      category: "HDR"
    },
    {
      id: 3,
      name: "Bravia tv",
      description: "Description Bravia ...",
      price: 4555.99,
      category: "8k"
    },
  ]);


  function updateProductName(productId, newName, newDescription, newPrice, newCategory) {
    setProducts(prevProducts => {
      return prevProducts.map(product => {
        if (product.id === productId) {
          return {
            ...product,
            name: newName,
            description: newDescription,
            price: newPrice,
            category: newCategory
          };
        }
        return product;
      });
    });
  }


  return (
    <BrowserRouter>
    <div className="container">
      <Menu />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route
          path="/accueil" 
          element={<Accueil />}
        />
        <Route
          path="/produits"
          element={<Produits products={products} updateProductName={updateProductName} />}
        />
      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;
