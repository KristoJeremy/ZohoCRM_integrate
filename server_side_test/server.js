const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// POST API endpoint
app.post("/post-leads", async (req, res) => {
  const requestBody = {
    Email: req.body.Email || "",
    Room_Id: req.body.Room_Id || "262297862",
    Product_Reference_Number:
      req.body.Product_Reference_Number ||
      "product: Audemars Piguet Royal Oak 34 77451OR.ZZ.1361OR.02 (50th Anniversary) Blue. Can you assist?",
    utm_name: req.body.utm_name || "",
    utm_medium: req.body.utm_medium || "",
    Phone_Number: req.body.Phone_Number || "628111007377",
    First_Page_Visited1: req.body.First_Page_Visited1 || "",
    Source: req.body.Source || null,
    Name: req.body.Name || "Kristo",
    Refferer1: req.body.Refferer1 || "",
    Prod_Cat: req.body.Prod_Cat || null,
    Customer_Id: req.body.Customer_Id || {},
    Lead_Source1: req.body.Lead_Source1 || "",
    Chat_Entry_Point1: req.body.Chat_Entry_Point1 || "",
  };

  try {
    const response = await axios.post(
      "https://sandbox.zohoapis.com/crm/v2/functions/post_leads_from_channel/actions/execute?auth_type=apikey&zapikey=1003.65da9b1631521b03d936d8fece701888.9bc5628631a40191a73c3059a11406f1",
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Send response from Zoho
    res.json(response.data);
  } catch (error) {
    console.error("Error sending lead data:", error);
    res
      .status(500)
      .json({
        message: "Failed to send lead data",
        error: error.response.data,
      });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
