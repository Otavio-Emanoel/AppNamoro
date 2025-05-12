import { View, Text, Image, StyleSheet, Animated, Dimensions } from 'react-native';
import { useEffect, useRef } from 'react';

import foto from '../assets/UsByIA.png'
import flower from '../assets/flower.png'

export function End() {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 8,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View 
                style={[
                    styles.content,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }]
                    }
                ]}
            >
                <Image 
                    source={foto} 
                    style={styles.coupleImage}
                />
                <Image 
                    source={flower} 
                    style={[styles.flowers, styles.flowersLeft]}
                />
                <Image 
                    source={flower} 
                    style={[styles.flowers, styles.flowersRight]}
                />
                <Text style={styles.text}>TE AMO</Text>
                <Text style={styles.subText}>PRA SEMPRE</Text>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0D0D0D',
        minHeight: Dimensions.get('window').height * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    content: {
        alignItems: 'center',
        position: 'relative',
        width: '100%',
    },
    coupleImage: {
        width: 380,
        height: 444,
        zIndex: 11,
        // borderRadius: 150,
    },
    flowers: {
        width: 180,
        height: 196,
        position: 'absolute',
    },
    flowersLeft: {
        top: -20,
        left: -30,
        zIndex: 10,
    },
    flowersRight: {
        bottom: 90,
        right: -50,
        zIndex: 12,
    },
    text: {
        color: '#FFF',
        fontSize: 58,
        fontFamily: 'LoveYaLikeASister',
        marginTop: 20,
        textAlign: 'center',
        zIndex: 100,
    },
    subText: {
        color: '#FFF',
        fontSize: 42,
        fontFamily: 'LoveYaLikeASister',
        marginTop: 10,
        textAlign: 'center',
    },
});