// Copyright (c) 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * A simple bypass node demo.
 *
 * @class Processor
 * @extends AudioWorkletProcessor
 */
 class Processor extends AudioWorkletProcessor {
    // When constructor() undefined, the default constructor will be implicitly
    // used.
    
    constructor(){
      super();
      this.port.onmessage = (event) => {
        console.log(event)
        if(event.data == "true"){
          this.working = true;
        }else{
          this.working = false;
        }
      };
    }
  
    process(inputs, outputs, parameters) {

      if(!this.working){
        return false;
      }

      // By default, the node has single input and output.
      const input = inputs[0];
      const output = outputs[0];
  
      for (let channel = 0; channel < output.length; ++channel) {
        output[channel].set(input[channel]);
      }
  
     

      return true;
    }
  }
  
  registerProcessor('processor', Processor);