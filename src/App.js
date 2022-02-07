import './App.css';
import React, {Component} from 'react';

class App extends Component {

  distanceBetweenTouches(event) {
    const x = event.touches[0].pageX - event.touches[1].pageX;
    const y = event.touches[0].pageY - event.touches[1].pageY;

    return Math.hypot(x, y);
  }

  handlePinchToZoom = (event) => { // arrow function
    let imageElement = document.getElementById(event.target.id);
    console.log(imageElement);

    let imageLayer = document.getElementById(event.target.id + "-layer");

    let imageElementScale = 1;
    const start = {};

    imageElement.addEventListener('touchstart', (event) => {
      if (event.touches.length === 2) {
        event.preventDefault();

        // Calculate where the fingers have started on the X and Y axis
        start.x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
        start.y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
        start.distance = this.distanceBetweenTouches(event);
      }
    });

    imageElement.addEventListener('touchmove', (event) => {
      if (event.touches.length === 2) {
        event.preventDefault();

        let scale;
        if (event.scale) {
          scale = event.scale;
        } else {
          const deltaDistance = this.distanceBetweenTouches(event);
          scale = deltaDistance / start.distance;
        }

        imageElementScale = Math.min(Math.max(1, scale), 4);

        // Calculate how much the fingers have moved on the X and Y axis
        const deltaX = (((event.touches[0].pageX + event.touches[1].pageX) / 2) - start.x) * 2; // x2 for accelarated movement
        const deltaY = (((event.touches[0].pageY + event.touches[1].pageY) / 2) - start.y) * 2; // x2 for accelarated movement

        // Transform the image to make it grow and move with fingers
        const transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${imageElementScale})`;
        imageElement.style.transform = transform;
        imageElement.style.WebkitTransform = transform;
        imageElement.style.zIndex = "9999";

        // Set full width and height for image layer
        imageLayer.style.width = "100vw";
        imageLayer.style.height = "100vh";
      }
    });

    imageElement.addEventListener('touchend', () => {

      // Reset image to it's original format
      imageElement.style.transform = "";
      imageElement.style.WebkitTransform = "";
      imageElement.style.zIndex = "";

      // Reset image layer width and height
      imageLayer.style.width = "0";
      imageLayer.style.height = "0";
    });
  }

  render() {
    return (
      <div className="App">
        <div className="main-container">
          <div className="upload-documents-container">
            <div className="section-label-container">National ID</div>
            <div className="national-id-preview-label">National ID front</div>
            <div className="preview">
              <img
                src="https://templatelab.com/wp-content/uploads/2017/08/proof-of-funds-letter-template-09.jpg"
                alt="document-front"
                id="front-image"
                onLoad={this.handlePinchToZoom}
              />
              <div id="front-image-layer" className="layer"></div>
            </div>
            <div className="national-id-preview-label">National ID back</div>
            <div className="preview">
              <img
                src="https://s3.amazonaws.com/static-wiseup-blog.gazetadopovo.com.br/wp-content/uploads/2020/03/05180307/Ronaldinho-688x400.jpg"
                alt="document-back"
                id="back-image"
                onLoad={this.handlePinchToZoom}
              />
              <div id="back-image-layer" className="layer"></div>
            </div>
          </div>
        </div>    
      </div> 
    );
  }
}

export default App;
