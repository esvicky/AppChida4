// @flow
import autobind from "autobind-decorator";
import React, {Component} from "react";
import {View, Text} from "react-native";
import {Switch, List, ListItem, Body, Right} from "native-base";
import {observable, action} from "mobx";
import { observer } from "mobx-react/native";

import SettingsStore from "./SettingsStore";

import {BaseContainer, Styles, Avatar, Field} from "../components";

import variables from "../../native-base-theme/variables/commonColor";

@observer
export default class Phone extends Component {

}
