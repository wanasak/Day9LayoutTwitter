import React, { Component } from "react";
import {
    StyleSheet,
    View,
    PanResponder,
    Text,
    TouchableHighlight,
    Image,
    SegmentedControlIOS,
    ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import Util from "../src/Util";

class TwitterUser extends Component {
    constructor() {
        super();
        this.state = {
            scale: 1,
            iconTop: 95,
            bannerTop: 0,
            opacity: 0
        };
    }

    _previousTop = 0;
    _iconTop = 95;
    _scale = 1;
    _bannerTop = 0;
    _opacity = 0;
    _minTop = -192;
    _userStyles = {
        style: {
            top: 0
        }
    };
    _user = null;

    _updatePosition() {
        this._user.setNativeProps(this._userStyles);
    }

    _endMove() {
        this._previousTop = this._userStyles.style.top;
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, g) => true,
            onStartShouldSetPanResponderCapture: (e, g) => true,
            onMoveShouldSetPanResponder: (e, g) => {
                return g.dy / g.dx != 0;
            },
            onPanResponderGrant: (e, g) => true,
            onPanResponderMove: (e, gestureState) => {
                this._userStyles.style.top =
                    this._previousTop + gestureState.dy;
                this._scale = 1 + this._userStyles.style.top / 162.5;
                this._iconTop = 95 - this._userStyles.style.top / 4.16;
                this._bannerTop = 0;
                this._opacity = 0;

                if (this._userStyles.style.top < -62.5) {
                    this._scale = 0.6;
                    this._iconTop = 110;
                    this._bannerTop = -this._userStyles.style.top - 62.5;
                    this._opacity = Math.pow(
                        (-this._userStyles.style.top - 62.5) / 129.5,
                        0.5
                    );
                }
                if (this._userStyles.style.top > 0) {
                    this._userStyles.style.top = 0;
                    this._scale = 1;
                    this._iconTop = 95;
                }
                if (this._userStyles.style.top < this._minTop) {
                    this._userStyles.style.top = this._minTop;
                    this._opacity = 1;
                    this._bannerTop = 129.5;
                }

                this.setState({
                    scale: this._scale,
                    iconTop: this._iconTop,
                    bannerTop: this._bannerTop,
                    opacity: this._opacity
                });

                this._updatePosition();
            },
            onPanResponderTerminationRequest: (e, g) => true,
            onPanResponderRelease: (e, g) => this._endMove(e, g),
            onPanResponderTerminate: (e, g) => this._endMove(e, g),
            onShouldBlockNativeResponder: (e, g) => true
        });

        this.setState({
            style: {
                top: this._previousTop
            }
        });
    }

    render() {
        return (
            <View
                ref={user => (this._user = user)}
                {...this._panResponder.panHandlers}
                style={styles.userContainer}
            >
                <View style={styles.userPanel}>
                    <Image
                        style={[styles.banner, { top: this.state.bannerTop }]}
                        source={require("./img/banner.png")}
                    />
                    <View style={[styles.iconContainer, { top: this.state.iconTop, transform: [{ scale: this.state.scale }]}]}>
                        <Image
                            style={[styles.icon]}
                            source={require("./img/icon.png")}
                        />
                    </View>
                </View>
                <View style={styles.userControl}>
                    <TouchableHighlight style={styles.controlIcon}>
                        <Icon color="#8999a5" name="ios-settings" size={20} />
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.controlBtn}>
                        <Icon color="#8999a5" name="ios-people" size={20} />
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.controlBtn2}>
                        <Text style={styles.controlBtnText}>
                            Edit Personal Information
                        </Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.userInfo}>
                    <Text style={styles.userInfoName}>Github</Text>
                    <Text style={styles.userInfoAccount}>@Github</Text>
                    <View style={styles.userInfoFollow}>
                        <Text style={styles.userInfoFollowing}>
                            <Text style={styles.fontEm}>183</Text> Following
                        </Text>
                        <Text style={styles.userInfoFollower}>
                            <Text style={styles.fontEm}>83k</Text> Follower
                        </Text>
                    </View>
                </View>
                {this.state.bannerTop <= 0 ? (
                    <View />
                ) : (
                    <Image
                        style={[styles.banner, { top: this.state.bannerTop }]}
                        source={require("./img/banner.png")}
                    />
                )}
                {this.state.bannerTop <= 0 ? (
                    <View />
                ) : (
                    <Image
                        style={[
                            styles.banner,
                            {
                                top: this.state.bannerTop,
                                opacity: this.state.opacity
                            }
                        ]}
                        source={require("./img/bannerBlur.png")}
                    />
                )}
                <Text style={{
                    position: "absolute",
                    left: Util.size.width / 2 - 30,
                    fontSize: 20,
                    fontWeight: "500",
                    color: "#fff",
                    top: this.state.bannerTop + 90,
                    opacity: this.state.opacity,
                    backgroundColor: "transparent"
                }}>Github</Text>
                <View style={styles.segment}>
                    <SegmentedControlIOS
                        values={["Tweets", "Media", "Likes"]}
                        selectedIndex={0}
                        tintColor="#2aa2ef"
                    />
                </View>
                <ScrollView style={styles.detailScroll}>
                    <View style={{ backgroundColor: "#f5f8fa" }}>
                        <Image
                            style={{
                                width: Util.size.width,
                                height: 0.835 * Util.size.width,
                                resizeMode: "contain"
                            }}
                            source={require("./img/moreinfo.png")}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default TwitterUser;

