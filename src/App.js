import "./App.css";
import React, { useEffect } from "react";
function App() {
  let audioContext;
  let audioSource;
  let workletNode;
  let audioTrack = null;

  
  useEffect(() => {
  
    console.log("loaded");
  }, []);

  const handleStart = () => {
    if(!audioTrack){
          // Initialize recorder
    navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;
  navigator.getUserMedia(
    {
      audio: {
        autoGainControl: false,
        echoCancellation: false,
        googAutoGainControl: false,
        noiseSuppression: false,
      },
    },
    function (e) {
      audioContext = new AudioContext();
      // Créez un enregistreur audio
      audioSource = audioContext.createMediaStreamSource(e);

      // Créez un AudioWorkletProcessor pour la transmission audio en temps réel
      audioContext.audioWorklet
        .addModule("processor.js") // Remplacez par le chemin du fichier audio worklet processor
        .then(() => {
          workletNode = new AudioWorkletNode(audioContext, "processor");

          audioSource.connect(workletNode);
          workletNode.connect(audioContext.destination);
        });

        audioTrack = e.getAudioTracks()[0];
    },

    function (e) {
      console.error(e);
    }
  );
    }
  };

  const handleStop = () => {
    if(audioTrack){
      audioTrack.stop();
      audioTrack = null;
    }

  };

  return (
    <div>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
    </div>
  );
}

export default App;
