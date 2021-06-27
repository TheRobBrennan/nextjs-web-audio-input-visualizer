import { Component } from "react"
import AudioAnalyzer from "./AudioAnalyzer"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      audio: null,
    }
    this.toggleMicrophone = this.toggleMicrophone.bind(this)
  }

  async getMicrophone() {
    try {
      const audio = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      })
      this.setState({ audio })
    } catch (e) {
      window.alert(`Sorry. This will not work for you.\n\n${e}`)
    }
  }

  stopMicrophone() {
    this.state.audio.getTracks().forEach((track) => track.stop())
    this.setState({ audio: null })
  }

  toggleMicrophone() {
    if (this.state.audio) {
      this.stopMicrophone()
    } else {
      this.getMicrophone()
    }
  }

  render() {
    return (
      <div className="App">
        <div className="controls">
          <button onClick={this.toggleMicrophone}>
            {this.state.audio ? "Stop microphone" : "Get microphone input"}
          </button>
        </div>
        {this.state.audio ? <AudioAnalyzer audio={this.state.audio} /> : ""}
      </div>
    )
  }
}

export default App
