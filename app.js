const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const compression = require("compression");

//**********************************Routes Import*************************************//
const cityRouter = require("./routes/cityRoutes");
const companyRouter = require("./routes/companyRoutes");
const customerDeliveryRouter = require("./routes/customerDeliveryRoutes");
const customerEnquiryRouter = require("./routes/customerEnquiryRoutes");
const customerPaymentRouter = require("./routes/customerPaymentRoutes");
const customerRouter = require("./routes/customerRoutes");
const itemRouter = require("./routes/itemRoutes");
const purchaseRouter = require("./routes/purchaseRoutes");
const supplierPaymentRouter = require("./routes/supplierPaymentRoutes");
const supplierRouter = require("./routes/supplierRoutes");
const uomRouter = require("./routes/uomRoutes");
const userRouter = require("./routes/userRoutes");
//**********************************Routes Import*************************************//

const app = express();

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"));

// *********************GLOBAL MIDDLEWARES*******************************

//set security http headers
app.use(helmet());

//development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Limit request from same IP
const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

//body parser, reading data into req.body
app.use(express.json({ limit: "10kb" }));

//Cookie Parser
app.use(cookieParser());

//Data sanitization against Nosql query injections
app.use(mongoSanitize());

//Data sanitization against XSS(cross site scripting attacks)
app.use(xss());

//Prevent Paramter Pollution
app.use(
  hpp({
    // whitelist: [
    //   "duration",
    //   "ratingsQuantity",
    //   "ratingsAverage",
    //   "maxGroupSize",
    //   "difficulty",
    //   "price"
    // ]
  })
);

app.use(compression());

//***************************ROUTES***********************************//
app.use("/api/city", cityRouter);
app.use("/api/company", companyRouter);
app.use("/api/customer-delivery", customerDeliveryRouter);
app.use("/api/customer-enquiry", customerEnquiryRouter);
app.use("/api/customer-payment", customerPaymentRouter);
app.use("/api/customer", customerRouter);
app.use("/api/item", itemRouter);
app.use("/api/purchase", purchaseRouter);
app.use("/api/supplier-payment", supplierPaymentRouter);
app.use("/api/supplier", supplierRouter);
app.use("/api/uom", uomRouter);
app.use("/api/user", userRouter);
//***************************/ROUTES***********************************//

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
