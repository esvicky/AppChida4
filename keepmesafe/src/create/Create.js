// @flow
import autobind from "autobind-decorator";
import React, {Component} from "react";
import {observer} from "mobx-react/native";
import {StyleSheet, View, Text, Image} from "react-native";
import {H1, Button, Spinner, ListItem, Item, Body, Label} from "native-base";
import DatePicker from "react-native-datepicker";

import CreateStore from "./CreateStore";

import {BaseContainer, Styles, Images, Field, WindowDimensions} from "../components";

import variables from "../../native-base-theme/variables/commonColor";

@observer
export default class Create extends Component {

    store: CreateStore;

    componentWillMount() {
        this.store = new CreateStore();
    }

    @autobind
    async save(): Promise<void> {
        try {
            await this.store.save();
            const {datetime} = this.store;
            this.props.navigation.navigate("Calendar", { datetime });
        } catch(e) {
            alert(e.message);
        }
    }

    render(): React$Element<*> {
        const footer = (
            <Button primary full onPress={this.save}>
                {
                    this.store.loading ? <Spinner color="white" /> : <Text style={style.text}>CREATE</Text>
                }
            </Button>
        );
        return <BaseContainer title="Create New" navigation={this.props.navigation} scrollable {...{footer}}>
            <Image source={Images.lists} style={Styles.header}>
                <View style={[Styles.center, Styles.flexGrow, Styles.headerMask]}>
                    <H1 style={{ color: "white" }}>NEW TASK</H1>
                </View>
            </Image>
            <Field
                label="Title"
                onChange={title => this.store.title = title}
            />
            <Field
                label="Project"
                onChange={project => this.store.project = project}
            />
            <ListItem last>
                <Body>
                    <Item style={{ borderBottomWidth: 0 }} stackedLabel={true}>
                        <Label>Date time</Label>
                        <DatePicker
                            style={style.datePicker}
                            customStyles={datePickerStyle}
                            date={this.store.datetime}
                            mode="datetime"
                            format="YYYY-MM-DD HH:mm"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon={false}
                            onDateChange={datetime => this.store.datetime = datetime}
                        />
                    </Item>
                </Body>
            </ListItem>
        </BaseContainer>;
    }
}

const datePickerStyle = {
    dateInput: {
        borderWidth: 0,
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    dateText: {
        fontFamily: "Avenir-Book",
        fontSize: 17
    },
    dateTouchBody: {
        flex: 1
    },
    btnTextConfirm: {
        color: variables.brandPrimary
    }
};

const {width} = WindowDimensions;
const style = StyleSheet.create({
    icon: {
        color: variables.brandInfo,
        fontSize: 30
    },
    avatars: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    avatar: {
        marginRight: variables.contentPadding / 2
    },
    text: {
        color: "white"
    },
    datePicker: {
        paddingLeft: variables.listItemPadding,
        width
    }
});
