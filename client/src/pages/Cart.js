import React, {  } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import '../index.css';
import { BsFillCartCheckFill, BsFillCartXFill } from 'react-icons/bs';
import { removeAllFromCartAction, removeFromCartAction } from "../store/actions";
import { ToastContainer, toast } from "react-toastify";


const Cart = props => {
    const dispatch = useDispatch();
    const cartSelector = useSelector(state => state.Reducer.Cart);
    const navigate = useNavigate();
    const getTotalPrice = () => {
        if(cartSelector && cartSelector.length > 0) {
             return "$" + cartSelector.map(game => game.gamePrice).reduce((a, b) => a + b).toFixed(2);
        } 
        return "$" + 0;
    }

    const getFormattedCart = () => {
        if(cartSelector) {
            let formattCart = [];
            cartSelector.forEach(item => {
                if(formattCart.filter(g => item._id === g._id).length === 0) {
                    formattCart = [ ...formattCart, item ]
                }
            })
            return formattCart.map(item => {
                return {...item, quantity: cartSelector.filter(g => g._id === item._id).length}
            });
        }
        return [];
    }

    const removeGameFromCart = (itemId) => {
        try{
            dispatch(removeFromCartAction(itemId))
            return true;
        } catch(error) {
            console.error(error);
            return false;
        }
    }

    const removeAllCart = () => {
        try{
            dispatch(removeAllFromCartAction())
            return true;
        } catch(error) {
            console.error(error);
            return false;
        }
    }
    
    
    
    return(
        <>
            <Header/>
            <ToastContainer/>
            <div style={{
                marginTop:"50px",
                display:"flex",
                flexDirection:"column",
                alignItems:"center"
            }}>
                <Button 
                    disabled={getFormattedCart().length === 0}
                    style={{
                        alignSelf:"flex-start",
                        marginLeft:"30px",
                        display:"flex",
                        flexDirection:"row",
                        alignItems:"center"
                    }}
                    className="costume-button"
                    onClick={() => {
                        if(removeAllCart()) {
                            toast.success(`Your cart was successfully proceed!`)
                        }
                    }}
                >
                    <BsFillCartCheckFill
                        color="#FFFFFF"
                        size={"25px"}
                        style={{ marginRight:"5px" }}
                    />
                    proceed to checkout
                </Button>
                <h1 style={{
                    color:"#EE621A",
                    borderBottom:"1px solid grey",
                    padding:"20px"
                }}>
                    Cart Total Price: {getTotalPrice()}
                </h1>

                <div style={{
                    display:"grid",
                    gridTemplateColumns:"900px",
                    marginTop:"20px",
                }}>
                    {
                       getFormattedCart().length > 0 ?
                       (
                            getFormattedCart()?.map((item, index) => 
                                <div
                                    key={item._id}
                                    style={{
                                        backgroundColor:"#FFFFFF",
                                        display:"grid",
                                        gridTemplateColumns:"15% 20% 45% 20%",
                                        padding:"15px",
                                        borderBottom:index !== getFormattedCart().length - 1 && "1px solid grey",
                                        cursor: "pointer",
                                        zIndex:0
                                    }}
                                >
                                    <div style={{
                                        display:"flex",
                                        flexDirection:"column",
                                        justifyContent:"space-between"
                                    }}>
                                        <Button 
                                            className="costume-button"
                                            style={{
                                                alignSelf:"flex-start",
                                                display:"flex",
                                                flexDirection:"row",
                                                alignItems:"center",
                                                justifyContent:" center",
                                                width:"100%",
                                                zIndex:1
                                            }}
                                            onClick={() => {
                                                if(removeGameFromCart(item._id)) {
                                                    toast.success(`${item.gameName} was successfully purchased!`)
                                                }

                                            }}
                                        >
                                            <BsFillCartCheckFill
                                                color="#FFFFFF"
                                                size={"20px"}
                                                style={{ marginRight:"5px" }}
                                            />
                                            
                                            BUY
                                        </Button>
                                        <Button 
                                            className="costume-button"
                                            style={{
                                                alignSelf:"flex-start",
                                                display:"flex",
                                                flexDirection:"row",
                                                alignItems:"center",
                                                justifyContent:" center",
                                                width:"100%",
                                                zIndex:1
                                            }}
                                            variant="dark"
                                            onClick={() => {
                                                if(removeGameFromCart(item._id)) {
                                                    toast.error(`${item.gameName} was successfully Removed From Your Cart`)
                                                }

                                            }}
                                        >
                                            <BsFillCartXFill
                                                color="#FFFFFF"
                                                size={"20px"}
                                                style={{ marginRight:"5px" }}
                                            />
                                            
                                            Remove
                                        </Button>
                                    </div>
                                    <div style={{
                                        display:"flex",
                                        flexDirection:"column",
                                        alignItems:"center",
                                        justifyContent:"center",
                                    }} onClick={() => navigate("/review-details/" + item._id)}>
                                        <Image
                                            src={item.gameImage[0].downloadUrl}
                                            style={{
                                                width:"100px",
                                                height:"60px",
                                                objectFit:"fill"
                                            }}
                                        />
                                    </div>
                                    <div style={{
                                        display:"flex",
                                        flexDirection:"column",
                                        justifyContent:"center",
                                    }} onClick={() => navigate("/review-details/" + item._id)}>
                                        <h4>
                                            {item.gameName}
                                        </h4>
                                    </div>
                                    <div style={{
                                        display:"flex",
                                        flexDirection:"column",
                                        justifyContent:"center",
                                    }}>
                                        <h6>
                                            quantity: X{item.quantity}
                                        </h6>
                                        <h6>
                                            Item Price: ${item.gamePrice}
                                        </h6>
                                        <h6>
                                            Sub Total Price: ${item.gamePrice * item.quantity}
                                        </h6>
                                    </div>
                                </div>
                            )
                       )
                       :
                       (
                            <div style={{
                                height:"300px",
                                display:"flex",
                                flexDirection:"column",
                                alignItems:"center",
                                justifyContent:"center"
                            }}>
                                <h1>Your Cart Is Empty</h1>
                            </div>
                       )
                    }
                </div>
            </div>
        </>
    )
}

export default Cart;