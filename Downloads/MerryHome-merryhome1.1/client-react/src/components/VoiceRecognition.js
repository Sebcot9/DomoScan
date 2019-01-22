import React, { PropTypes, Component } from 'react'
import {isConfigured} from '../utils/authservice'
import { Button, Glyphicon } from 'react-bootstrap'
import SpeechRecognition from 'react-speech-recognition'

import {getExpressions, sendRequest, subscribeToEvent} from '../utils/serverhome-api'
import {searchRequest} from '../utils/voice-helper'

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
};

class VoiceRecognition extends Component {
    
    constructor(props){
        super(props);
        this.state = { expressions: [],
                       conversation: []};
    }

    componentDidMount(){
        if(!isConfigured()) return;
        var self= this;
        getExpressions().then((expressions)=>{
            self.setState({"expressions": expressions});
            self.subscribeServerSays();
            if(self.props.recognition){
                self.props.recognition.onresult = function(event) {
                    var result=event.results[event.results.length-1];
                    if(result.isFinal){
                        var objRequest = searchRequest(result[0].transcript, expressions);
                        console.log({"transcript": result[0].transcript,
                                     "data": objRequest});
                        if(objRequest && objRequest.plugin){
                            self.sendData(objRequest);
                        }
                    }
                };
            }
        });
        
    }
    
    subscribeServerSays(){
        subscribeToEvent("serversays", function (data){
            var utterThis = new SpeechSynthesisUtterance(data);
            utterThis.lang = 'fr-FR';
            console.log({"event server says":data});
            window.speechSynthesis.speak(utterThis);
        });
    }
    
    sendData(objRequest){
        sendRequest(objRequest.plugin, objRequest.action, objRequest.data).then((data)=>{
            if(data.resultText){
                var utterThis = new SpeechSynthesisUtterance(data.resultText);
                utterThis.lang = 'fr-FR';
                console.log({"response":data.resultText});
                window.speechSynthesis.speak(utterThis);
            }
        });
    }

    render() {
        const { startListening, stopListening, browserSupportsSpeechRecognition } = this.props;
        
        if(!isConfigured()){
            return <div>Configurer le server de merry home ;)</div>;
        }
        
        if (!browserSupportsSpeechRecognition) {
            return <div>Pour utiliser la reconnaissance vocale, merci d'utiliser google chrome ;)</div>;
        }

        return (
            <div>
               <Glyphicon glyph="comment" className={"voice-icon "+(this.props.listening  ? "listening" : "")} />
               { this.props.listening  ? 
                <Button bsStyle="danger" onClick={stopListening}><Glyphicon glyph="stop" /> stop </Button> : 
                <Button bsStyle="info" onClick={startListening }><Glyphicon glyph="play" /> start </Button> }
            </div>
        );
    };
};

VoiceRecognition.propTypes = propTypes;

const options = {
  autoStart: false
};

export default SpeechRecognition(options)(VoiceRecognition);