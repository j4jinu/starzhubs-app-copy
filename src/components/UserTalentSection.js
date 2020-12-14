import React, { useState } from 'react'
import { StyleSheet, View, Text, Image } from "react-native";
import theme from '../config/theme';
import { Rating, AirbnbRating } from 'react-native-elements';

const UserTalentSection = (props) => {
    const { talents } = props
    const [level, setLevel] = useState();

    if (talents.length === 0 || talents === undefined) {
        return (
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: '5%',
                }}>
                <Image
                    source={require('../assets/noresult1.png')}
                    style={{ height: 50, width: 50, }}
                ></Image>
                <Text style={{ fontSize: 18, color: 'tomato', marginTop: 10 }}>
                    No Talents Added
          </Text>
            </View>
        )
    }


    return (
        <View style={styles.container}>
            {talents.map((t, key) => (
                <View style={{ marginBottom: 12, borderBottomColor: '#eee', borderBottomWidth: 6 }}>
                    <View style={{ paddingHorizontal: '5%', }}>
                        <Text style={styles.title}>
                            {t.category.title}
                        </Text>
                        <View style={{ alignItems: 'flex-start', flexDirection: 'row', marginBottom: 10 }}>
                            <Rating
                                type="custom"
                                readonly
                                ratingColor={theme.$primaryColor}
                                ratingBackgroundColor="#c8c7c8"
                                ratingCount={5}
                                imageSize={15}
                                style={{ paddingVertical: 5 }}
                                startingValue={t.level}
                            />
                            <Text style={{ marginLeft: '5%', marginTop: 4 }}>
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
                        <View style={styles.subrow}>
                            <View
                                style={{
                                    padding: 5,
                                    alignItems: 'flex-start',
                                    justifyContent: 'center',
                                    width: '60%'
                                }}
                            >
                                <Text style={{ fontWeight: 'bold', color: "black", }}>Type</Text>
                                <Text style={{ color: "darkgrey", }}>
                                    {t.chars.type
                                    }
                                </Text>
                            </View>
                            <View style={styles.subrow}>
                                <View
                                    style={{
                                        padding: 5,
                                        alignItems: 'flex-start',
                                        justifyContent: 'center',
                                        width: '60%'
                                    }}
                                >
                                    <Text style={{ fontWeight: 'bold', color: "black", }}>Type</Text>
                                    <Text style={{ color: "darkgrey", }}>
                                        {t.chars.type
                                        }
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        padding: 5,
                                        alignItems: 'flex-start',
                                        justifyContent: 'center',
                                        width: '40%'
                                    }}
                                >
                                    <Text style={{ fontWeight: 'bold', color: "black", }}>Industries</Text>
                                    <Text style={{ color: "darkgrey", }}>{t.chars.industry.toString()}</Text>
                                </View>

                            </View>
                            <View style={styles.subrow}>

                                <View
                                    style={{
                                        padding: 5,
                                        alignItems: 'flex-start',
                                        justifyContent: 'center',
                                        width: '60%'
                                    }}
                                >
                                    <Text style={{ fontWeight: 'bold', color: "black", }}>Experience</Text>
                                    <Text style={{ color: "darkgrey", }}>{t.chars.years} Year Experienced</Text>
                                </View>
                                <View
                                    style={{
                                        padding: 5,
                                        alignItems: 'flex-start',
                                        justifyContent: 'center',
                                        width: '40%'
                                    }}
                                >
                                    <Text style={{ color: "black", fontWeight: 'bold', }}>Works</Text>
                                    <Text style={{ color: "darkgrey", }}>{t.chars.films} work(s) completed</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ paddingHorizontal: 5 }}>
                            <Text style={{ marginTop: 10, color: "black", fontWeight: 'bold' }}>
                                Description
                    </Text>
                            <Text
                                style={{
                                    color: "darkgrey",
                                    marginBottom: 15,
                                    justifyContent: 'center'
                                }}
                            >
                                {t.description}
                            </Text>
                            <Text
                                style={{
                                    color: "darkgrey",
                                    marginBottom: 15,
                                    justifyContent: "center",

                                }}
                            >
                                {t.description}
                            </Text>
                        </View>
                    </View>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 8,
        marginBottom: -5
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: '1%'
    },
    subrow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
        // marginVertical:'1%'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        color: "#555",
        textTransform: 'uppercase'
    }
})

export default UserTalentSection;