import React, { Component } from 'react'
import {subscribeToEvent, emitEvent} from '../utils/serverhome-api'
import { Image, Glyphicon, Button  } from 'react-bootstrap'

class PluginCameraItem extends Component {
    
    constructor(props){
        super(props);
	this.state = { source: "",
                       start : this.props.data};
    }
    
    componentDidMount(){
        var self= this;
        subscribeToEvent(this.props.name, function(data){
            var sourceData =  'data:image/jpeg;base64,' + data.buffer ;
            self.setState({ source: sourceData});
        });
    }
    
    stopCamera(){
        emitEvent(this.props.name+".stop", this.props.name);
        this.setState({ start: false});
    }
    
    startCamera(){
        emitEvent(this.props.name+".start", this.props.name);
        this.setState({ start: true});
    }
    
    render() {
        var actionButton = !this.state.start ? 
            <Button bsSize="xsmall" bsStyle="info" onClick={this.startCamera.bind(this)}><Glyphicon glyph="play"/> </Button> : 
            <Button bsSize="xsmall" bsStyle="warning" onClick={this.stopCamera.bind(this)}><Glyphicon glyph="stop"/> </Button>;
        
        var imageCamera = !this.state.start ?
            <Image src="/videosurveillance.png" alt={this.props.name} responsive={true}/> : "";
        return (
            <div className="cameraitem">
                <h5>{this.props.name}</h5>
                {actionButton}
                <Image src={this.state.source} alt="no video" responsive={true}/>
                {imageCamera}
            </div>
        );
    }
};

export default PluginCameraItem;