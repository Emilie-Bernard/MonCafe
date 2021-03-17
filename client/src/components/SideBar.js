import React from 'react';
import { View, StyleSheet } from "react-native";
import { List, ListItem, Text, Container, Content, SafeAreaView } from "native-base"
import { AuthContext } from '../contexts/AuthContext';

const routes = ["Setting"];

export function SideBar({ navigation }) {
    const { logout } = React.useContext(AuthContext);

    return (
        <Container>
            <Content>
                    <List
                        dataArray={routes}
                        renderRow={data => {
                            return (
                                <ListItem
                                    button
                                    onPress={() => navigation.navigate(data)}>
                                    <Text>{data}</Text>
                                </ListItem>
                            );
                        }}
                    />

            </Content>
            <List style={{ position: 'absolute', bottom: 0, borderBottomWidth: 0}}>
                        <ListItem
                        noBorder
                            button
                            onPress={() => logout()}>
                            <Text>Se déconnecter</Text>
                        </ListItem>
                    </List>
            </Container>
    );
};