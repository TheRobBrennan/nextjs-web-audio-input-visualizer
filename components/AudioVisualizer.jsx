import { Component, createRef } from "react"

class AudioVisualizer extends Component {
  constructor(props) {
    super(props)

    // Create a handle onto our canvas element
    this.canvas = createRef()
  }

  componentDidUpdate() {
    // Draw a line from left to right whenever we receive new audio data
    // this.draw()
    this.drawPulsingRect()
  }

  draw() {
    /**
     * This function will take the audioData supplied as a prop and draw a line from left to right between each data point in the array.
     */
    const { audioData } = this.props

    // Canvas
    const canvas = this.canvas.current
    const height = canvas.height
    const width = canvas.width

    // Drawing context and style
    const context = canvas.getContext("2d")
    context.lineWidth = 0.5
    context.strokeStyle = "#000000"

    // Clear our rectangle when drawing each line. Look at what happens if you decide to comment this out. Neat visual effect?
    context.clearRect(0, 0, width, height)

    // Start at the left of our rectangle. X will be incremented by sliceWidth each time a line between two points has been defined
    let x = 0

    // This is the amount we will move to the right every time we draw.
    const sliceWidth = (width * 1.0) / audioData.length

    // Let's begin drawing by starting in the middle of our rectangle
    context.beginPath()
    context.moveTo(0, height / 2)

    // For each data point in our audio stream
    for (const item of audioData) {
      // Calculate the height of this point
      const y = (item / 255.0) * height

      // Define a line from our current x position to the calculated height value
      context.lineTo(x, y)

      // Move x to the right
      x += sliceWidth
    }

    // Define the final ending point of our line
    context.lineTo(x, height / 2)

    // Draw the line by applying the line width and stroke style
    context.stroke()
  }

  drawPulsingRect() {
    /**
     * This function will take the audioData supplied as a prop and draw a line from left to right between each data point in the array.
     */
    const { audioData } = this.props

    // Canvas
    const canvas = this.canvas.current
    const height = canvas.height
    const width = canvas.width

    // Drawing context and style
    const context = canvas.getContext("2d")

    // Clear our rectangle when drawing each line. Look at what happens if you decide to comment this out. Neat visual effect?
    context.clearRect(0, 0, width, height)

    // For each data point in our audio stream
    for (const item of audioData) {
      const red = item
      const green = 255 - item
      const blue = item / 2

      context.fillStyle = "rgb(" + red + ", " + green + ", " + blue + ")"
      context.fillRect(item * 2, 0, 2, 200)
    }
  }

  render() {
    return <canvas width="500" height="200" ref={this.canvas} />
  }
}

export default AudioVisualizer
