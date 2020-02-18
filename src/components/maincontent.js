import React, { Component } from 'react';
import Axios from 'axios';
import Card from './card';



class MainContent extends Component{

    constructor(props){
        super(props);

        this.id_token = "tTU3gFVUdP";
        this. email = "ratnabalidutta26@gmail.com";
        this.name = "ratnabali";

        this.state = {
            shipments: []
        };

        this.tokenPayload = this.tokenPayload.bind(this);
    }

    tokenPayload(){

    }

    componentDidMount(){
        const config = {
            headers: {
                Authorization: `Bearer ${this.id_token}`
            }
        };

        const params = {
            name: this.name,
            email: this.email,
        };

        Axios.post (
            `https://93870v1pgk.execute-api.ap-south-1.amazonaws.com/latest/shipments/${this.name}`,
             params,
             config
        ).then(res => {
            const items = res.data.data;
            console.log(items);
        })
        .catch((err) => console.log(err));
    }


    render() {
        return(
            <div className="text-right">
            </div>
        );
    }
}

export default MainContent;
