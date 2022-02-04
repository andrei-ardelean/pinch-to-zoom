import './App.css';
import React, {Component} from 'react';

class App extends Component {

  distanceBetweenTouches(event) {
    const x = event.touches[0].pageX - event.touches[1].pageX;
    const y = event.touches[0].pageY - event.touches[1].pageY;

    return Math.hypot(x, y);
  }

  handlePinchToZoom() {
    const imageElement = document.getElementById('pinch');
    console.log(imageElement);

    let imageElementScale = 1;
    let start = {};

    imageElement.addEventListener('touchstart', (event) => {
      console.log('touchstart', event);
      if (event.touches.length === 2) {
        event.preventDefault();

        // Calculate where the fingers have started on the X and Y axis
        start.x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
        start.y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
        start.distance = this.distanceBetweenTouches(event);
      }
    });

    imageElement.addEventListener('touchmove', (event) => {
      console.log('touchmove', event);
      if (event.touches.length === 2) {
        event.preventDefault();
        let scale;

        // Safari provides event.scale as two fingers move on the screen
        // For other browsers just calculate the scale manually
        // if (event.scale) {
        //   scale = event.scale;
        // } else {
        
        const deltaDistance = this.distanceBetweenTouches(event);
        alert('should perform transform11');
        scale = deltaDistance / start.distance;
        // }

        imageElementScale = Math.min(Math.max(1, scale), 4);

        // Calculate how much the fingers have moved on the X and Y axis
        const deltaX = (((event.touches[0].pageX + event.touches[1].pageX) / 2) - start.x) * 2; // x2 for accelarated movement
        const deltaY = (((event.touches[0].pageY + event.touches[1].pageY) / 2) - start.y) * 2; // x2 for accelarated movement


        // Transform the image to make it grow and move with fingers
        const transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${imageElementScale})`;
        imageElement.style.transform = transform;
        // imageElement.style.WebkitTransform = transform;
        imageElement.style.zIndex = "9999";

        alert('should perform transform2');
      }
    });

    imageElement.addEventListener('touchend', (event) => {
      console.log('touchend', event);

      // Reset image to it's original format
      imageElement.style.transform = "";
      imageElement.style.WebkitTransform = "";
      imageElement.style.zIndex = "";
    });
  }

  render() {
    return (
      <div className="App">
        <div className="preview">
        <img
          src="https://s3.amazonaws.com/static-wiseup-blog.gazetadopovo.com.br/wp-content/uploads/2020/03/05180307/Ronaldinho-688x400.jpg"
          alt="passport"
          id="pinch"
          onLoad={this.handlePinchToZoom}
        />
        </div>
      </div>
    );
  }
}

export default App;
