import React from 'react'
import { StyleSheet, View, Text, Image } from "react-native";
import theme from '../config/theme';

const UserTalentSection = (props) => {
    const { talents } = props
    if (talents === undefined || talents.length === 0) {
        return (
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 25,
                    marginTop: "10%"
                }}>
                <Text style={{ fontSize: 18, color: 'tomato' }}>
                    No Talents Added yet.
  </Text>
                <Image
                    source={require('../assets/broke.png')}
                    style={{ width: "41%", height: 160, marginHorizontal: 100, marginTop: "5%" }}
                />
            </View>
        )
    }
    return (
        <View style={styles.container}>
            {props.talents.map((t, key) => (
                <>
                    <Text
                        style={styles.title}
                    >
                        {t.category.title}
                    </Text>
                    <View
                        style={styles.row}
                    >
                        <View
                            style={{
                                padding: 5,
                                alignItems: 'flex-start',
                                justifyContent: 'center'
                            }}
                        >
                            <Text>Level</Text>
                            <Text>
                                {t.level == '1'
                                    ? "Beginner"
                                    : t.level == '2'
                                        ? "Average"
                                        : t.level == '3'
                                            ? "Good"
                                            : t.level == '4'
                                                ? "Excellent"
                                                : "Experienced"
                                }
                            </Text>
                        </View>
                        <View
                            style={{
                                padding: 5,
                                alignItems: 'flex-start',
                                justifyContent: 'center'
                            }}
                        >
                            <Text>Experience</Text>
                            <Text>{t.chars.years} Years</Text>
                        </View>
                        <View
                            style={{
                                padding: 5,
                                alignItems: 'flex-start',
                                justifyContent: 'center'
                            }}
                        >
                            <Text>Works</Text>
                            <Text>{t.chars.films}</Text>
                        </View>
                    </View>
                    <Text
                        style={{
                            marginTop: 10,
                            fontWeight: 'bold'
                        }}
                    >
                        Description
                </Text>
                    <Text
                        style={{
                            color: theme.$primaryColorText,
                            marginBottom: 15
                        }}
                    >
                        {t.description}
                    </Text>
                    <View style={{ borderBottomWidth: 1, marginTop: 5, marginBottom: 5, borderBottomColor: "f1f1f1" }}>

                    </View>
                </>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 8,
        marginBottom: 15
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 17,
        color: "#555",
    }
})

export default UserTalentSection;