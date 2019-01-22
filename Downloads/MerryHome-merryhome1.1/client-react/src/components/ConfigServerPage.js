import React from 'react'
import {setServerAuthInfo, getServerAuthInfo} from '../utils/authservice'
import { Form, FormGroup, FormControl, Col, ControlLabel, Button  } from 'react-bootstrap'

class ConfigServerPage extends React.Component {
    
    constructor(props){
        super(props);
        var serverInfo= getServerAuthInfo();
        this.state = { server: serverInfo.server ? serverInfo.server : "",
                       username: serverInfo.username ? serverInfo.username : "",
                       password: serverInfo.password ? serverInfo.password : ""};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange (event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    
    handleSubmit (event) {
        setServerAuthInfo(this.state.server, this.state.username, this.state.password);
        console.log("configuration saved");
        event.preventDefault();
    }
    
    render() {
        return (
            <div className="configuration-form">
                <Form horizontal onSubmit={this.handleSubmit}>
                <FormGroup controlId="formHorizontalServer">
                    <Col componentClass={ControlLabel} sm={2}>
                        Server
                    </Col>
                  <Col sm={10}>
                    <FormControl type="url" name="server" value={this.state.server} onChange={this.handleChange} placeholder="https://monserver.com ou http://192.168.1.xxx " />
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalUsername">
                  <Col componentClass={ControlLabel} sm={2}>
                    Username
                  </Col>
                  <Col sm={10}>
                    <FormControl type="text" name="username" value={this.state.username} onChange={this.handleChange} placeholder="Username" />
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalPassword">
                  <Col componentClass={ControlLabel} sm={2}>
                    Password
                  </Col>
                  <Col sm={10}>
                    <FormControl type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" autoComplete={true} />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col smOffset={2} sm={10}>
                    <Button type="submit">Save</Button>
                  </Col>
                </FormGroup>
              </Form>;
            </div>
        );    
    }
};

export default ConfigServerPage;