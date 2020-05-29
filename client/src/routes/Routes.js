import React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

//COMPONENTS
import SideBar from "../components/ui/SideBar";
import Dashboard from "../components/dashboard/Dashboard";
//Customers
import AddCustomer from "../components/customer/AddCustomer";
import EditCustomer from "../components/customer/EditCustomer";
import Customers from "../components/customer/Customers";
// Suppliers
import AddSupplier from "../components/supplier/AddSupplier";
import EditSupplier from "../components/supplier/EditSupplier";
import Suppliers from "../components/supplier/Suppliers";
// City
import AddCity from "../components/city/AddCity";
import EditCity from "../components/city/EditCity";
import Cities from "../components/city/Cities";
// Item
import AddItem from "../components/item/AddItem";
import EditItem from "../components/item/EditItem";
import Items from "../components/item/Items";
import ItemStock from "../components/item/ItemStock";
// UoM
import AddUom from "../components/uom/AddUom";
import EditUom from "../components/uom/EditUom";
import Uoms from "../components/uom/Uoms";
// Customer enquiry
import AddCustomerEnquiry from "../components/sales/enquiry/AddCustomerEnquiry";
import CustomerEnquiry from "../components/sales/enquiry/CustomerEnquiry";
import EditCustomerEnquiry from "../components/sales/enquiry/EditCustomerEnquiry";

// Customer Delivery
import AddCustomerDelivery from "../components/sales/delivery/AddCustomerDelivery";
import CustomerDelivery from "../components/sales/delivery/CustomerDelivery";
import DeliveryFromEnquiry from "../components/sales/delivery/DeliveryFromEnquiry";
import EditCustomerDelivery from "../components/sales/delivery/EditCustomerDelivery";
// Customer Payment
import AddCustomerPayment from "../components/sales/payment/AddCustomerPayment";
import EditCustomerPayment from "../components/sales/payment/EditCustomerPayment";
import CustomerPayment from "../components/sales/payment/CustomerPayment";
import PaymentFromDelivery from "../components/sales/payment/PaymentFromDelivery";
// Purchase
import AddPurchase from "../components/purchase/purchase/AddPurchase";
import Purchase from "../components/purchase/purchase/Purchase";
import EditPurchase from "../components/purchase/purchase/EditPurchase";
// Supplier Payment
import AddSupplierPayment from "../components/purchase/payment/AddSupplierPayment";
import SupplierPayment from "../components/purchase/payment/SupplierPayment";
import EditSupplierPayment from "../components/purchase/payment/EditSupplierPayment";
import PaymentFromPurchase from "../components/purchase/payment/PaymentFromPurchase";

const Routes = () => {
  return (
    <React.Fragment>
      <SideBar>
        <div className="container">
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            // Customer
            <PrivateRoute exact path="/add-customer" component={AddCustomer} />
            <PrivateRoute
              exact
              path="/edit-customer/:id"
              component={EditCustomer}
            />
            <PrivateRoute exact path="/customers" component={Customers} />
            // Supplier
            <PrivateRoute exact path="/suppliers" component={Suppliers} />
            <PrivateRoute exact path="/add-supplier" component={AddSupplier} />
            <PrivateRoute
              exact
              path="/edit-supplier/:id"
              component={EditSupplier}
            />
            // City
            <PrivateRoute exact path="/cities" component={Cities} />
            <PrivateRoute exact path="/add-city" component={AddCity} />
            <PrivateRoute exact path="/edit-city/:id" component={EditCity} />
            // Item
            <PrivateRoute exact path="/items" component={Items} />
            <PrivateRoute exact path="/item-stock" component={ItemStock} />
            <PrivateRoute exact path="/add-item" component={AddItem} />
            <PrivateRoute exact path="/edit-item/:id" component={EditItem} />
            // Uom
            <PrivateRoute exact path="/uoms" component={Uoms} />
            <PrivateRoute exact path="/add-uom" component={AddUom} />
            <PrivateRoute exact path="/edit-uom/:id" component={EditUom} />
            // Customer enquiry
            <PrivateRoute
              exact
              path="/add-customer-enquiry"
              component={AddCustomerEnquiry}
            />
            <PrivateRoute
              exact
              path="/customer-enquiry"
              component={CustomerEnquiry}
            />
            <PrivateRoute
              exact
              path="/edit-customer-enquiry/:id"
              component={EditCustomerEnquiry}
            />
            // Customer Delivery
            <PrivateRoute
              exact
              path="/add-customer-delivery"
              component={AddCustomerDelivery}
            />
            <PrivateRoute
              exact
              path="/customer-delivery"
              component={CustomerDelivery}
            />
            <PrivateRoute
              exact
              path="/del-from-enq/:id"
              component={DeliveryFromEnquiry}
            />
            <PrivateRoute
              exact
              path="/edit-customer-delivery/:id"
              component={EditCustomerDelivery}
            />
            // Customer Payment
            <PrivateRoute
              exact
              path="/add-customer-payment"
              component={AddCustomerPayment}
            />
            <PrivateRoute
              exact
              path="/customer-payment"
              component={CustomerPayment}
            />
            <PrivateRoute
              exact
              path="/edit-customer-payment/:id"
              component={EditCustomerPayment}
            />
            <PrivateRoute
              exact
              path="/pay-from-del/:id"
              component={PaymentFromDelivery}
            />
            //Purchase
            <PrivateRoute exact path="/add-purchase" component={AddPurchase} />
            <PrivateRoute exact path="/purchase" component={Purchase} />
            <PrivateRoute
              exact
              path="/edit-purchase/:id"
              component={EditPurchase}
            />
            // Supplier Payment
            <PrivateRoute
              exact
              path="/add-supplier-payment"
              component={AddSupplierPayment}
            />
            <PrivateRoute
              exact
              path="/supplier-payment"
              component={SupplierPayment}
            />
            <PrivateRoute
              exact
              path="/edit-supplier-payment/:id"
              component={EditSupplierPayment}
            />
            <PrivateRoute
              exact
              path="/pay-from-pur/:id"
              component={PaymentFromPurchase}
            />
          </Switch>
        </div>
      </SideBar>
    </React.Fragment>
  );
};

export default Routes;
