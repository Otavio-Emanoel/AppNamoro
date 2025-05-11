import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';

import quadro1 from '../assets/HomeScreen/Quadro 1.png'
import quadro2 from '../assets/HomeScreen/Quadro 2.png'
import fotoQuadro1 from '../assets/HomeScreen/Quadro 1 Imagem.png';
import fotoQuadro2 from '../assets/HomeScreen/Quadro 2 Imagem.png';
import rosa from '../assets/HomeScreen/Rosa.png';
import coracoezinhos from '../assets/HomeScreen/Coraçõeszinhos.png'
import background from '../assets/HomeScreen/BackgroundHome.png';

export function HomeScreen() {

    const [fontsLoaded] = useFonts({
        'LoveYaLikeASister': require('../assets/fonts/Love_Ya_Like_A_Sister/LoveYaLikeASister-Regular.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <ImageBackground
            source={background}
            style={styles.container}
            resizeMode="cover"
            onLayout={onLayoutRootView}
        >
            <View style={styles.contentContainer}>
                <Text style={styles.title}>O + A</Text>
                
                <View style={styles.polaroidContainer}>
                    {/* Primeiro quadro */}
                    <View style={styles.quadroWrapper}>
                        <Image
                            source={quadro1}
                            style={styles.quadro}
                        />
                        <Image
                            source={fotoQuadro1}
                            style={styles.fotoQuadro}
                        />
                    </View>

                    {/* Segundo quadro */}
                    <View style={[styles.quadroWrapper, styles.quadroSegundo]}>
                        <Image
                            source={quadro2}
                            style={styles.quadro}
                        />
                        <Image
                            source={fotoQuadro2}
                            style={[styles.fotoQuadro, styles.fotoQuadro2]}
                        />
                    </View>

                    {/* Rosa */}
                    <Image
                        source={rosa}
                        style={styles.roseImage}
                    />

                    {/* Corações */}
                    <Image 
                        source={coracoezinhos}
                        style={styles.coracoezinhos}
                    />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.message}>TE AMOOOOO!</Text>
                    <Text style={styles.subtitle}>JÁ SE PASSOU UM{'\n'}ANO ESTANDO AO{'\n'}SEU LADO</Text>
                </View>
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
        left: 80,
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