import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import Moment from 'moment';

const NotificationItem = (props) => {
    const divider = <View style={{ width: '100%', height: 1, backgroundColor: '#e6e6e6' }} />
    return (
        <>
            {
                <>
                    <View
                        style={styles.gridItem}
                        onPress={props.onSelect}
                        activeOpacity={0.7}
                    >
                        <View style={{flexDirection:'row',width:'100%', marginBottom:5}}>
                        <Text style={{fontSize:15, fontWeight:'bold', width:'80%'}}>{props.title}</Text>
                        <Text>{Moment(props.nDate).format('DD/MM/YYYY')}</Text>
                        </View>
                        <Text>{props.notification}</Text>
                    </View>
                    {divider}
                </>
            }
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    gridItem: {
        flex: 1,
        padding: 10,
        backgroundColor:'floralwhite',
        marginBottom:2
    },
    gridItemText: {
        fontFamily: 'montserrat-medium',
        fontSize: 16
    }
})

export default NotificationItem;