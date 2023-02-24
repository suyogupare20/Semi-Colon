import "./Dashboard.css";
import * as React from 'react';

import Add from '../Images/add.jpg'
import Recruit from '../Images/recruit.jpg'
import { NodeMinus, PersonCircle } from "react-bootstrap-icons";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { BoxArrowRight } from "react-bootstrap-icons";
import Per from "../Images/Logo+Per.png";
import { useNavigate } from "react-router-dom";
import Sidepanel from './Sidepanel';

export const Dashboard = (props) => {

    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClick = () => {
        navigate("/allocation");
    };
    const handleHome = () => {
        navigate("/dashboard");
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="container-custom">
            <Sidepanel/>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Upload Resume for Employee"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <input type="file" />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={handleClose} autoFocus>
                        Upload
                    </Button>
                </DialogActions>
            </Dialog>
            <nav class="navbar bg-body-tertiaryx p-0 nav-cust">
                <div class="container ms-5">
                    <a class="navbar-brand p-0" onClick={handleHome}>
                        <img className="mt-1 mb-0"src={Per} width="120" height="60" />
                    </a>

                    <div class="d-flex text-decorate">
                        <a type="submit">Logout &nbsp;&nbsp;</a>
                        <div className="mt-1.1">
                            <a type="submit"><BoxArrowRight /></a>
                        </div>
                    </div>

                </div>
            </nav>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-sm-3">
                        <a className="text-decorate" onClick={handleClickOpen}>
                            <div className="card card-cust">
                                <div className="card-body">
                                    <img src={Add} width="230" height="200" />
                                    <h5>Add to Buffer Pool</h5>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="col-sm-3 ">
                        <a className="text-decorate" onClick={handleClick}>
                            <div className="card card-cust">
                                <div className="card-body text-decorate" >
                                    <img src={Recruit} width="230" height="200" />
                                    <h5>Employee Allocation</h5>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>

            </div>
            { }


        </div>


    )
}