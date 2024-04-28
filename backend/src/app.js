import { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import form from "express-form-data";
import express from "express";
import { Router } from "express";
// import http2 from 'spdy';
import http2 from "https";
import http from "http";
import path from "path";
import morgan from "morgan";
import actuator from "express-actuator";
import { readFileSync } from "fs";
import cors from "cors";

// Local Services
import { hooks } from "./hooks";
import { services } from "./services";
import socket, { listen as wsListen } from "./controllers/socket";
import SearchCtrl from "./controllers/search/search";
import NewMailer from "./controllers/email";
import * as operations from "./controllers/operations";

// Settings
import settings from "../settings.json";
import { imageUp } from "./controllers/imageUp";
import { login, logout, signup } from "./controllers/users/auth.controllers.js";
import {
  addReview,
  getProducts,
  getProductsByCategoriesId,
  getProductsByProductId,
} from "./controllers/products/product.controllers.js";
import {
  addToCart,
  getCartProductsByUserEmail,
} from "./controllers/Cart/cart.controllers.js";
import protectRoute from "./middleware/protectRoute.js";
import { getCategories } from "./controllers/categories/categories.controllers.js";

export default class App {
  constructor() {
    this.express = express();
    this.router = new Router();
    this.config = settings;
    this.search = new SearchCtrl();
    this.mail = NewMailer(this.config);
    this.imageUp = imageUp;
    this.db = operations;
    this.events = {};

    // Boot Up the server & services
    this.init();
  }

  start() {
    this.listen();
  }

  init() {
    const { parse } = form;

    this.express.enable("trust proxy");

    // Load the middlewwares
    this.express.use(
      cors({
        origin: this.config.origin,
        credentials: true,
      })
    );
    this.express.use(morgan("common")); // Logger
    this.express.use(actuator({ infoGitMode: "full" })); // Health Checker
    this.express.use(json()); // Parse JSON response
    this.express.use(urlencoded({ extended: false })); // Legacy URL encoding
    this.express.use(cookieParser()); // Parse cookies
    this.express.use(parse()); // Parse Form data as JSON
    this.express.use(express.static(path.resolve(__dirname, "..", "client"))); // REACT build files (Statics)

    this.express.use("/api", this.router); // All the API routes

    // start-------------
    this.configureRoutes();
    // end-------------

    if (this.config.useHTTP2) {
      // SSL configuration
      this.ssl = {
        key: readFileSync(path.resolve("ssl", "privatekey.pem")),
        cert: readFileSync(path.resolve("ssl", "certificate.pem")),
      };

      this.options = {
        ...this.ssl,
        allowHTTP1: true,
      };

      // Server
      this.server = http2.createServer(this.options, this.express);

      // Load the Hooks
      hooks(this);
    } else {
      this.server = http.createServer(this.express);
    }

    // Start Search service
    this.search.start();
    // Sokcet Server
    this.socket = socket(this.server, { origin: this.config.origin });
    // Load the Services
    services(this);

    // Listen for events
    wsListen(this.socket, this.events);
  }
  // start change me ----------------
  configureRoutes() {
    // Defined routes here using this.router

    // user routes
    this.router.post("/login", login);
    this.router.post("/signup", signup);
    this.router.post("/logout", logout);
    // get categories
    this.router.get("/categories", getCategories);
    // get products
    this.router.get("/products", getProducts);
    this.router.get("/product/:productId", getProductsByProductId);
    this.router.get("/products/:categoryId", getProductsByCategoriesId);
    this.router.put("/product/:productId", addReview);
    // add to cart
    this.router.post("/addToCart", protectRoute, addToCart);
    this.router.get("/addToCart/:userEmail", getCartProductsByUserEmail); // protected route need
  }
  // end change me ----------------

  listen() {
    // Serve Front-end
    this.express.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "..", "client", "index.html"));
    });

    // Boot the server
    this.server.listen(this.config.port, () => {
      console.log(`=> Listening on ${this.config.port}`);
    });
  }

  // Register Hooks
  hook(callback) {
    callback.call({ ...this });
  }

  // configure service with api
  configure(callback) {
    callback.call({
      ...this.express,
      route: this.router,
      ws: this.socket,
      imageUp: this.imageUp,
      lyra: this.search,
      db: this.db,
      mail: this.mail,
      config: this.config,
    });
  }

  // register events for ws with service
  register(event, callback) {
    this.events[event] = {
      method: callback,
      props: {
        ws: this.socket,
        lyra: this.search,
        db: this.db,
        mail: this.mail,
        config: this.config,
      },
    };
  }
}
