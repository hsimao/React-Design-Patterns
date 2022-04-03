import "./App.css";
import axios from "axios";
import ResourceLoader from "./loader/ResourceLoader";
import DataSource from "./loader/DataSource";
import ProductInfo from "./comoponents/ProductInfo";
import UserInfo from "./comoponents/UserInfo";

function App() {
  const getServerData = (url) => async () => {
    const response = await axios.get(url);
    return response.data;
  };

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

      <DataSource getDataFunc={getServerData("/users/123")} resourceName="user">
        <UserInfo />
      </DataSource>
      <DataSource
        getDataFunc={getServerData("/products/1234")}
        resourceName="product"
      >
        <ProductInfo />
      </DataSource>
    </>
  );
}

export default App;
