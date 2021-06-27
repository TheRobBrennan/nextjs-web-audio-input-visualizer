import { Component } from "react"
import AudioVisualizer from "./AudioVisualizer"

class AudioAnalyzer extends Component {
  constructor(props) {
    super(props)
    this.state = { audioData: new Uint8Array(0) }
    this.tick = this.tick.bind(this)
  }

  componentDidMount() {
    // Create a Web Audio API AudioContext object
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)()

    // Create a Web Audio API AnalyserNode
    this.analyser = this.audioContext.createAnalyser()

    // An unsigned integer, representing the window size of the Fast Fourier Transform (FFT), given in number of samples.
    const fftSize = this.analyser.frequencyBinCount
    // const fftSize = Math.pow(2, 10) // Must be a power of 2 between 2^5 and 2^15: 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, and 32768. Defaults to 2048.

    // Store the waveform data that the AnalyserNode will be creating
    this.dataArray = new Uint8Array(fftSize)

    // We passed the media stream from the microphone into this component as a prop. We need to turn it into a source for the Web Audio API.
    this.source = this.audioContext.createMediaStreamSource(this.props.audio)

    // Connect the AnalyserNode to to our audio stream
    this.source.connect(this.analyser)

    // Kick off the animation loop
    this.rafId = requestAnimationFrame(this.tick)
  }

  tick() {
    // Copy the current waveform as an array of integers into the dataArray
    this.analyser.getByteTimeDomainData(this.dataArray)

    // Update the component's state with the new waveform data
    this.setState({ audioData: this.dataArray })

    // Convert our Uint8Array to a regular JavaScript array for debugging
    // console.log(Array.from(this.dataArray).join(","))

    // Call upon the browser's requestAnimationFrame API to grab the next set of data
    this.rafId = requestAnimationFrame(this.tick)
  }

  componentWillUnmount() {
    // Clean up our resources by canceling the animation frame and disconnecting the audio nodes
    cancelAnimationFrame(this.rafId)
    this.analyser.disconnect()
    this.source.disconnect()
  }

  render() {
    return (
      <>
        <AudioVisualizer audioData={this.state.audioData} />
      </>
    )
  }
}

export default AudioAnalyzer
