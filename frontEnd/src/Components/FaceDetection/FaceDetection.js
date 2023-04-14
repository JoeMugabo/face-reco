import React from 'react'
import './FaceDetection.css'

const FaceDetection = ({ imageUrl, box }) => {
    return (
    <div className='center ma'>
        <div className='absolute mt2'>
            <img id='image' alt='' src={imageUrl} width='500px' height= 'auto' />
            <div className='boundingBox' style={{left: box.leftCol, top: box.topRow, right: box.rightCol, bottom: box.bottomRow }}></div>
        </div>   
    </div>
    )
}

export default FaceDetection;