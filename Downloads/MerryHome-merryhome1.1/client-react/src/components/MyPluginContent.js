import React from 'react';

export default function MyPluginContent(response){

    console.log(response);

    const marginStyle = {
        marginTop: '50px'
    };

    if(response.info.statusCode === 200){
        let url = response.info.url;
        const iframeStyle = {
            width: '100%',
            height: '200vh'
        };

        
        const titleStyle = {
            color: 'red',
            marginBottom: '10px'
        };


        return (
            <div style={marginStyle}>
                <h2 style={titleStyle}>Bonne lecture !</h2>
                <iframe src={url} style={iframeStyle} scrolling="no"/>
            </div>
        );
    }else if(response.info.statusCode === 404 || response.info.statusCode === 500){
        return <h2 style= {marginStyle}>Il n'y a pas de résultat pour cette recherche</h2>;
    }else{
        return <h2 style= {marginStyle}>Veuillez recommencer</h2>;

    }
}

