import React, { Component } from 'react';
import Axios from 'axios';
import Card from './card';
import Timeline from './timeline';
import Table from './table';
import warehouse from '../FrontEndAssets/warehouse.svg';
import destination from '../FrontEndAssets/destination.svg';
import '../stylesheets/table.css';
import '../stylesheets/timeline.css';

class MainContent extends Component{

    constructor(props){
        super(props);
        this.id_token = "tTU3gFVUdP";
        this.email = "ratnabalidutta26@gmail.com";
        this.name = "ratnabali";

        this.ITEMS = [];
        this.state = {
            shipments: [],
            STAT: 'Delivered',
            AWB: 68816237,
        };
        this.handleClick = this.handleClick.bind(this);
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
            this.setState({shipments: items, STAT: "Delivered", AWB: 68816237});
        })
        .catch((err) => console.log(err));
    }

    handleClick = params => (e) => {
        const { shipments, STAT , AWB} = this.state;
        switch(params){
            case 'DEL': this.setState({shipments: shipments, STAT:'Delivered', AWB: AWB});
            break;
            case 'INT': this.setState({shipments: shipments, STAT:'In Transit', AWB: AWB});
            break;
            case 'OOD': this.setState({shipments: shipments, STAT:'Out for Delivery', AWB: AWB});
            break;
            case 'DEX': this.setState({shipments: shipments, STAT:'Undelivered', AWB: AWB});
            break;
            case 'NFI': this.setState({shipments: shipments, STAT:'No Information Yet', AWB: AWB});
            break;
            default : this.setState({shipments: shipments, STAT:'Delivered', AWB: AWB});
        }
    }

    handleRow = params => (e) => {
       const { shipments, STAT, AWB } = this.state;
       if (STAT != 'No Information Yet'){
           this.setState({shipments: shipments, STAT: STAT, AWB: params})
       }
       else return 0;
    }

    render() {

        const { shipments, STAT, AWB } = this.state;
        let i, j, count = [];
        let scan = [], scanArray = [];
        if (STAT == 'No Information Yet'){
              scan = [{time: "0-0-0 00:00:00:00",
                       location: "No information",
                       status_detail: "NO INFORMATION YET"
                     }]
              scanArray[0] = scan;
        }
        else {
              shipments.map((items, index) => {
                if(items.awbno == AWB){
                   scan = items.scan;
                   scanArray[index] = scan;
                }
        });
        }


        for(i in shipments){
            let t = shipments[i].scan;
            for(j in t){
                const { time, location } = t[j];
            }
            count.push(parseInt(j) + 1);
        }
        let k = 0;
        let counters = {
            ood: 0,
            intt: 0,
            del: 0,
            dex: 0,
            nfi: 0,
        };

        shipments.map( items => {
            switch(items.current_status_code){
                case "DEL" : counters.del++;
                break;
                case "INT" : counters.intt++;
                break;
                case "DEX" : counters.dex++;
                break;
                case "OOD" : counters.ood++;
                break;
                case "NFI" : counters.nfi++;
                break;
                default: break;
            }
            return 1;
        });


        return(
            <div className="container-fluid">
            <div className = "d-flex justify-content-center">

               <Card
                     type = "DEL"
                     num = {counters.del}
                     onClick={this.handleClick("DEL")}
               />
               <Card type = "INT" num = {counters.intt} onClick={this.handleClick("INT")} />
               <Card type = "OOD" num = {counters.ood} onClick={this.handleClick("OOD")}/>
               <Card type = "DEX" num = {counters.dex} onClick={this.handleClick("DEX")}/>
               <Card type = "NFI" num = {counters.nfi} onClick={this.handleClick("NFI")}/>
            </div>
            <div className="row">
            <div className="col-4 timeline-view">

            <img src = {destination} height="40" width="40" alt="destination" 
                 className="timeline-icon d-flex justify-content-start" />

            {scan.map((scanArray) => {
                const {time, location} = scanArray;
                const  date = new Date(time);
                let format = date.toLocaleDateString({day: "numeric"});

                let formatTime = date.toLocaleTimeString();
                return (
                       <React.Fragment>
                           <Timeline
                                    scanStat = {location}
                                    scanDate = {format}
                                    scanTime = {formatTime}
                            />
                       </React.Fragment>
                     )
                })
            }

            <img src = {warehouse} height="40" width="40" alt="warehouse"
                 className="timeline-icon d-flex justify-content-start" />

            </div>
            <div className="col-8">
            <table className="table-responsive">
                <thead>
                   <tr>
                       <th>AWB NUMBER</th>
                       <th>TRANSPORTER</th>
                       <th>SOURCE</th>
                       <th>DESTINATION</th>
                       <th>BRAND</th>
                       <th>START DATE</th>
                       <th>ETD</th>
                       <th>STATUS</th>
                   </tr>
                </thead>
                {shipments.map(items => {
                    const { _id, awbno, carrier, pickup_date, current_status, from, to } = items;
                    const time = new Date(pickup_date);
                    const format = time.toLocaleDateString({day: 'numeric'});
                       if (current_status === STAT) return(
                            <React.Fragment>
                                <Table
                                    key = {_id}
                                    awb = {`#${awbno}`} 
                                    transport = {carrier}
                                    src = {from} 
                                    dest = {to}
                                    brand = {carrier}
                                    start = {format}
                                    etd = {format}
                                    stat = {current_status}
                                    onClick = {this.handleRow(awbno)}
                                 />
                            </React.Fragment>
                        )
                    })
                }
                </table>
                </div>
                </div> 
            </div>
        );
    }
}

export default MainContent;
