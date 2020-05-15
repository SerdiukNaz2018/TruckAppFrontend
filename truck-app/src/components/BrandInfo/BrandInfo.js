import React from "react";
import classes from "./BrandInfo.module.css";
import { Component } from "react";
import axios from "axios";
import Spinner from "../UI/Spinner/Spinner";

class BrandInfo extends Component {
    state = {
        loading: false,
        brandSearch: "MAN_SE",
        country: "Germany",
        imagePath:
            "https://upload.wikimedia.org/wikipedia/commons/5/54/Logo_MAN.png",
    };

    searchforBrand = () => {
        this.setState({ loading: true });
        axios
            .get(`http://localhost:8088/api/about/${this.state.brandSearch}`)
            .then(response => {
                this.setState({
                    country: response.data.country,
                    imagePath: response.data.imagePath,
                    loading: false,
                });
            })
            .catch(error => {
                this.setState({ loading: false });
                console.log(error);
            });
    };

    setBrand = event => {
        this.setState({ brandSearch: event.target.value });
    };

    render() {
        return (
            <div className={classes.BrandInfo}>
                <select
                    name="brand"
                    id="brand"
                    defaultValue={this.state.brandSearch}
                    onChange={event => {
                        console.log(event.target.value);
                        this.setBrand(event);
                    }}
                >   
                    <option value="bmw">BMW</option>
                    <option value="Mercedes-Benz">Mercedes-Benz</option>
                    <option value="Audi">Audi</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Honda">Honda</option>
                    <option value="Lexus">Lexus</option>
                    <option value="Mazda">Mazda</option>
                    <option value="Subaru">Subaru</option>
                    <option value="Kia_Motors">KIA</option>
                    <option value="MAN_SE">MAN</option>
                    <option value="DAF_Trucks">DAF</option>
                    <option value="Volkswagen">Volkswagen</option>
                    <option value="Volvo">VOLVO</option>
                    <option value="Kamaz">KAMAZ</option>
                    <option value="UAZ">UAZ</option>
                    <option value="ZiL">ZIL</option>
                </select>
                {this.state.loading ? (
                    <Spinner />
                ) : (
                    <React.Fragment>
                        <p>
                            country: <strong>{this.state.country}</strong>
                        </p>
                        <br />
                        <img
                            src={this.state.imagePath}
                            height="100px"
                            width="200px"
                            alt="brandLogo"
                        />
                    </React.Fragment>
                )}
                <div style={{ margin: "30px auto" }}>
                    <button
                        style={{
                            width: "100px",
                            borderRadius: "20px",
                            backgroundColor: "rgb(61, 83, 83)",
                            color: "white",
                        }}
                        onClick={this.searchforBrand}
                    >
                        Go!
                    </button>
                </div>
            </div>
        );
    }
}

export default BrandInfo;
