import "./App.css";
import { useState } from "react";
import axios from "axios";
import ResourceLoader from "./loader/ResourceLoader";
import DataSource from "./loader/DataSource";
import ProductInfo from "./comoponents/ProductInfo";
import UserInfo from "./comoponents/UserInfo";
import UncontrolledOnboardingFlow from "./comoponents/controlled/UncontrolledOnboardingFlow";
import ControlledOnboardingFlow from "./comoponents/controlled/ControlledOnboardingFlow";
import printProps from "./comoponents/hoc/printProps";
import UserInfoForm from "./comoponents/hoc/UserInfoForm";
import RecursiveComponent from "./comoponents/fp/RecursiveComponent";
import { DangerButton, BigSuccessButton } from "./comoponents/fp/composition";

const nestedObject = {
  a: 1,
  b: {
    b1: 4,
    b2: {
      b23: "Hello"
    },
    b3: {
      b31: {
        message: "Hi"
      },
      b32: {
        message: "Hi"
      }
    }
  },
  c: {
    c1: 2,
    c2: 3
  }
};

const UserInfoWrapped = printProps(UserInfo);

const getServerData = (url) => async () => {
  const response = await axios.get(url);
  return response.data;
};

const getLocalStorageData = (key) => () => {
  return localStorage.getItem(key);
};

const Text = ({ message }) => <h1>{message}</h1>;

const StepOne = ({ goToNext }) => (
  <>
    <h1>Step 1</h1>
    <button onClick={() => goToNext({ name: "Mars" })}>Next</button>
  </>
);
const StepTwo = ({ goToNext }) => (
  <>
    <h1>Step 2</h1>
    <button onClick={() => goToNext({ age: 18 })}>Next</button>
  </>
);
const StepThree = ({ goToNext }) => (
  <>
    <h1>Step 3</h1>
    <p>Congratulations! You qualify for our senior discount</p>
    <button onClick={() => goToNext({})}>Next</button>
  </>
);
const StepFour = ({ goToNext }) => (
  <>
    <h1>Step 4</h1>
    <button onClick={() => goToNext({ job: "Engineer" })}>Next</button>
  </>
);

function App() {
  const [onboardingData, setOnboardingData] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const onNext = (stepData) => {
    setOnboardingData((originData) => ({ ...originData, ...stepData }));
    setCurrentIndex((originData) => originData + 1);
    console.log("onboardingData", onboardingData);
  };

  return (
    <>
      <DangerButton text="DangerButton" />
      <BigSuccessButton text="BigSuccessButton" />

      <RecursiveComponent data={nestedObject} />
      <ProductInfo productId="1234" />
      <UserInfo userId="123" />
      <UserInfoForm />
      <UserInfoWrapped a={1} b="hello" userId="234" />
      <ControlledOnboardingFlow
        currentIndex={currentIndex}
        onNext={onNext}
        onFinish={(data) => {
          console.log(data);
          alert("Onboarding complete!");
        }}
      >
        <StepOne />
        <StepTwo />
        {onboardingData.age >= 20 && <StepThree />}
        <StepFour />
      </ControlledOnboardingFlow>

      <UncontrolledOnboardingFlow
        onFinish={(data) => {
          console.log(data);
          alert("Onboarding complete!");
        }}
      >
        <StepOne />
        <StepTwo />
        <StepThree />
      </UncontrolledOnboardingFlow>
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

      <DataSource
        getDataFunc={getLocalStorageData("message")}
        resourceName="message"
      >
        <Text />
      </DataSource>
    </>
  );
}

export default App;
