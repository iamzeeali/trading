import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import customer from "./customerReducer";
import supplier from "./supplierReducer";
import city from "./cityReducer";
import item from "./itemReducer";
import uom from "./uomReducer";
import customerEnquiry from "./customerEnquiryReducer";
import customerDelivery from "./customerDeliveryReducer";
import customerPayment from "./customerPaymentReducer";
import supplierPayment from "./supplierPaymentReducer";
import purchase from "./purchaseReducer";

export default combineReducers({
  auth,
  alert,
  customer,
  supplier,
  city,
  item,
  uom,
  customerEnquiry,
  customerDelivery,
  customerPayment,
  purchase,
  supplierPayment,
});
