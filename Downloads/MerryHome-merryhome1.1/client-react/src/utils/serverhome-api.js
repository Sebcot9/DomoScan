import axios from 'axios';
import openSocket from 'socket.io-client';
import {getServerAuthInfo} from './authservice'

var socket = null;

export function initSocket(){
    var serverInfo= getServerAuthInfo();
    socket = openSocket(serverInfo.server);
    socket.on('connect', function(){
        socket.emit('authentication', {username: serverInfo.username, password: serverInfo.password});
    });
}

export function subscribeToEvent(name, callback) {
    if(socket!==null){
        socket.on(name, callback);
    }
}

export function emitEvent(name, data){
    if(socket!==null){
        socket.emit(name, data);
    }
}

export function getExpressions() {
    var serverInfo= getServerAuthInfo();
    const url = `${serverInfo.server}/api/expressions`;
    return axios.get(url,{
        auth: {
            username: serverInfo.username,
            password: serverInfo.password
    }}).then(response => response.data);
}

export function getPlugins() {
    var serverInfo= getServerAuthInfo();
    const url = `${serverInfo.server}/api/plugins`;
    return axios.get(url,{
        auth: {
            username: serverInfo.username,
            password: serverInfo.password
    }}).then(response => response.data);
}

export function getPluginView(pluginName) {
    var serverInfo= getServerAuthInfo();
    const url = `${serverInfo.server}/api/${pluginName}/view`;
    return axios.get(url,{
        auth: {
            username: serverInfo.username,
            password: serverInfo.password
    }}).then(response => response.data);
}

export function sendRequest(plugin, actionId, requestData){
    var serverInfo= getServerAuthInfo();
    const url = `${serverInfo.server}/api/`+plugin+'/action/'+actionId;
    return axios.post(url, requestData, {
        auth: {
            username: serverInfo.username,
            password: serverInfo.password
    }}).then(response => response.data);
 }