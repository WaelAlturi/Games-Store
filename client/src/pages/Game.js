import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import ScreenActivityIndicator from "../components/ScreenActivityIndicator";
import { Image } from "react-bootstrap";
import { BsCheck } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';
import { HiShoppingCart } from 'react-icons/hi';
import '../index.css';
import serverUrl from "../serverUrl";
import { useDispatch } from "react-redux";
import { getUserCartDispatch } from "../store/actions";
import { FaEdit } from 'react-icons/fa';
const baseURL = serverUrl.baseUrl;

const Game = props => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { gameId } = useParams();
    const [ game, setGame ] = useState(null);
    const [temporaryImageIndex, setTamporaryImageIndex] = useState(null);
    const [ constantImageIndex, setConstantImageIndex ] = useState(0);
    const isAvailable = game?.isAvailable;
    const gamePrice = game?.gamePrice;
    const gameDescription = game?.gameDescription;
    const gameGenre = game?.gameGenre
    
    
    const addToCart = () => {
        axios.put(baseURL + "/account/addToCart", { gameId } , {headers: { 'authorization': 'Bearer ' + JSON.parse(localStorage.getItem("token")) }} )
        .then(results => {
            try {
                dispatch(getUserCartDispatch(results.data.cart));
            } catch(error) {
                console.error(error);
            }
        })
        .catch(error => {
            console.error(error.message);
        })
    }

    useEffect(() => {
        axios.get(baseURL + "/game/getGameById/" + gameId)
        .then(results => {
            setGame(results.data.game);
        })
        .catch(error => {
            console.error(error.message)
        })
    },[gameId])

    if(!game) {
        return <ScreenActivityIndicator/> 
    }
    
    return(
        <>
            <Header/>
            <div style={{
                display:"grid",
                position:"relative"
            }}>
                <div style={{
                    position:"absolute",
                    top:10,
                    left:20,
                    display:"flex",
                    flexDirection:"row"
                }}>
                    <div 
                        style={{ 
                            display:"flex",
                            flexDirection:"row",
                            backgroundColor: "#424649",
                            justifyContent:"space-evenly",
                            alignItems:"center",
                            width:"140px",
                            padding:"10px",
                            borderRadius:"50px",
                            margin:"5px",
                            opacity: isAvailable ? 1 : 0.5,
                            cursor: "pointer"
                        }} 
                        onClick={() => navigate(`/editGame/${gameId}`)}
                    >
                        <FaEdit
                            color="#FFFFFF"
                            size={"25px"}
                        />
                        <label style={{
                            color:"#FFFFFF"
                        }}>
                            Edit Game
                        </label>
                    </div>
                </div>
                <h1 style={{
                    margin:"0 auto",
                    color:"#EE621A",
                    marginTop:"20px",
                }}>
                    {game?.gameName}
                </h1>
                <h3 style={{
                    margin:"0 auto",
                    marginBottom:"20px"
                }}>
                    {gameGenre}
                </h3>
                <div style={{
                    marginTop:"20px",
                    margin:"0 auto",
                    display:"grid",
                    gridTemplateColumns:"260px 600px",
                    padding:"10px"
                }}>
                    <div style={{
                        display:"flex",
                        flexDirection:"column",
                        justifyContent:"center",
                        
                    }}>
                        {
                            game?.gameImage?.map((item, index) => 
                                <div style={{ 
                                    position:"relative",
                                    width:"250px",
                                    height:"140px",
                                    margin:"5px",
                                    borderRadius:"20px",
                                    border: constantImageIndex === index ? "3px solid #EE621A" : temporaryImageIndex === index ? "3px solid #41a4fa" : "3px solid grey"
                                }} key={item._id}>
                                    <div className='placholder' style={{ 
                                        zIndex:-1, 
                                        width:"100%",
                                        height:"100%",
                                        position:"absolute",
                                        borderRadius:"20px",
                                    }}/>
                                    <Image
                                        onMouseOver={() => setTamporaryImageIndex(index)}
                                        onMouseLeave={() => setTamporaryImageIndex(null)}
                                        onClick={() => setConstantImageIndex(index)}
                                        src={item.downloadUrl}
                                        style={{ 
                                            zIndex:1,
                                            objectFit:"fill",
                                            width:"100%",
                                            height:"100%",
                                            borderRadius:"15px",
                                        }}
                                        className="scal-grow-up"
                                    />  
                                </div>
                            )
                        }
                    </div>
                    <div style={{
                        border:"1px solid grey",
                        height:"100%",
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"center",
                        padding:"10px",
                        borderRadius:"20px",
                    }}>
                        {
                            !temporaryImageIndex ? 
                            (
                                <Image
                                    src={game?.gameImage[constantImageIndex].downloadUrl}
                                    style={{ objectFit:"contain", maxWidth:"100%", maxHeight:"100%", borderRadius:"20px" }}
                                    
                                />
                            )
                            :
                            (
                                <Image
                                src={game?.gameImage[temporaryImageIndex].downloadUrl}
                                style={{ objectFit:"contain", maxWidth:"100%", maxHeight:"100%", borderRadius:"20px", }}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
            <div style={{  border:"1px solid #bfbfbd", margin:"25px" }} />
            <div style={{ 
                position:"relative",
                display:"flex",
                flexDirection:"column",
                alignItems:"center"
             }}>
                <div style={{
                    position:"absolute",
                    top:10,
                    right:20,
                    display:"flex",
                    flexDirection:"row"
                }}>
                    <div style={{ 
                        display:"flex",
                        flexDirection:"row",
                        backgroundColor: isAvailable ? "#02c22c" : "#f5281d",
                        justifyContent:"space-evenly",
                        alignItems:"center",
                        width:"140px",
                        padding:"10px",
                        borderRadius:"50px",
                        margin:"5px"
                    }}>
                        {
                            isAvailable ? 
                            (
                                <BsCheck
                                    color="#FFFFFF"
                                    size={"25px"}
                                />
                            )
                            :
                            (
                                <MdClose
                                    color="#FFFFFF"
                                    size={"25px"}
                                />
                            )
                        }
                        <label style={{
                            color:"#FFFFFF"
                        }}>
                            {isAvailable ? "Available" : "Unavailable"}
                        </label>
                    </div>


                    <div 
                        style={{ 
                            display:"flex",
                            flexDirection:"row",
                            backgroundColor: "#4287f5",
                            justifyContent:"space-evenly",
                            alignItems:"center",
                            width:"140px",
                            padding:"10px",
                            borderRadius:"50px",
                            margin:"5px",
                            opacity: isAvailable ? 1 : 0.5,
                            cursor: "pointer"
                        }} 
                        onClick={isAvailable && addToCart}
                    >
                        <HiShoppingCart
                            color="#FFFFFF"
                            size={"25px"}
                        />
                        <label style={{
                            color:"#FFFFFF"
                        }}>
                            Add To Cart
                        </label>
                    </div>
                </div>                
                <h2 style={{
                    fontStyle:"italic",
                    marginTop:"80px"
                }}>
                    ${gamePrice}
                </h2>
                <label style={{
                    fontSize:"30px",
                    textAlign:"center",
                    marginTop:"10px",
                    padding:"20px",
                    width:"80%"
                }}>
                    {gameDescription}
                </label>
            </div>
        </>
    )
}

export default Game;