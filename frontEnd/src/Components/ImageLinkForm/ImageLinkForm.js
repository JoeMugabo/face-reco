import React from 'react'
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
    return (
    <div>
        <p className='f3'>
            {'These lazy sleepy eyes will detect any face in a picture! Just give it a try..'}    
        </p>
      <div className='center'> 
         <div className='form center br3 shadow-5 pa4'>
              <input className='center f4 pa2 w-70' type='text' onChange={onInputChange} />
              <button className='f4 w-30 pa2  ph3 grow link' style={{ background: '#bacdc3' }} onClick={ onPictureSubmit } >Detect</button>
         </div>
      </div>
    </div>
    )
}

export default ImageLinkForm;