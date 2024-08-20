const express = require("express");
const app = express();
const cors = require("cors");
const PDFDocument = require("pdfkit");
const fs = require("fs");

// Midleware to allow CORS
app.use(cors());

// Middleware to parse json bodies
app.use(express.json());

const PORT = 3001;

app.use(express.static("public"));


app.post("/createoffer", async (req, res) => {
  console.log("create offer hahah");

  const {
    offerId,
    projectStart,
    projectDeadline,
    orderText,
    orderPriceWithoutTax,
    orderPriceWithTax,
    contactEmail,
    contactPhone
  } = req.body;

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(`./public/${offerId}.pdf`));

  // Add a logo on the left and date on the right
  doc.image("./public/arvalogoblack.png", 50, 50, { width: 100 });

  doc.fontSize(12).text(`Date: ${projectStart}`, 400, 50, { align: 'right' });

  // Add offer details
  doc.fontSize(16).text('Offer Details:', 50, 150);
  doc.fontSize(12).text(orderText, 50, 180);

  doc.fontSize(16).text('Project Timeline:', 50, 450);
  doc.fontSize(12).text(`Project Start: ${projectStart}`, 50, 480);
  doc.fontSize(12).text(`Project Deadline: ${projectDeadline}`, 50, 500);

  // Add prices
  doc.fontSize(16).text('Price List:', 50, 550);
  doc.fontSize(12).text(`Net Price: $${orderPriceWithoutTax}`, 50, 580);
  doc.fontSize(12).text(`Gross Price: $${orderPriceWithTax}`, 50, 600);

  // Add contact details at the bottom
  doc.fontSize(12).text(`E-Mail: ${contactEmail}`, 50, 700);
  doc.text(`Phone: ${contactPhone}`, 400, 700), { align: "right" };

  doc.end();


  res.status(200).json({message: "Success"})
})


app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
})
