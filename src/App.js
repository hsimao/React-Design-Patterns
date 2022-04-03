import "./App.css";
import ListBase from "./comoponents/ListBase";
import ListNumber from "./comoponents/ListNumber";
import PersonListItemLarge from "./comoponents/PersonListItemLarge";
import PersonListItemSmall from "./comoponents/PersonListItemSmall";
import ProductListItemLarge from "./comoponents/ProductListItemLarge";
import ProductListItemSmall from "./comoponents/ProductListItemSmall";

const people = [
  {
    name: "John Doe",
    age: 54,
    hairColor: "brown",
    hobbies: ["swimming", "bicycling", "video games"]
  },
  {
    name: "Brenda Smith",
    age: 33,
    hairColor: "black",
    hobbies: ["golf", "mathematics"]
  }
];

const products = [
  {
    name: "Apple TV",
    price: 599,
    description: "nice tv",
    rating: 5
  },
  {
    name: "Apple Watch",
    price: 799,
    description: "nice watch",
    rating: 4.5
  }
];

function App() {
  return (
    <>
      <ListBase
        items={people}
        resourceName="person"
        itemComponent={PersonListItemSmall}
      />
      <ListNumber
        items={people}
        resourceName="person"
        itemComponent={PersonListItemLarge}
      />
      <ListNumber
        items={products}
        resourceName="product"
        itemComponent={ProductListItemLarge}
      />
      <ListBase
        items={products}
        resourceName="product"
        itemComponent={ProductListItemSmall}
      />
    </>
  );
}

export default App;
