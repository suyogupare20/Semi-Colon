
import React, { Component, useEffect, useState } from 'react';
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import "./Recruit.css";
import Per from "../Images/Logo+Per.png";
import { BoxArrowRight } from "react-bootstrap-icons";
import { useNavigate } from 'react-router-dom';
import { Multiselect } from 'multiselect-react-dropdown';
import { inputAdornmentClasses } from '@mui/material';

export const TablePaginationActions = (props) => {
  
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/dashboard");
  };

  
  const columns = [{
    Header: 'EmpID',
    accessor: 'id',
    Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
  }, {
    Header: 'First Name',
    accessor: 'firstName',
    Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
  }, {
    Header: 'Last Name',
    accessor: 'lastName',
    Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
  }, {
    Header: 'Gender',
    accessor: 'gender',
    Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
  }, {
    Header: 'Phone',
    accessor: 'phone',
    Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
  }, {
    Header: 'Experience',
    accessor: 'workEx',
    Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
  }, {
    Header: 'Department',
    accessor: 'department',
    Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
  }, {
    Header: 'Skills',
    accessor: 'skillName',
    Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
  }]

  const [renderdata, setData] = useState([]);
  const [searchString, setsearchString] = useState("");
  const [skill,setSkill] = useState([]);
  const [options,setOptions]=useState([]);

  const fetchData = () => {
    fetch('https://localhost:7185/api/Users')
      .then((res) => res.json())
      .then((actualData) => {
        setData(actualData);
      })
      .catch((err) => {
        console.log(err.message);
      });

      fetch('https://localhost:7185/api/allskills')
      .then((res) => res.json())
      .then((actualData) => {
        setOptions(actualData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleClick = (e) => {
    e.preventDefault();
    
    if (skills === "") {
      fetchData();
    }
    else {
      skills=skills.slice(0,skills.length-1);
      console.log(skills);
      fetch('https://localhost:7185/api/skills/?skill=' + encodeURIComponent(skills))
        .then((res) => res.json())
        .then((actualData) => {
          setData(actualData);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  var skills = '';
  const AddSkill = (title) => {
    skills = skills + title[title.length - 1].skillName + ',';    
  };


  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container-custom">
      <nav class="navbar bg-body-tertiaryx p-0 nav-cust">
        <div class="container ms-5">
          <a class="navbar-brand p-0" onClick={handleHome}>
            <img className="mt-1 mb-0" src={Per} width="120" height="60" />
          </a>
          <form class="form-inline d-flex">

            <div class="d-flex text-decorate mt-1">
              <a type="submit">Logout </a>&nbsp;&nbsp;
              <div className="mt-1.1">
                <a type="submit"><BoxArrowRight /></a>
              </div>
            </div>
          </form>
        </div>
      </nav>

      <div className='container mt-4 bg-light p-1 table'>
        <form class="form-inline d-flex search" onSubmit={handleClick}>
          {/* <input class="form-control" type="text" placeholder="Search" aria-label="Search" onChange={(e)=>setsearchString(e.target.value)} value={searchString}/> */}
          <Multiselect
            // className='search-bar'
            options={options}
            onSelect={AddSkill}
            onChange={(e) => AddSkill(e.target.value)}
            displayValue="skillName"
            style={{maxHeight : '10px'}}
          />
          &nbsp;&nbsp;&nbsp;
          <button class="btn btn-success m-2" type="submit">Search</button>
        </form>
        <div className='table container mt-1'>
          <ReactTable
            data={renderdata}
            columns={columns}
            defaultPageSize={5}
            pageSizeOptions={[2, 4, 6]}
          />
        </div>
      </div>
    </div>
  )
}

