import { View, Text, Image, StyleSheet, ImageBackground, Animated } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useRef } from 'react';

import quadro1 from '../assets/HomeScreen/Quadro 1.png'
import quadro2 from '../assets/HomeScreen/Quadro 2.png'
import fotoQuadro1 from '../assets/HomeScreen/Quadro 1 Imagem.png';
import fotoQuadro2 from '../assets/HomeScreen/Quadro 2 Imagem.png';
import rosa from '../assets/HomeScreen/Rosa.png';
import coracoezinhos from '../assets/HomeScreen/Coraçõeszinhos.png'
import background from '../assets/HomeScreen/BackgroundHome.png';

export function HomeScreen() {

    // Fontes
    const [fontsLoaded] = useFonts({
        'LoveYaLikeASister': require('../assets/fonts/Love_Ya_Like_A_Sister/LoveYaLikeASister-Regular.ttf'),
    });

    // Animações - Movidas para dentro do componente
    const fadeTitle = useRef(new Animated.Value(0)).current;
    const fadeQuadro1 = useRef(new Animated.Value(0)).current;
    const fadeQuadro2 = useRef(new Animated.Value(0)).current;
    const fadeRosa = useRef(new Animated.Value(0)).current;
    const fadeCoracoes = useRef(new Animated.Value(0)).current;
    const fadeTextos = useRef(new Animated.Value(0)).current;

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    useEffect(() => {
        // Sequência de animações
        Animated.sequence([
            // Título
            Animated.timing(fadeTitle, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            // Primeiro quadro
            Animated.timing(fadeQuadro1, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            // Segundo quadro
            Animated.timing(fadeQuadro2, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            // Rosa e corações juntos
            Animated.parallel([
                Animated.timing(fadeRosa, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeCoracoes, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
            ]),
            // Textos finais
            Animated.timing(fadeTextos, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    if (!fontsLoaded) {
        return null;
    }

    // Corpo do componente

    return (
        <ImageBackground
            source={background}
            style={styles.container}
            resizeMode="cover"
            onLayout={onLayoutRootView}
        >
            <View style={styles.contentContainer}>
                <Animated.Text style={[styles.title, { opacity: fadeTitle }]}>
                    O + A
                </Animated.Text>

                <View style={styles.polaroidContainer}>
                    <Animated.View style={[styles.quadroWrapper, { opacity: fadeQuadro1 }]}>
                        <Image source={quadro1} style={styles.quadro} />
                        <Image source={fotoQuadro1} style={styles.fotoQuadro} />
                    </Animated.View>

                    <Animated.View style={[
                        styles.quadroWrapper,
                        styles.quadroSegundo,
                        { opacity: fadeQuadro2 }
                    ]}>
                        <Image source={quadro2} style={styles.quadro} />
                        <Image source={fotoQuadro2} style={[styles.fotoQuadro, styles.fotoQuadro2]} />
                    </Animated.View>

                    <Animated.Image
                        source={rosa}
                        style={[styles.roseImage, { opacity: fadeRosa }]}
                    />

                    <Animated.Image
                        source={coracoezinhos}
                        style={[styles.coracoezinhos, { opacity: fadeCoracoes }]}
                    />
                </View>

                <Animated.View style={[styles.textContainer, { opacity: fadeTextos }]}>
                    <Text style={styles.message}>TE AMOOOOO!</Text>
                    <Text style={styles.subtitle}>
                        JÁ SE PASSOU UM{'\n'}ANO ESTANDO AO{'\n'}SEU LADO
                    </Text>
                </Animated.View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 48,
        fontFamily: 'LoveYaLikeASister',
        color: '#1F1F1F',
        marginBottom: 20,
    },
    polaroidContainer: {
        position: 'relative',
        width: '100%',
        height: 400,
        alignItems: 'center',
        marginBottom: 20,
    },
    quadroWrapper: {
        position: 'absolute',
        width: 236,
        height: 246,
        left: 20,
    },
    quadro: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    fotoQuadro: {
        position: 'absolute',
        width: 198,
        height: 187,
        top: 12,
        left: 17,
    },
    fotoQuadro2: {
        left: 25,
    },
    quadroSegundo: {
        top: 175,
        left: 90,
    },
    roseImage: {
        width: 81,
        height: 252,
        position: 'absolute',
        bottom: -10,
        left: 30,
        zIndex: 10,
        transform: [{ rotate: '-5deg' }],
    },
    coracoezinhos: {
        position: 'absolute',
        top: -35,
        right: -5,
        width: 87,
        height: 126,
    },
    textContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    message: {
        fontSize: 52,
        fontFamily: 'LoveYaLikeASister',
        color: '#1F1F1F',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 40,
        fontFamily: 'LoveYaLikeASister',
        color: '#1F1F1F',
        textAlign: 'center',
        lineHeight: 48,
    },
});