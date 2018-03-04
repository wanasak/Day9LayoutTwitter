import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import TwitterTab from "./TwitterTab";
import Util from "./Util";

export const Twitter = () => {
    return (
        <View style={styles.twitterContainer}>
            <TwitterTab />
        </View>
    );
};

const styles = StyleSheet.create({
    twitterContainer: {
        width: Util.size.width,
        height: Util.size.height,
        backgroundColor: "#f5f8fa"
    }
});
