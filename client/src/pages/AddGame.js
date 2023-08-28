import React, { useState } from 'react';
import Header from '../components/Header';
import './../AddGame.css';
import { Button, Col, Form, Image, Row, Spinner } from 'react-bootstrap';
import { IoMdAddCircle } from 'react-icons/io';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { ref, deleteObject, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import generateUniqueFileName from '../GenrateUniqueName';
import serverUrl from '../serverUrl';

const baseURL = serverUrl.baseUrl;

const ImagePlaceHolder = ({ isEmpty, width, height, setImage, image, array, setCanIPublish }) => {
    const [ isInProcess, setIsInProcess ] = useState(false);
    
    const deleteImageFromStorage = () => {
        const imageRef = ref(storage, "Games-Images/" + image.name);
        deleteObject(imageRef)
        .then(() => {
            setImage(array.filter(i => i.downloadUrl !== image.downloadUrl));
        })
        .catch(error => {
            console.log(error.message);
        })
    }




    const onImageSelected = (e) => {
        if (e.target.files.length) {
            const fileObj = e.target.files && e.target.files[0];
            const imageName = generateUniqueFileName();
            const imageRef = ref(storage, "Games-Images/" + imageName);
            const uploadTask = uploadBytesResumable(imageRef, fileObj);
            uploadTask.on('state_changed', 
                (snapshot) => {
                    setIsInProcess(true);
                    setCanIPublish(false)
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                    console.log(error.message);
                }, 
                () => {
                    
                    setIsInProcess(false);
                    setCanIPublish(true);
                    return getDownloadURL(uploadTask.snapshot.ref)
                    .then(downloadUrl => {
                        setImage([...array, {name: imageName, downloadUrl}]);
                    })
                }
            )
        }
    }

    const handelImageSelection = () => {
        const selector = document.getElementById("upload-button");
        selector.click();
    }
    console.log(array);
    return(
        !isEmpty ? 
        (
            <div style={{ position:"relative" }}>
            <Image 
                src={image.downloadUrl}
                style={{ 
                    width: image === array[0] ? "320px" : "150px",
                    height: image === array[0] ? "320px" : "150px",
                    margin:"10px",
                    borderRadius:"20px"
                }}
            />
            <AiFillCloseCircle
                style={{ 
                    position:"absolute",
                    zIndex:1,
                    top:25,
                    right:20
                }}
                color='#FFFFFF'
                size={"25px"}
                onClick={deleteImageFromStorage}
            />
            </div>
        )
        :
        (
            
            <button 
                className='image-Placeholder'
                style={{
                    width,
                    height,
                    margin:"10px",
                    backgroundColor: "#F8F9FA"
                }}
                onClick={handelImageSelection}
            >
                
                {
                    isInProcess ?
                    (
                        <div>
                            <Spinner animation='border' role='status'/>
                        </div>
                    )
                    :
                    (
                        <div>
                            <IoMdAddCircle
                                style={{ marginRight:"5px" }}
                                size={"30px"}
                            />
                            <label>ADD PHOTO</label>
                        </div>
                    )
                }
                <input
                    type='file'
                    style={{ display: "none" }}
                    id="upload-button"
                    onChange={onImageSelected}
                />
            </button>
            
        )
    )
}



function AddGame() {
    const navigate = useNavigate();
    const [ gameImages, setGameImages ] = useState([]);
    const [ gameName, setGameName ] = useState("");
    const [ gameGenre, setGameGenre ] = useState("");
    const [ gamePrice, setGamePrice ] = useState("$");
    const [ gameDescription, setGameDescription ] = useState("");
    const [ canIPublish, setCanIPublish ] = useState(true);

    const publishGame = (event) => {
        event.preventDefault();
        console.log("test");
        if(gamePrice === "$") {
            return;
        }
        if(gameImages.length === 0) {
            return toast.error("You have to provide atleast one image to publish your game")
        }
        const game = {
            gameName,
            gamePrice: parseFloat(gamePrice.slice(1, gamePrice.length)),
            gameDescription,
            gameGenre,
            gameImage: gameImages
        }

        axios.post(baseURL + "/game/createNewGame", { game })
        .then(results => {
            console.log(results.data);
            const { status, message } = results.data;

            if(!status) {
                toast.error(message);
            } else {
                toast.success(message);
                navigate('/dashboard')
            }
        })
        .catch(error => {
            console.error(error);
        })
    }

    return (  
        <div>
            <Header/>
            <ToastContainer/>
            <div className='image-placeholder-background'>
                {
                    gameImages.length === 0 ?
                    (
                        <ImagePlaceHolder
                            width={"1000px"}
                            height={"300px"}
                            setImage={setGameImages}
                            array={gameImages}
                            isEmpty={gameImages.length === 0}
                            setCanIPublish={setCanIPublish}
                        />
                    )
                    :
                    (
                        <div style={{
                            display:"flex",
                            flexDirection:"row",
                        }}>
                                <ImagePlaceHolder 
                                    setImage={setGameImages}
                                    image={gameImages[0]}
                                    index={0}
                                    array={gameImages}
                                    setCanIPublish={setCanIPublish}
                                />
                            <div style={{
                                display:"flex",
                                flexDirection:"row",
                                flexWrap:"wrap",
                                width:"600px",
                                
                            }}>
                            {
                                
                                gameImages.slice(1, gameImages.length).map((item, index) => 
                                    <div key={index}>
                                        <ImagePlaceHolder 
                                            setImage={setGameImages}
                                            image={item}
                                            index={index}
                                            array={gameImages}
                                            setCanIPublish={setCanIPublish}
                                        />
                                    </div>
                                )
                            }
                            {
                                gameImages.length < 7 &&
                                <ImagePlaceHolder
                                    width={"150px"}
                                    height={"150px"}
                                    setImage={setGameImages}
                                    array={gameImages}
                                    isEmpty={true}
                                    setCanIPublish={setCanIPublish}
                                />
                            }
                            </div>
                        </div>
                    )
                }
                
            </div>

            <div style={{
                display:"flex",
                flexDirection:"column",
                alignItems:"center"
            }}>
                <Form onSubmit={publishGame} style={{ width:"1000px" }}>
                    <Row>
                        <Form.Group>
                            <Form.Label style={{ color:'#EE621A' }}>
                                Game name
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="gameName"
                                size='lg'
                                required
                                value={gameName}
                                onChange={(e) => setGameName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label style={{ color:'#EE621A' }}>
                                Game genre
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="gameGenre"
                                required
                                value={gameGenre}
                                onChange={(e) => setGameGenre(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                        <Form.Label style={{ color:'#EE621A' }}>
                            Game price
                        </Form.Label>
                            <Form.Control
                                type='text'
                                name='gamePrice'
                                required
                                value={gamePrice === "" ? "$" : gamePrice}
                                onChange={(e) => setGamePrice(isNaN(e.target.value.slice(1, e.target.value.length)) ? gamePrice + "" : e.target.value)}
                            />
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group as={Col}>
                            <Form.Label style={{ color:'#EE621A' }}>
                                Game Description
                            </Form.Label>
                            <Form.Control
                                name="gameDescription"
                                multiple={true}
                                required
                                as="textarea" 
                                rows={3}
                                value={gameDescription}
                                onChange={(e) => setGameDescription(e.target.value)}
                            />
                        </Form.Group>
                    </Row>
                    <Row 
                        style={{ 
                            display:"flex",
                            flexDirection:"column",
                            alignItems:"center",
                            marginTop:"20px"
                        }}>
                        <Button 
                            size='lg'
                            variant='dark'
                            type="submit"
                            style={{ width:"60%", marginBottom:"20px" }}
                            onClick={publishGame}
                            disabled={!canIPublish}
                        >
                            Publish It!
                        </Button>
                    </Row>
                </Form>
            </div>
        </div>
    );
}

export default AddGame;


