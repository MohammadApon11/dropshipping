import axios from "axios";
const globals = require("node-global-storage");
import setting from "../../../settings.json";
import PaymentModel from "../../models/paymentModel";
const { v4: uuidv4 } = require("uuid");
class paymentController {
  getAllOrders = async (req, res) => {
    try {
      // Fetch all orders from the PaymentModel collection
      const orders = await PaymentModel.find(); // Fetches all orders

      if (orders.length === 0) {
        return res.status(404).json({ error: "No orders found" });
      }

      return res.status(200).json({ orders }); // Return the list of orders
    } catch (error) {
      console.error("Error retrieving all orders:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  bkash_headers = async () => {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: globals.get("id_token"),
      "x-app-key": setting.bkash.bkash_api_key,
    };
  };

  payment_create = async (req, res) => {
    const { totalPrice, orderId, email, phone } = req.body;
    const paymentInfo = req.body;
    globals.set("paymentInfo", JSON.stringify(paymentInfo));
    try {
      const { data } = await axios.post(
        setting.bkash.bkash_create_payment_url,
        {
          mode: "0011",
          payerReference: " ",
          callbackURL: "http://localhost:9000/api/bkash/payment/callback",
          amount: totalPrice,
          currency: "BDT",
          intent: "sale",
          merchantInvoiceNumber: "Inv" + uuidv4().substring(0, 5),
        },
        {
          headers: await this.bkash_headers(),
        }
      );
      return res.status(200).json({ bkashURL: data.bkashURL });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  };

  call_back = async (req, res) => {
    const { paymentID, status } = req.query;

    if (status === "cancel" || status === "failure") {
      return res.redirect(`http://localhost:3000/fail?message=${status}`);
    }
    if (status === "success") {
      try {
        const { data } = await axios.post(
          setting.bkash.bkash_execute_payment_url,
          { paymentID },
          {
            headers: await this.bkash_headers(),
          }
        );
        if (data && data.statusCode === "0000") {
          const paymentInfoString = globals.get("paymentInfo");
          const paymentInfo = JSON.parse(paymentInfoString); // Parse it to an object

          // Extract necessary details, including email and phone
          const { email, phone } = paymentInfo;
          // const {
          //   email,
          //   phone,
          //   altPhone,
          //   firstName,
          //   lastname,
          //   address,
          //   city,
          //   area,
          //   zip,
          //   delivery,
          //   totalPrice,
          //   orderId,
          // } = paymentInfo;
          await PaymentModel.create({
            paymentID,
            trxID: data.trxID,
            date: data.paymentExecuteTime,
            amount: parseInt(data.amount),
          });
          return res.redirect(
            `http://localhost:3000/success?trxID=${data.trxID}`
          );
        } else {
          return res.redirect(
            `http://localhost:3000/fail?message=${data.statusMessage}`
          );
        }
      } catch (error) {
        console.log(error);
        return res.redirect(
          `http://localhost:3000/fail?message=${error.message}`
        );
      }
    }
  };

  refund = async (req, res) => {
    const { trxID } = req.params;

    try {
      const payment = await PaymentModel.findOne({ trxID });

      const { data } = await axios.post(
        setting.bkash.bkash_refund_transaction_url,
        {
          paymentID: payment.paymentID,
          amount: payment.amount,
          trxID,
          sku: "payment",
          reason: "cashback",
        },
        {
          headers: await this.bkash_headers(),
        }
      );
      if (data && data.statusCode === "0000") {
        return res.status(200).json({ message: "refund success" });
      } else {
        return res.status(404).json({ error: "refund failed" });
      }
    } catch (error) {
      return res.status(404).json({ error: "refund failed" });
    }
  };
}

export default new paymentController();
