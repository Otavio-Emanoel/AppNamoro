import { View, Text, Image, StyleSheet, Animated, Dimensions } from 'react-native';
import React, { useRef, useEffect } from 'react';
import fotoOtavio from '../assets/Otavio-Agata/Otavio.png'
import fotoAgata from '../assets/Otavio-Agata/Agata.png'

export function About({ scrollY }) {
    // Refs para animações
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(100)).current;

    // Interpolação do scroll para opacity e translateY
    const opacity = scrollY.interpolate({
        inputRange: [0, 300, 400],
        outputRange: [0, 0.5, 1],
        extrapolate: 'clamp'
    });

    const translateYAnim = scrollY.interpolate({
        inputRange: [0, 300, 400],
        outputRange: [100, 50, 0],
        extrapolate: 'clamp'
    });

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    opacity: opacity,
                    transform: [{ translateY: translateYAnim }]
                }
            ]}
        >
            <View style={styles.textContainer}>
                <Text style={styles.title}>O que mais falar dela?</Text>
                <Text style={styles.text}>
                    É o amor da minha vida, a mulher mais bela que poderia existir. Única mulher que me faz existir. Eu passaria horas falando o quanto a amo, afinal eu amo tudo dela.
                </Text>
            </View>

            <View style={styles.imageContainer}>
                <Image
                    source={fotoOtavio}
                    style={styles.image}
                />
                <Text style={styles.caption}>
                    Este sou eu, amo ela. Sou uma pessoa muito sortuda por poder estar na companhia de alguém que é a minha ancora que me mantém são mesmo em meio a tanta coisa insana neste mundo.
                </Text>
            </View>

            <View style={styles.imageContainer}>
                <Image
                    source={fotoAgata}
                    style={styles.image}
                />
                <Text style={styles.caption}>
                    E esta é ela, a mulher mais incrível que já conheci. Cada momento ao seu lado é especial, cada sorriso ilumina meu dia. Sou eternamente grato por ter você em minha vida.
                </Text>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF5EE',
        padding: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        minHeight: Dimensions.get('window').height * 0.8, // 80% da altura da tela
    },
    textContainer: {
        marginBottom: 30,
    },
    title: {
        fontSize: 32,
        fontFamily: 'LoveYaLikeASister',
        color: '#1F1F1F',
        marginBottom: 15,
        textAlign: 'center',
    },
    text: {
        fontSize: 18,
        fontFamily: 'LoveYaLikeASister',
        color: '#333',
        lineHeight: 24,
        textAlign: 'center',
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 40, // Aumentei o espaçamento entre as imagens
        paddingHorizontal: 20,
    },
    image: {
        width: 300,
        height: 231,
        borderRadius: 20,
        marginBottom: 15,
    },
    caption: {
        fontSize: 16,
        fontFamily: 'LoveYaLikeASister',
        color: '#666',
        textAlign: 'center',
        lineHeight: 22,
    },
    
})