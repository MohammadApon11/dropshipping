import React from "react";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import TopHeader from "./Components/TopHeader";
import Routing from "./Features/Routing";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="">
      <div className="container ml-auto mr-auto">
        <TopHeader />
      </div>
      <Header />
      <div className="container ml-auto mr-auto">
        <Routing />
      </div>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
