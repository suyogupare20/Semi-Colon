import React, { Children } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Person } from "react-bootstrap-icons";
import { Files } from "react-bootstrap-icons";
import { Collection } from "react-bootstrap-icons";
import { Handbag,PersonExclamation,Cart4,Receipt,CartX,BoxArrowInLeft,PersonVideo2 } from "react-bootstrap-icons";



const Layout = ({ children }) => {
  const navigate = useNavigate();
  const logout = () => {

    fetch("https://localhost:7061/api/logout?userid="+localStorage.getItem("Id"), {
            method: "POST",
            headers: { 'Authorization': 'Bearer' + " " + localStorage.getItem("Token"),
            'Content-Type': 'application/json' }
        })
            .then((res) => {
                // alert("Logged Out");
                navigate("/productListing");
            })
            .catch((err) => {
                console.log(err.message);
            });
    navigate("/");
  };

  return (
    <div>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="container-fluid">
              <div className="row">
                <div className="col-xl-2 col-lg-3 col-md-4 sidebar fixed-top">
                  <a
                    href="/dashboard"
                    className="navbar-brand text-white d-block mx-auto text-center py-3 mb-4 bottom-border"
                  >
                    Sales & Inventory
                  </a>
                  <div className="bottom-border pb-3">
                    {/* <img
                      src="images/admin.jpeg"
                      width="50"
                      className="rounded-circle mr-3"
                    /> */}
                    <a href="/dashboard" className="nav-link text-white p-1 mb-2 sidebar-link">
                    <Person color="white"/>
                      <small> {localStorage.getItem("Name") } ({localStorage.getItem("RoleId")==1 ? 'Admin' : 'Employee'})</small>
                    </a>
                  </div>
                  <ul className="navbar-nav flex-column mt-4">
                    <li className="nav-item">
                      <a
                        href="/dashboard"
                        className="nav-link text-white p-1 mb-2 "
                      >
                        <Files/>&nbsp;
                        <small>
                          Sales Report
                        </small>
                      </a>
                    </li>
                    { (localStorage.getItem("RoleId")==1) ? <li className="nav-item">
                      <a
                        href="/empListing/"
                        className="nav-link text-white p-1 mb-2 sidebar-link"
                      >
                        <Collection/>&nbsp;
                        <small>
                          <i className="fas fa-user text-light fa-sm mr-3"></i>
                        Employee Details
                        </small>
                      </a>
                    </li>: <li></li>}
                    <li className="nav-item">
                      <a
                        href="/productListing"
                        className="nav-link text-white p-1 mb-2 sidebar-link"
                      >
                        <Handbag/>&nbsp;
                        <small>
                          <i className="fas fa-envelope text-light fa-sm mr-3"></i>
                           Product Management
                        </small>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/custListing"
                        className="nav-link text-white p-1 mb-2 sidebar-link"
                      >
                        <PersonVideo2/>&nbsp;
                        <small>
                          <i className="fas fa-envelope text-light fa-sm mr-3"></i>
                           Customer Management
                        </small>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/supplierListing"
                        className="nav-link text-white p-1 mb-2 sidebar-link"
                      >
                        <PersonExclamation/>&nbsp;
                        <small>
                          <i className="fas fa-shopping-cart text-light fa-sm mr-3"></i>
                          Supplier Management
                        </small>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/orders"
                        className="nav-link text-white p-1 mb-2 sidebar-link"
                      >
                        <Cart4/>&nbsp;
                        <small>
                          <i className="fas fa-chart-line text-light fa-sm mr-3"></i>
                          Order Details
                        </small>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/invoice"
                        className="nav-link text-white p-1 mb-2 sidebar-link"
                      >
                        <Receipt/>&nbsp;
                        <small>
                          <i className="fas fa-chart-line text-light fa-sm mr-3"></i>
                          Sales Invoice
                        </small>
                      </a>

                    </li>
                    <li className="nav-item">
                      <a
                        href="/salesreturn"
                        className="nav-link text-white p-1 mb-2 sidebar-link"
                      >
                        <CartX/>&nbsp;
                        <small>
                          <i className="fas fa-chart-line text-light fa-sm mr-3"></i>
                          Sales Return
                        </small>
                      </a>
                      
                    </li>
                   

                    <li className="nav-item">
                      <a
                        onClick={() => {
                        localStorage.setItem("Token","");
                        logout();
                      }}
                        className="nav-link text-white p-1 mb-2 sidebar-link"
                      >
                        <BoxArrowInLeft/>&nbsp;
                        <small>
                          <i className="fas fa-wrench text-light fa-sm mr-3"></i>
                          Logout
                        </small>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>

      </div>
   
    </div>
  );
};

export default Layout;
