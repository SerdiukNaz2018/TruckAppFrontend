import React from "react";
import classes from "./BrandInfo.module.css";
import { Component } from "react";
import axios from 'axios';
import Spinner from '../UI/Spinner/Spinner';

class BrandInfo extends Component {
    state = {
        loading: false,
        brandSearch: 'MAN_SE',
        country: 'Germany',
        imagePath: 'https://upload.wikimedia.org/wikipedia/commons/5/54/Logo_MAN.png',
    }

    searchforBrand = () => {
        this.setState({loading: true});
        axios
            .get(`http://localhost:8088/api/about/{${this.state.brandSearch}}`)
            .then(response => {
                this.setState({country: response.data.country, imagePath: response.data.imagePath, loading: false});
            })
            .catch(error => {
                console.log(error);
            });
    };

    setBrand = event => {
        this.setState({brandSearch: event.target.value});
        this.searchforBrand();
    }

    render() {
        return (
            <div className={classes.BrandInfo}>
                <select
                    name="brand"
                    id="brand"
                    defaultValue={this.state.brandSearch}
                    onChange={event => this.setBrand(event)}
                >
                    <option value="MAN_SE">MAN</option>
                    <option value="Renault">RENAULT</option>
                    <option value="Tata_Group">TATA</option>
                    <option value="DAF_Trucks">DAF</option>
                    <option value="Iveco">IVECO</option>
                    <option value="Mercedes-Benz">
                        Mercedes-Benz
                    </option>
                    <option value="Volkswagen">Volkswagen</option>
                    <option value="Volvo">VOLVO</option>
                    <option value="GAZ">GAZ</option>
                    <option value="Kamaz">KAMAZ</option>
                    <option value="UAZ">UAZ</option>
                    <option value="ZiL">ZIL</option>
                    <option value="KrAZ">KRAZ</option>
                    <option value="Minsk_Automobile_Plant">MAZ</option>
                    <option value="ZAZ">ZAZ</option>
                </select>
                {
                    this.state.loading ? <Spinner /> :
                    <React.Fragment>
                        <p>country: <strong>{this.state.country}</strong></p><br/>
                        <img src={this.state.imagePath} height = "200px" width="350px" alt="brandLogo"/>
                    </React.Fragment>
                }
            </div>
        );
    }
}

export default BrandInfo;
