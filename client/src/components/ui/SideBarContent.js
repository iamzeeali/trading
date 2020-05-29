import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import { logout } from "../../_actions/authAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const SideBarContent = ({ user, logout }) => {
  return (
    <div className="sidebar">
      <ul className="list-unstyled components">
        <p className="lead font-weight-bold">{user && user.company.name}</p>
        <small>{user && user.name}</small>
        <hr />
        <li>
          <Link to="/">
            {" "}
            <i class="fa fa-home" aria-hidden="true">
              {" "}
              Home
            </i>
          </Link>
        </li>

        <li className="mb-2">
          <i class="fa fa-user" aria-hidden="true">
            <a
              href="#customerMenu"
              data-toggle="collapse"
              aria-expanded="false"
            >
              {" "}
              Customer <i class="fa fa-caret-down" aria-hidden="true"></i>
            </a>
          </i>

          <ul className="collapse list-unstyled" id="customerMenu">
            <li>
              <Link to="/customers">Customers</Link>
            </li>
            <li>
              <Link to="add-customer">Add a Customer</Link>
            </li>
          </ul>
        </li>

        <li className="mb-2">
          <i class="fa fa-industry" aria-hidden="true">
            {" "}
            <a
              href="#supplierMenu"
              data-toggle="collapse"
              aria-expanded="false"
            >
              {" "}
              Supplier <i class="fa fa-caret-down" aria-hidden="true"></i>
            </a>
          </i>

          <ul className="collapse list-unstyled" id="supplierMenu">
            <li>
              <Link to="/suppliers">Suppliers</Link>
            </li>
            <li>
              <Link to="/add-supplier">Add a Supplier</Link>
            </li>
          </ul>
        </li>

        <li className="mb-2">
          <i class="fa fa-product-hunt" aria-hidden="true">
            {" "}
            <a href="#itemMenu" data-toggle="collapse" aria-expanded="false">
              {" "}
              Item <i class="fa fa-caret-down" aria-hidden="true"></i>
            </a>
          </i>

          <ul className="collapse list-unstyled" id="itemMenu">
            <li>
              <Link to="/items">Items</Link>
            </li>
            <li>
              <Link to="/add-item">Add an Item</Link>
            </li>
          </ul>
        </li>

        <hr />

        <li className="mb-2">
          <i class="fa fa-shopping-cart    ">
            <a
              href="#purchaseMenu"
              data-toggle="collapse"
              aria-expanded="false"
              disable
            >
              {" "}
              Purchase <i class="fa fa-caret-down" aria-hidden="true"></i>
            </a>
          </i>

          <ul className="collapse list-unstyled" id="purchaseMenu">
            <li>
              <Link to="/purchase">Purchase</Link>
            </li>
            <li>
              <Link to="/supplier-payment">Supplier Payment</Link>
            </li>
          </ul>
        </li>

        <li className="mb-2">
          <i class="fa fa-shopping-basket" aria-hidden="true"></i>
          <a href="#salesMenu" data-toggle="collapse" aria-expanded="false">
            {" "}
            Sales <i class="fa fa-caret-down" aria-hidden="true"></i>
          </a>
          <ul className="collapse list-unstyled" id="salesMenu">
            <li>
              <Link to="/customer-enquiry">Customer Enquiry</Link>
            </li>
            <li>
              <Link to="/customer-delivery">Delivery</Link>
            </li>
            <li>
              <Link to="/customer-payment">Customer Payment</Link>
            </li>
          </ul>
        </li>

        <hr />

        <li className="mb-2">
          <i class="fa fa-line-chart" aria-hidden="true">
            <a href="#ReportsMenu" data-toggle="collapse" aria-expanded="false">
              {" "}
              Reports <i class="fa fa-caret-down" aria-hidden="true"></i>
            </a>
          </i>

          <ul className="collapse list-unstyled" id="ReportsMenu">
            <li>
              <Link to="/uoms">A/C Receivables</Link>
            </li>
            <li>
              <Link to="/cities">A/C Payables</Link>
            </li>
          </ul>
        </li>
        <hr />

        <li className="mb-2">
          <i class="fa fa-cog" aria-hidden="true">
            <a
              href="#settingsMenu"
              data-toggle="collapse"
              aria-expanded="false"
            >
              {" "}
              Settings <i class="fa fa-caret-down" aria-hidden="true"></i>
            </a>
          </i>

          <ul className="collapse list-unstyled" id="settingsMenu">
            <li>
              <Link to="/uoms">UoM</Link>
            </li>
            <li>
              <Link to="/cities">City</Link>
            </li>
          </ul>
        </li>

        <hr />
        <li className="mb-2">
          <Link
            to="/login"
            onClick={logout}
            style={{ textDecoration: "none" }}
            className="btn btn-outline-secondary mt-4"
          >
            <small>
              {" "}
              <i className="fa fa-sign-out"> Logout</i>{" "}
            </small>
          </Link>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user.data,
});

SideBarContent.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { logout })(SideBarContent);
