import axios from "axios";
const globals = require("node-global-storage");
import setting from "../../settings.json";
class paymentMiddleware {
  bkash_auth = async (req, res, next) => {
    globals.unset("id_token");

    try {
      const { data } = await axios.post(
        setting.bkash.bkash_grant_token_url,
        {
          app_key: setting.bkash.bkash_api_key,
          app_secret: setting.bkash.bkash_secret_key,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            username: setting.bkash.bkash_username,
            password: setting.bkash.bkash_password,
          },
        }
      );
      globals.set("id_token", data.id_token, { protected: true });
      next();
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  };
}

export default new paymentMiddleware();
