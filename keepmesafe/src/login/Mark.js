// @flow
import React from "react";
import {View, ViewStylePropTypes, Image} from "react-native";
import {Icon} from "native-base";
import {Images} from "../components";

import commonColor from "../../native-base-theme/variables/commonColor";

const getStyle = (size: number): ViewStylePropTypes  => {
    return {
        width: size,
        height: size,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: size / 2
    }
}

export default class Mark extends React.Component {

    render(): React$Element<View> {
        return <View style={[getStyle(200), {borderColor: "rgba(255, 255, 255, .3)", borderWidth: 1 }]}>
            <View style={[getStyle(180), { borderColor: "rgba(255, 255, 255, .5)", borderWidth: 1 }]}>
                <View style={[getStyle(150), { borderColor: "white", borderWidth: 1 }]}>
                    <View style={[getStyle(120), { backgroundColor: commonColor.white }]}>
                        <Image source={Images.mark} style={{height: 120, width: 120 }} />
                    </View>
                </View>
            </View>
        </View>;
    }
}
//<Icon name="md-checkmark" style={{fontSize: 100, color: commonColor.brandPrimary }} />