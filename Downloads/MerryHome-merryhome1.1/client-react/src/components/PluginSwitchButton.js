import React, { Component } from 'react'
import Switch from 'react-bootstrap-switch'
import {sendRequest} from '../utils/serverhome-api'
 
class PluginSwitchButton extends Component {
    
    handleSwitch(elem, state) {
        console.log('handleSwitch. elem:', elem);
        console.log('name:', elem.props.name);
        console.log('new state:', state);
        sendRequest(this.props.pluginName, this.props.action, {device:this.props.device, value:state}).then((data)=>{
           console.log(data);
       });
    }
    
    render() {
        return (
            <div className="switch-button">
                <span><strong>{this.props.name}</strong></span><br/>
                <span>device : {this.props.device}</span><br/><br/>
                <Switch defaultValue={this.props.data} onChange={(el, state) => this.handleSwitch(el, state)} name={this.props.name} />
            </div>
        );
    }
};


export default PluginSwitchButton;