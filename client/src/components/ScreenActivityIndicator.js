import '../index.css';



function ScreenActivityIndicator() {
    return (
        <div style={{ 
            width:"100%",
            height:"100vh",
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
        }}>
            <div className='loading-container'>
                <h1 style={{
                    color:"#EE621A",
                    fontFamily:"ExtraBold"
                }}>
                    Loading...
                </h1>

                <div style={{ 
                    marginTop:"20px",
                    width:"50%",
                    display:"flex",
                    flexDirection:"column",
                    position:"relative"
                }}>
                    <div 
                        className='animation'
                        style={{
                            backgroundColor: "#EE621A",
                            borderRadius:"20px",
                            width:"0%",
                            height:"5px",
                            position:"absolute"
                        }}
                    />
                </div>
            </div>
        </div>  
    );
}

export default ScreenActivityIndicator;