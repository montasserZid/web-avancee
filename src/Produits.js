import React, { useState, useEffect } from 'react';
import Button from './Button';

const Produits = ({ updateProductName }) => {
  const [updateState, setUpdateState] = useState(-1);
  const [productsList, setProductsList] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductDescription, setNewProductDescription] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(response => response.json())
      .then(data => setProductsList(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  function handleEdit(id) {
    setUpdateState(id);
  }

  function handleUpdate(id, name, description, price, category) {
    console.log('Modification');
    const updatedProducts = productsList.map(product => {
      if (product.id === id) {
        return {
          ...product,
          name: name,
          description: description,
          price: price,
          category: category,
        };
      }
      return product;
    });
    setProductsList(updatedProducts);
    updateProductName(id, name, description, price, category);
    setUpdateState(-1);

    fetch(`http://localhost:5000/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        description: description,
        price: price,
        category: category,
      }),
    })
      .then(response => response.json())
      .then(data => console.log('Updated product:', data))
      .catch(error => console.error('Error updating product:', error));
  }

  function handleDelete(id) {
    console.log('Suppression');
    const updatedProducts = productsList.filter(product => product.id !== id);
    setProductsList(updatedProducts);

    fetch(`http://localhost:5000/products/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => console.log('Deleted product:', data))
      .catch(error => console.error('Error deleting product:', error));
  }

  function handleAdd() {
    setShowAddForm(true);
  }

  function handleAddSubmit(event) {
    event.preventDefault();

    const newProduct = {
      name: newProductName,
      description: newProductDescription,
      price: newProductPrice,
      category: newProductCategory
    };

    fetch('http://localhost:5000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then(response => response.json())
      .then(data => {
        setProductsList(prevProducts => [...prevProducts, data]);
        setNewProductName('');
        setNewProductDescription('');
        setNewProductPrice('');
        setNewProductCategory('');
        setShowAddForm(false);
        console.log('Added product:', data);
      })
      .catch(error => console.error('Error adding product:', error));
  }

  function handleNewProductName(event) {
    setNewProductName(event.target.value);
  }

  function handleNewProductDescription(event) {
    setNewProductDescription(event.target.value);
  }

  function handleNewProductPrice(event) {
    setNewProductPrice(event.target.value);
  }

  function handleNewProductCategory(event) {
    setNewProductCategory(event.target.value);
  }

  function Edit({ product }) {
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price);
    const [category, setCategory] = useState(product.category);

    function handleInput(event) {
      const { name, value } = event.target;

      switch (name) {
        case 'name':
          setName(value);
          break;
        case 'description':
          setDescription(value);
          break;
        case 'price':
          setPrice(value);
          break;
        case 'category':
          setCategory(value);
          break;
        default:
          break;
      }
    }

    return (
      <div>
        <h1>Modifier le produit</h1>
        <form>
          <input type="text" name="name" value={name} onChange={handleInput} />
          <br />
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleInput}
          />
          <br />
          <input
            type="text"
            name="price"
            value={price}
            onChange={handleInput}
          />
          <br />
          <input
            type="text"
            name="category"
            value={category}
            onChange={handleInput}
          />
          <br />
          <Button
            text="Modifier"
            color="success"
            onClick={() => handleUpdate(product.id, name, description, price, category)}
          />
        </form>
      </div>
    );
  }

  // Assurez-vous que productsList est un tableau avant de l'utiliser dans la méthode map
  if (!Array.isArray(productsList)) {
    return <div>Chargement des produits...</div>;
  }

  return (
    <div className="container">
      <h1>Liste des produits</h1>
      {showAddForm ? (
        <div>
          <h1>Ajouter un produit</h1>
          <form onSubmit={handleAddSubmit}>
            <input
              type="text"
              name="name"
              value={newProductName}
              onChange={handleNewProductName}
              placeholder="Nom du produit"
            />
            <br />
            <input
              type="text"
              name="description"
              value={newProductDescription}
              onChange={handleNewProductDescription}
              placeholder="Description du produit"
            />
            <br />
            <input
              type="text"
              name="price"
              value={newProductPrice}
              onChange={handleNewProductPrice}
              placeholder="Prix du produit"
            />
            <br />
            <input
              type="text"
              name="category"
              value={newProductCategory}
              onChange={handleNewProductCategory}
              placeholder="Catégorie du produit"
            />
            <br />
            <Button type="submit" text="Ajouter" color="success" />
          </form>
        </div>
      ) : (
        <Button text="Ajouter produit" color="warning" onClick={handleAdd} />
      )}
      <ul>
        {productsList.map((product) => (
          updateState === product.id ? (
            <Edit key={product.id} product={product} />
          ) : (
            <li key={product.id}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Prix : {product.price}</p>
              <p>Catégorie : {product.category}</p>
              <Button
                text="Mettre à jour"
                color="primary"
                onClick={() => handleEdit(product.id)}
              />
              <Button
                text="Supprimer"
                color="danger"
                onClick={() => handleDelete(product.id)}
              />
            </li>
          )
        ))}
      </ul>
    </div>
  );
};


export default Produits;
