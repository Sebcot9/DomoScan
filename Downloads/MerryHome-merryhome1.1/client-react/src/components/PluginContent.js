import React from 'react';
import PluginItem from "./PluginItem";
import DomoScanPlugin from "./DomoScanPlugin";

export default function PluginContent(props){
    if(props.viewInfo.type==="listItem"){
        return (
            <div className={'plugincontent plugin-'+props.pluginName}>
                { props.viewInfo.items.map((item, index) => (
                    <PluginItem key={index} itemType={props.viewInfo.itemType} pluginName={props.pluginName} name={item.name} icon={item.icon} action={item.action} data={item.data} device={item.device} />
                ))}  
            </div>
        );
    } else if(props.viewInfo.type==="domoScanPlugin"){
        return (
            <div>
             <DomoScanPlugin />
            </div>
        );
    }
    else{
        return <div></div>;
    }
}

