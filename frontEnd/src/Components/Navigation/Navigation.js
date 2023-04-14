import React from 'react'

const Navigation = ({ onRouteChange, userIsSignedIn }) => {
    if (userIsSignedIn) {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={ () => onRouteChange('signin') } className='f3 underline pa3 dim pointer'>signOut</p>
            </nav>
            )
    } else {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p onClick={ () => onRouteChange('signin') } className='f3 underline pa3 dim pointer'>signIn</p>
            <p onClick={ () => onRouteChange('Register') } className='f3 underline pa3 dim pointer'>Register</p>
            </nav>
        )
    }
   
}

export default Navigation;