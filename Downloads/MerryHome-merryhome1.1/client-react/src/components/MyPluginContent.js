import React from 'react';

export default function MyPluginContent(response){

    console.log(response.info);

    const marginStyle = {
        marginTop: '100px'
    };

    if(response.info.statusCode === 200){
        let url = response.info.url;
        const iframeStyle = {
            width: '100%',
            height: '500px',
        };


        return (
            <div style={marginStyle}>
                <iframe src={url} style={iframeStyle}/>
            </div>
        );
    }else if(response.info.statusCode === 404 || response.info.statusCode === 500){
        return <h1 style= {marginStyle}>Il n'y a pas de résultat pour cette recherche</h1>;
    }
}