const styles = StyleSheet.create({
    userContainer: {
        width: Util.size.width,
        height: Util.size.height - 50,
        backgroundColor: "#fff",
        position: "absolute",
        top: 0,
        left: 0
    },
    userPanel: {
        flex: 1,
        height: 300
    },
    userControl: {
        height: 55,
        position: "absolute",
        top: 125,
        width: 260,
        right: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    controlIcon: {
        width: 30
    },
    controlBtn: {
        borderColor: "#8999a5",
        width: 40,
        height: 30,
        borderWidth: 1,
        borderRadius: 3,
        paddingVertical: 3,
        paddingHorizontal: 5,
        alignItems: "center"
    },
    controlBtn2: {
        borderColor: "#8999a5",
        width: 180,
        height: 30,
        borderWidth: 1,
        borderRadius: 3,
        paddingVertical: 3,
        paddingHorizontal: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    controlBtnText: {
        color: "#8999a5",
        fontSize: 14
    },
    userInfo: {
        width: Util.size.width,
        top: 165,
        position: "absolute",
        paddingVertical: 15,
        paddingLeft: 15
    },
    segment: {
        top: 263,
        position: "absolute",
        left: 0,
        width: Util.size.width - 15,
        paddingLeft: 15
    },
    banner: {
        width: Util.size.width,
        height: 125,
        top: 0,
        left: 0,
        position: "absolute"
    },
    iconContainer: {
        top: 95,
        left: 10,
        borderWidth: 5,
        borderColor: "#fff",
        borderRadius: 5,
        position: "absolute"
    },
    icon: {
        height: 68,
        width: 68
    },
    detailScroll: {
        top: 300,
        position: "absolute",
        backgroundColor: "#f5f8fa",
        width: Util.size.width,
        height: Util.size.height - 350,
        borderTopWidth: Util.pixel,
        borderTopColor: "#9eacb6"
    },
    userInfoName: {
        color: "#292f33",
        fontSize: 20,
        fontWeight: "500",
        paddingBottom: 5
    },
    userInfoAccount: {
        color: "#66757f",
        paddingBottom: 5
    },
    userInfoFollow: {
        flexDirection: "row"
    },
    userInfoFollowing: {
        color: "#95a4ae",
        width: 110
    },
    userInfoFollower: {
        color: "#95a4ae",
        width: 110
    },
    fontEm: {
        color: "#292f33",
        fontWeight: "500"
    }
});
