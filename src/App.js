// Packages
import React, { Component } from 'react';
import Clarifai from 'clarifai';

// import Particles from 'react-particles-js';

// Files
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'

// const particleOptions = {
//   particles: {
//     number: {
//       value: 0,
//       density: {
//         enable: true,
//         value_area: 800
//       }
//     }
//   }
// }

const app = new Clarifai.App({
  apiKey: "6e4c14383f7545dba42f46a3bf843750"
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: "signin",
      bSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});

    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {

    if(route === "signout")
      this.setState({ bSignedIn: false });
    else if(route === "home")
      this.setState({ bSignedIn: true });

    this.setState({ route: route});
  }

  render() {
    return (
      <div className="App">
        {/* <Particles 
          className="particles"
          params={particleOptions} 
        /> */}
        <Navigation bSignedIn={this.state.bSignedIn} onRouteChange={this.onRouteChange} />
        {
          this.state.route === "home" ? 
          <div>
            <Logo />
            <Rank />

            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
          </div>
          : (this.state.route === "signin" ? <SignIn onRouteChange={this.onRouteChange}/> : <Register onRouteChange={this.onRouteChange}/>)
          
          
        }         
          
      </div>
    );
  }
}

export default App;
