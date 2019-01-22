import React from 'react'
import PluginActionButton from "./PluginActionButton"
import PluginSwitchButton from "./PluginSwitchButton"
import PluginCameraItem from "./PluginCameraItem"

export default function PluginItem(props){
    if(props.itemType==="PluginActionButton"){
        return <PluginActionButton pluginName={props.pluginName} name={props.name} icon={props.icon} action={props.action}  data={props.data}/>;
    }else if(props.itemType==="PluginSwitchButton"){
        return <PluginSwitchButton pluginName={props.pluginName} name={props.name} device={props.device} action={props.action} data={props.data}/>;
    }else if(props.itemType==="PluginCameraItem"){
        return <PluginCameraItem pluginName={props.pluginName} name={props.name} data={props.data} />;
    }else{
        return <div></div>;
    }
}