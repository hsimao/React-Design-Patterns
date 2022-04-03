import "./App.css";
import ResourceLoader from "./loader/ResourceLoader";
import ProductInfo from "./comoponents/ProductInfo";
import UserInfo from "./comoponents/UserInfo";

function App() {
  return (
    <>
      <ResourceLoader resourceUrl="/users/123" resourceName="user">
        <UserInfo />
      </ResourceLoader>
      <ResourceLoader resourceUrl="/current-user" resourceName="user">
        <UserInfo />
      </ResourceLoader>
      <ResourceLoader resourceUrl="/products/1234" resourceName="product">
        <ProductInfo />
      </ResourceLoader>
    </>
  );
}

export default App;
