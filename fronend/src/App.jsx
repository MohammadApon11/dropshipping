import React from "react";
import Footer from "./Components/Footer";
import TopHeader from "./Components/TopHeader";
import Routing from "./Features/Routing";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="" data-theme="light">
      <div className="container mx-auto">
        <TopHeader />
      </div>
      <div className="">
        <Routing />
      </div>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
