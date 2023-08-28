import React, { useEffect, useState } from "react";
import { Navbar,Container,NavDropdown, Nav, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLogin } from 'react-icons/ai';
import '../index.css';
import { AiFillHome } from 'react-icons/ai';
import { FaCartPlus } from 'react-icons/fa';
import { IoMdCart } from 'react-icons/io';
import { useDispatch, useSelector } from "react-redux";
import { getUserCartAction } from "../store/actions";

const Header = ({ 
    isItDashBoard,
    geners,
    setCategoryFilter,
    setPriceFilter,
    priceFilter,
    categoryiFilter,
    search, 
    setSearch
}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const CartSelector = useSelector(state => state.Reducer.Cart);
    const logout = () => {
        localStorage.removeItem("token");
        navigate('/');
    }

    
    useEffect(() => {
        if(!CartSelector) {
            try {
                dispatch(getUserCartAction());
            } catch(error) {
                console.error(error)
            }
        }
    },[])

    return(
        <>
        <Navbar variant="dark" bg="light" expand="lg" >
            <Container fluid>
                <Navbar.Collapse id="navbar-dark-example">
                    <Navbar.Brand href="/dashboard">
                        <img src="../../logo.png" style={{width:140}} />
                    </Navbar.Brand>
                        <div className="header-buttons">
                            <AiFillHome
                                color="#EE621A"
                                size={"20px"}
                                style={{ marginRight:"5px" }}
                            />
                            <Link style={{ textDecoration:"none", color: "#EE621A", }}  to="/dashboard" relative="path">
                                Home
                            </Link>
                        </div>
                        <div style={{ width:"10px" }} />
                        <div className="header-buttons">
                            <FaCartPlus
                                color="#EE621A"
                                size={"20px"}
                                style={{ marginRight:"5px" }}
                            />
                            <Link style={{ textDecoration:"none", color:"#EE621A" }}  to="/addProduct" relative="path">
                                Add New Product
                            </Link>
                        </div>
                        <div style={{ width:"10px" }} />
                        <div className="header-buttons">
                            <IoMdCart
                                color="#EE621A"
                                size={"20px"}
                                style={{ marginRight:"5px" }}
                            />
                            <Link style={{ textDecoration:"none", color:"#EE621A" }}  to="/cart" relative="path">
                                Your Cart
                            </Link>
                            {
                                CartSelector?.length > 0 &&
                                <div style={{
                                    borderRadius:"50px",
                                    backgroundColor:"#EE621A",
                                    marginLeft:"5px",
                                    width:"20px",
                                    height:"20px",
                                    display:"flex",
                                    flexDirection:"column",
                                    alignItems:"center",
                                    justifyContent:"center"
                                }}>
                                    <label style={{ color:"#FFFFFF" }}>
                                        {CartSelector.length}
                                    </label>
                                </div>
                            }
                        </div>
                </Navbar.Collapse>
                <Navbar.Collapse style={{ 
                    justifyContent:"flex-end",
                    display:"flex",
                    flexDirection:"row" 
                }}  id="navbar-dark-example">
                    <Button 
                        variant="dark"
                        style={{
                            width:"120px",
                            display:"flex",
                            flexDirection:"row",
                            alignItems:"center",
                            justifyContent:"space-evenly"
                        }}
                        onClick={logout}
                    >
                        <AiOutlineLogin
                            color="#FFFFFF"
                            size={"20px"}
                        />
                        Log-Out
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        
        {
            isItDashBoard && 
            <Navbar variant="light" bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Collapse id="navbar-dark-example">
                    <Nav style={{
                        width:"100%",
                        justifyContent:"space-evenly"

                    }}>
                        <Form.Control 
                            type="text"
                            placeholder="Search..."
                            style={{
                                width:"70%"
                            }}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <div style={{
                            display:"flex",
                            flexDirection:"row",
                            width:"20%",
                            justifyContent:"space-evenly"
                        }}>
                            <NavDropdown
                                id="nav-dropdown-dark-example"
                                title={categoryiFilter}
                                menuVariant="light"
                                style={{ border: "1px solid grey" }}
                            >
                                <NavDropdown.Item onClick={() => setCategoryFilter("Choose Category")}>Choose Category</NavDropdown.Item>    
                                {
                                    geners.map(gener => 
                                        <NavDropdown.Item onClick={() => setCategoryFilter(gener.genreName)} key={gener._id}>{gener.genreName}</NavDropdown.Item>    
                                    )
                                }
                            
                            </NavDropdown>

                            <NavDropdown
                                id="nav-dropdown-dark-example"
                                title={priceFilter}
                                menuVariant="light"
                                style={{ border: "1px solid grey" }}
                            >
                                <NavDropdown.Item onClick={() => setPriceFilter("Choose Price Range")}>Choose Price Range</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => setPriceFilter("Low to High")}>Low to High</NavDropdown.Item>    
                                <NavDropdown.Item onClick={() => setPriceFilter("High To Low")}>High To Low</NavDropdown.Item>    
                            
                            </NavDropdown>
                        </div>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        }
        </>
    )
}

export default Header;