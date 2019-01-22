import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { PageHeader, Glyphicon} from 'react-bootstrap'
import {isConfigured} from './utils/authservice'
import {initSocket} from './utils/serverhome-api'
import MenuPanel from './components/MenuPanel'
import PluginPage from './components/PluginPage'
import ConfigServerPage from './components/ConfigServerPage'
import VoiceRecognition from './components/VoiceRecognition'
import './App.css';

class App extends Component {
    
    componentDidMount(){
        if(isConfigured()){
            initSocket();
        }
    }
  
    render() {
        return (
            <div className="App">
                <MenuPanel />
                <PageHeader><Glyphicon glyph="home" style={{color:"#5bc0de"}} /> MerryHome</PageHeader>
                <Router>
                    <div>
                        <Route exact path="/" component={VoiceRecognition}/>
                        <Route path="/plugin/:pluginName" component={PluginPage}/>
                        <Route path="/configserver" component={ConfigServerPage}/>
                    </div>
                </Router>
            </div>
        );
    }
};

export default App;
