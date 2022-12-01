import "./App.css";
import { useState, useEffect } from "react";
import bd from "./assets/bakery-data.json";
import ArtPiece from "./components/ArtPiece";
import Cart from "./components/Cart"

/* makes the image URLs work */
bd.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});

function App() {
  const [cart, updateCart] = useState([]);
  const [cartMap, updateCartMap] = useState(new Map())
  const [total, setTotal] = useState(0);

  const [small, setSmall] = useState(true);
  const [medium, setMedium] = useState(true);
  const [large, setLarge] = useState(true);

  const [under, setUnder] = useState(true);
  const [between, setBetween] = useState(true);
  const [over, setOver] = useState(true);

  const [cheapest, setCheapest] = useState(true);
  const [bakeryData, setBakeryData] = useState(bd)

  useEffect(() => {
    bakeryData.forEach(item => updateMap(item.name, 0));
  }, [])

  function updateMap(key, value) {
    updateCartMap(map => new Map(map.set(key, value)));
  }

  function addToCart(item) {
    let filteredCart = cart.filter(cartItem => cartItem.name !== item.name);
    updateCart([...filteredCart, item]);
    updateMap(item.name, cartMap.get(item.name) + 1)

    setTotal(parseFloat((total + item.price).toFixed(2)))
  }

  function removeFromCart(item) {
    setTotal(parseFloat((total - item.item.price).toFixed(2)))
    updateMap(item.item.name, cartMap.get(item.item.name) - 1)
    if (cartMap.get(item.item.name) == 0) {
      updateCart(cart.filter(arr => arr.name !== item.item.name));
    }
  }

  function resetCart() {
    updateCart([])
    updateCartMap(new Map())
    bakeryData.forEach(item => updateMap(item.name, 0));
    setTotal(0)
  }

  function toggleSmall() {
    if (small == false) {
      setSmall(true)
    }
    else {
      setSmall(false)
    }
  }

  function toggleMid() {
    if (medium == false) {
      setMedium(true)
    }
    else {
      setMedium(false)
    }
  }

  function toggleLarge() {
    if (large == false) {
      setLarge(true)
    }
    else {
      setLarge(false)
    }
  }

  function toggleUnder() {
    if (under == false) {
      setUnder(true)
    }
    else {
      setUnder(false)
    }
  }

  function toggleBetween() {
    if (between == false) {
      setBetween(true)
    }
    else {
      setBetween(false)
    }
  }

  function toggleOver() {
    if (over == false) {
      setOver(true)
    }
    else {
      setOver(false)
    }
  }

  function toggleCheapest() {
    if (cheapest == false) {
      setCheapest(true);
    }
    else {
      setCheapest(false);
    }
    sortData();
  }

  function filterSize(item) {
    switch (item.size) {
      case "small":
        if (small == true) {
          return true
        }
        break;
      case "medium":
        if (medium == true) {
          return true
        }
        break;
      case "large":
        if (large == true) {
          return true
        }
        break;
      default:
        return false
    }
  }

  function filterPrice(item) {
    let price = parseFloat(item.price)
    if (price < 20) {
      if (under == true) {
        return true
      }
    } else if (price >= 20 && price <= 50) {
      if (between == true) {
        return true
      }
    } else if (price > 50) {
      if (over == true) {
        return true
      }
    }
    return false
  }

  function sortData() {
    if (cheapest == true) {
      setBakeryData(bakeryData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)))
    } else if (cheapest == false){
      setBakeryData(bakeryData.sort((a, b) => parseFloat(b.price) - parseFloat(a.price)))
    }
  }

  return (
    <div className="App">
      <h1>Art Gallery</h1>

      <div className="filterCheckboxes">
        <div className="filter">
          <div className="filterText"><h3>Filter by size:</h3></div>

          <div className="filterCheckboxes">
            <div className="filterItem">
              <p>Small</p>
              <input type="checkbox" defaultChecked={small} onClick={toggleSmall}></input>
            </div>

            <div className="filterItem">
              <p>Medium</p>
              <input type="checkbox" defaultChecked={medium} onClick={toggleMid}></input>
            </div>

            <div className="filterItem">
              <p>Large</p>
              <input type="checkbox" defaultChecked={large} onClick={toggleLarge}></input>
            </div>

          </div>
        </div>

        <div className="filter">
          <div className="filterText"><h3>Filter by price!</h3></div>

          <div className="filterCheckboxes">
            <div className="filterItem">
              <p>under $20</p>
              <input type="checkbox" defaultChecked={under} onClick={toggleUnder}></input>
            </div>

            <div className="filterItem">
              <p>$20 - $50</p>
              <input type="checkbox" defaultChecked={between} onClick={toggleBetween}></input>
            </div>

            <div className="filterItem">
              <p>over $50</p>
              <input type="checkbox" defaultChecked={over} onClick={toggleOver}></input>
            </div>

          </div>
        </div>

        <div className="filter">
          <div className="filterText"><h3>Sort By:</h3></div>
          <div className="filterCheckboxes">
            <div className="filterItem">
              <p>cheapest</p>
              <input type="checkbox" defaultChecked={false} onClick={toggleCheapest}></input>
            </div>
          </div>
        </div>
      </div>

      <hr></hr>

      <div className="content">
        <div className="artContainers">
          {bakeryData.map((item, index) => {
            return filterSize(item) && filterPrice(item) ? (
              <ArtPiece key={index} name={item.name} desc={item.description}
                price={item.price} image={item.image} total={total} click={addToCart} />
            ) : <div></div>
          })}
        </div>


        <div className="cart">
          <Cart cart={cart} cartMap={cartMap} click={removeFromCart} reset={resetCart} total={total}/>
        </div>
      </div>

    </div>
  );
}

export default App;