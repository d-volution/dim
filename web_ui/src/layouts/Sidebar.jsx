import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Modal from "react-modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./sidebar.scss";

Modal.setAppElement("body");

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.openShowAddLibrary = this.openShowAddLibrary.bind(this);
        this.closeShowAddLibrary = this.closeShowAddLibrary.bind(this);

        this.state = {
            profile: {
                username: null,
                picture: null,
                spentWatching: null
            },
            showAddLibrary: false,
            lists: {
                connected_hosts: [],
                libraries: []
            }
        };
    }

    openShowAddLibrary() {
        this.setState({
            showAddLibrary: true
        });
    }

    closeShowAddLibrary() {
        this.setState({
            showAddLibrary: false
        });
    }

    async componentDidMount() {
        const profile = {
            username: "Lindsey Morgan",
            picture: "https://frostsnow.com/uploads/biography/2016/01/23/lindsey-morgan.jpg",
            spentWatching: 4
        };

        const hosts = [
            { name: "Desktop", icon: "desktop", id: "1"},
            { name: "Laptop", icon: "laptop", id: "2"},
            { name: "Phone", icon: "mobile-alt", id: "3"}
        ];

        const reqLibs = await fetch("http://86.21.150.167:8000/api/v1/library/");
        const libs = await reqLibs.json();

        this.setState({
            profile,
            lists: {
                connected_hosts: this.list(hosts, "/device/"),
                libraries: this.list(libs, "/library/")
            }
        });

    }

    list(items, path) {
        return items.length !== 0 ? (
            <div className="list">
                {items.map(({ name, id }, i) => {
                    return (
                        <div className="item-wrapper" key={i}>
                            <NavLink to={path + id}>
                                <FontAwesomeIcon icon="folder"/>
                                <p>{name}</p>
                            </NavLink>
                            <button>-</button>
                        </div>
                    );
                })}
            </div>
        ) : (
            <div className="empty">
                <p>CURRENTLY EMPTY</p>
            </div>
        );
    }

    render() {
        const { profile } = this.state;

        return (
            <nav className="sidebar">
                <section className="main-part">
                    <div className="profile">
                        <img alt="icon" src={profile.picture}></img>
                        <div className="info">
                            <h4>{profile.username || "Username"}</h4>
                            <h6>{profile.spentWatching || "0"}h spent watching</h6>
                        </div>
                    </div>
                    <div className="separator"></div>
                    <form>
                        <div className="search-box">
                            <input type="text" name="search" placeholder="SEARCH"/>
                            <button type="submit">
                                <FontAwesomeIcon icon="search"/>
                            </button>
                        </div>
                    </form>
                </section>

                <section className="connected-hosts">
                    <header>
                        <h4>CONNECTED HOSTS</h4>
                    </header>
                    {this.state.lists.connected_hosts}
                </section>

                <section className="local-libraries">
                    <header>
                        <h4>LOCAL LIBRARIES</h4>
                        <button onClick={this.openShowAddLibrary}>+</button>
                        <Modal
                            isOpen={this.state.showAddLibrary}
                            contentLabel="Minimal Modal Example"
                            className="popup"
                            overlayClassName="overlay"
                        >
                            <h2>ADD LIBRARY</h2>
                            <input type="text" name="name" placeholder="NAME"/>
                            <div className="options">
                                <button onClick={this.closeShowAddLibrary}>CANCEL</button>
                                <a href="add-library/post">ADD</a>
                            </div>
                        </Modal>
                    </header>
                    {this.state.lists.libraries}
                </section>

                <section className="your-account">
                    <header>
                        <h4>YOUR ACCOUNT</h4>
                    </header>
                    <div className="list">
                        <div className="item-wrapper">
                            <NavLink to="">
                                <FontAwesomeIcon icon="wrench"/>
                                <p>Preferences</p>
                            </NavLink>
                        </div>
                        <div className="item-wrapper">
                            <NavLink to="">
                                <FontAwesomeIcon icon="door-open"/>
                                <p>Logout</p>
                            </NavLink>
                        </div>
                    </div>
                </section>
            </nav>
        );
    }
}

export default Sidebar;