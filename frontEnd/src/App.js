import React, { Component } from 'react';
import Clarifai from 'clarifai';  
import Navigation from "./Components/Navigation/Navigation";
import SignIn from "./Components/SignIn/SignIn";
import Register from "./Components/Register/Register";
import Rank from './Components/Rank/Rank';
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import FaceDetection from './Components/FaceDetection/FaceDetection';
import Logo from './Components/Logo/Logo';
import ParticlesBg from 'particles-bg';
import './App.css';

const app = new Clarifai.App({
  apiKey: 'e391552cf63245cd91a43b97168d54c7'
 });

const Particles = () => {
  return (
    <>
        <div>...</div>
        <ParticlesBg
          type="cobweb" 
          bg={true} 
          num={30}
          speed={0.1}
        />
      </>
  )
};

class App extends Component {
constructor() {
  super();
  this.state = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    userIsSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      password: '',
      entries: 0,
      joined: new Date()
  }
  }
}; 

loadUser = (data) => {
  this.setState ({user: {
    id: data.id,
    name: data.name,
    email: data.email,
    entries: data.entries,
    joined: data.joined
  }})
  }  

locateFacePosition = (data) => {
  const facePosition = data.outputs[0].data.regions[0].region_info.bounding_box;
  const Image = document.getElementById('image');
  const width = Number(Image.width);
  const height = Number(Image.height);
  return {
    leftCol: facePosition.left_col * width,
    topRow:  facePosition.top_row * height,
    rightCol:  width - (facePosition.right_col * width),
    bottomRow:  height - (facePosition.bottom_row * height)
  }
};

faceDetector = (box) => {
  this.setState({box: box})
};

onInputChange = (event) => {
  this.setState({input: event.target.value})
};

onPictureSubmit = () => {
this.setState({imageUrl: this.state.input})
app.models.predict({
  id: 'face-detection',
  name: 'face-detection',
  version: '6dc7e46bc9124c5c8824be4822abe105',
  type: 'visual-detector',
}, this.state.input)
.then(res => {
  if (res) {
    fetch('http://localhost:3000/image', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          id: this.state.user.id 
      })
    })
    .then(res => res.json())
    .then(count => {
      this.setState( Object.assign(this.state.user, {entries: count}))
    })
  }
  this.faceDetector(this.locateFacePosition(res))
})
    .catch(err => console.log(err))
};

onRouteChange = (route) => {
  if (route === 'home') {
      this.setState({userIsSignedIn: true})
    }
     else if (route === 'signin') {
      this.setState ({userIsSignedIn:  false})
  }
  this.setState({ route: route })
};

  render() {
    const {box, imageUrl, userIsSignedIn, route} = this.state
    return (
      <div className="App">
        <Particles />
        <Navigation userIsSignedIn={userIsSignedIn} onRouteChange={this.onRouteChange} />
        {
          route === 'home' 
        ? <div> 
            <Logo />
            <Rank 
              name={this.state.user.name} 
              entries={this.state.user.entries} 
            />
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onPictureSubmit={this.onPictureSubmit} 
            />
            <FaceDetection 
              box={box} 
              imageUrl={imageUrl} 
             />
          </div> 
        : (
          this.state.route === 'signin' ?
          <SignIn 
            loadUser={this.loadUser} 
            onRouteChange={this.onRouteChange} 
            />
          : 
          <Register 
            loadUser={this.loadUser} 
            onRouteChange={this.onRouteChange} 
            />
        )
        
        
        };
      </div>
    );
  };
};

export default App;
