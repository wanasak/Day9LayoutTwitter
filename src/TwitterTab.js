import React, { Component } from "react";
import { StyleSheet, View, TabBarIOS } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import TwitterUser from "./TwitterUser";

class TwitterTab extends Component {
    constructor() {
        super();
        this.state = {
            selectedTab: "home"
        };
    }

    _changeTab(selectedTab) {
        this.setState({ selectedTab });
    }

    render() {
        return (
            <TabBarIOS>
                <Icon.TabBarItem
                    title="Home"
                    iconName="ios-home-outline"
                    selectedIconName="ios-home"
                    onPress={() => this._changeTab("home")}
                    selected={this.state.selectedTab === "home"}
                >
                    <TwitterUser />
                </Icon.TabBarItem>
                <Icon.TabBarItem
                    title="Notifications"
                    iconName="ios-notifications-outline"
                    selectedIconName="ios-notifications"
                    onPress={() => this._changeTab("notifications")}
                    selected={this.state.selectedTab === "notifications"}
                >
                    <TwitterUser />
                </Icon.TabBarItem>
                <Icon.TabBarItem
                    title="Mail"
                    iconName="ios-mail-outline"
                    selectedIconName="ios-mail"
                    onPress={() => this._changeTab("mail")}
                    selected={this.state.selectedTab === "mail"}
                >
                    <TwitterUser />
                </Icon.TabBarItem>
                <Icon.TabBarItem
                    title="Person"
                    iconName="ios-person-outline"
                    selectedIconName="ios-person"
                    onPress={() => this._changeTab("person")}
                    selected={this.state.selectedTab === "person"}
                >
                    <TwitterUser />
                </Icon.TabBarItem>
            </TabBarIOS>
        );
    }
}

export default TwitterTab;

const styles = StyleSheet.create({});
