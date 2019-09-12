import React from 'react';

import './FaceRecognition.css'

const FaceRecognition = (props) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img id="inputimage" src={props.imageUrl} alt=" " style={{height: "auto", width: "500px"}} />
                <div 
                    className="bounding-box" 
                    style={{
                        top: props.box.topRow,
                        left: props.box.leftCol,
                        right: props.box.rightCol,
                        bottom: props.box.bottomRow
                    }}
                ></div>
            </div>
            
        </div>
    )
}

export default FaceRecognition;