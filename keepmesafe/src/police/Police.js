// @flow
import React, {Component} from "react";
import {View, ScrollView} from "react-native";
import {H1, H2, H3, H4, H5, H6} from "native-base";
import {observer} from "mobx-react/native";

import {BaseContainer, Avatar, TaskOverview, Styles} from "../components";

import variables from "../../native-base-theme/variables/commonColor";

import {Firebase} from "../components";

import {Police as IPolice} from "../Model"



@observer
export default class Police extends Component {
	constructor(props){
		super(props)
		console.log(this.props)

		const {name, email, phone} = IPolice;
		this.props.name = Object.value(Firebase.getPolice("name")).toString();
	    //const email = "";// = Firebase.getPolice("email");
	    //const phone = ""; //= Firebase.getPolice("phone");
		console.log(this.props.name);
	}

    render(): React$Element<*> {
        return <BaseContainer title="Police" navigation={this.props.navigation} scrollable>
            {
                <View>
                    <View style={[Styles.header, Styles.whiteBg, Styles.center]}>
                        <Avatar size={100} />
                        <H1 style={{ marginTop: variables.contentPadding * 2 }}>{}</H1>
                    </View>
                </View>
            }
        </BaseContainer>;
    }
}
//<H3 style={{ marginTop: variables.contentPadding }}>{this.props.email}</H3>
                        //<H3 style={{ marginTop: variables.contentPadding }}>{this.props.phone}</H3>