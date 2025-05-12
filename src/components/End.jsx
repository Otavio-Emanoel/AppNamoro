import { View, Text, Image, StyleSheet, Animated, Dimensions, TouchableOpacity, Vibration } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Audio } from 'expo-av';

import foto from '../assets/UsByIA.png'
import flower from '../assets/flower.png'
import petala from '../assets/petala.png'

export function End() {
    const [particles, setParticles] = useState([]);
    const [petals, setPetals] = useState([]);
    const [floatingHearts, setFloatingHearts] = useState([]);
    const [sound, setSound] = useState();

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const textShineAnim = useRef(new Animated.Value(-100)).current;

    // Função para criar partícula de brilho
    const createParticle = () => {
        const windowWidth = Dimensions.get('window').width;
        return {
            id: Date.now() + Math.random(),
            x: Math.random() * windowWidth,
            y: -20,
            opacity: new Animated.Value(1),
            scale: new Animated.Value(0),
            translateY: new Animated.Value(0),
        };
    };

    // Função para criar pétala
    const createPetal = () => {
        const windowWidth = Dimensions.get('window').width;
        return {
            id: Date.now() + Math.random(),
            x: Math.random() * windowWidth,
            y: -50,
            rotate: `${Math.random() * 360}deg`,
            opacity: new Animated.Value(1),
            translateY: new Animated.Value(0),
        };
    };

    // Função para criar coração flutuante
    const createFloatingHeart = () => {
        const windowWidth = Dimensions.get('window').width;
        return {
            id: Date.now() + Math.random(),
            x: Math.random() * windowWidth,
            y: Math.random() * 200,
            scale: new Animated.Value(0),
            opacity: new Animated.Value(0),
            translateX: new Animated.Value(0),
            translateY: new Animated.Value(0),
        };
    };

    // Carregar e tocar som
    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(
            require('../assets/Sound/click.mp3')
        );
        setSound(sound);
        await sound.playAsync();
    }

    // Limpar som quando componente for desmontado
    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    // Animação inicial
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

        // Iniciar animação de brilho do texto
        startTextShine();
        // Iniciar pétalas caindo
        startPetalsFalling();
        // Iniciar corações flutuantes
        startFloatingHearts();
    }, []);

    // Animação de brilho do texto
    const startTextShine = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(textShineAnim, {
                    toValue: 100,
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.timing(textShineAnim, {
                    toValue: -100,
                    duration: 0,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    };

    // Animação de pétalas caindo
    const startPetalsFalling = () => {
        const addPetal = () => {
            const newPetal = createPetal();
            setPetals(prev => [...prev, newPetal]);

            Animated.sequence([
                Animated.parallel([
                    Animated.timing(newPetal.translateY, {
                        toValue: Dimensions.get('window').height,
                        duration: 6000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(newPetal.opacity, {
                        toValue: 0,
                        duration: 6000,
                        useNativeDriver: true,
                    }),
                ]),
            ]).start(() => {
                setPetals(prev => prev.filter(p => p.id !== newPetal.id));
            });
        };

        setInterval(addPetal, 2000);
    };

    // Animação de corações flutuando
    const startFloatingHearts = () => {
        const addHeart = () => {
            const newHeart = createFloatingHeart();
            setFloatingHearts(prev => [...prev, newHeart]);

            const moveDistance = 30; // Distância do movimento
            const moveDuration = 1500; // Duração de cada movimento

            // Animação de flutuação
            const floatingAnimation = Animated.parallel([
                // Movimento horizontal
                Animated.sequence([
                    Animated.timing(newHeart.translateX, {
                        toValue: moveDistance,
                        duration: moveDuration,
                        useNativeDriver: true,
                    }),
                    Animated.timing(newHeart.translateX, {
                        toValue: -moveDistance,
                        duration: moveDuration,
                        useNativeDriver: true,
                    }),
                    Animated.timing(newHeart.translateX, {
                        toValue: 0,
                        duration: moveDuration,
                        useNativeDriver: true,
                    }),
                ]),
                // Movimento vertical
                Animated.sequence([
                    Animated.timing(newHeart.translateY, {
                        toValue: -moveDistance,
                        duration: moveDuration,
                        useNativeDriver: true,
                    }),
                    Animated.timing(newHeart.translateY, {
                        toValue: moveDistance,
                        duration: moveDuration,
                        useNativeDriver: true,
                    }),
                    Animated.timing(newHeart.translateY, {
                        toValue: 0,
                        duration: moveDuration,
                        useNativeDriver: true,
                    }),
                ]),
            ]);

            // Animação completa com entrada, flutuação e saída
            Animated.sequence([
                // Entrada do coração
                Animated.parallel([
                    Animated.spring(newHeart.scale, {
                        toValue: 1,
                        friction: 5,
                        useNativeDriver: true,
                    }),
                    Animated.timing(newHeart.opacity, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ]),
                // Loop de flutuação
                Animated.loop(floatingAnimation, { iterations: 2 }),
                // Saída do coração
                Animated.timing(newHeart.opacity, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                setFloatingHearts(prev => prev.filter(h => h.id !== newHeart.id));
            });
        };

        setInterval(addHeart, 3000);
    };

    // Manipulador de toque na imagem
    const handleImagePress = async () => {
        Vibration.vibrate(100);
        await playSound();

        // Criar partículas de brilho
        const newParticles = Array(5).fill().map(() => createParticle());
        setParticles(prev => [...prev, ...newParticles]);

        newParticles.forEach(particle => {
            Animated.parallel([
                Animated.timing(particle.scale, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(particle.translateY, {
                    toValue: -100,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(particle.opacity, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                setParticles(prev => prev.filter(p => p.id !== particle.id));
            });
        });
    };

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
                <TouchableOpacity onPress={handleImagePress}>
                    <Image
                        source={foto}
                        style={styles.coupleImage}
                    />
                </TouchableOpacity>

                {/* Pétalas caindo */}
                {petals.map(petal => (
                    <Animated.Image
                        key={petal.id}
                        source={petala}
                        style={[
                            styles.petal,
                            {
                                left: petal.x,
                                top: petal.y,
                                opacity: petal.opacity,
                                transform: [
                                    { translateY: petal.translateY },
                                    { rotate: petal.rotate },
                                ],
                            },
                        ]}
                    />
                ))}

                {/* Partículas de brilho */}
                {particles.map(particle => (
                    <Animated.Text
                        key={particle.id}
                        style={[
                            styles.particle,
                            {
                                left: particle.x,
                                top: particle.y,
                                opacity: particle.opacity,
                                transform: [
                                    { scale: particle.scale },
                                    { translateY: particle.translateY },
                                ],
                            },
                        ]}
                    >
                        ✨
                    </Animated.Text>
                ))}

                {/* Corações flutuantes */}
                {floatingHearts.map(heart => (
                    <Animated.Text
                        key={heart.id}
                        style={[
                            styles.floatingHeart,
                            {
                                left: heart.x,
                                top: heart.y,
                                opacity: heart.opacity,
                                transform: [
                                    { scale: heart.scale },
                                    { translateX: heart.translateX },
                                    { translateY: heart.translateY }
                                ],
                            },
                        ]}
                    >
                        ♥
                    </Animated.Text>
                ))}

                <Image
                    source={flower}
                    style={[styles.flowers, styles.flowersLeft]}
                />
                <Image
                    source={flower}
                    style={[styles.flowers, styles.flowersRight]}
                />

                {/* Texto com efeito de brilho */}
                <View style={styles.textContainer}>
                    <Text style={styles.text}>TE AMO</Text>
                    <Animated.View
                        style={[
                            styles.shine
                        ]}
                    />
                    <Text style={styles.subText}>PRA SEMPRE</Text>
                </View>
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
        zIndex: -1,
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
    }, particle: {
        position: 'absolute',
        fontSize: 20,
    },
    petal: {
        position: 'absolute',
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    floatingHeart: {
        position: 'absolute',
        color: '#FF69B4',
        fontSize: 32, // Aumentei o tamanho
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        zIndex: 10,
    },
    textContainer: {
        position: 'relative',
        overflow: 'hidden',
    },
    shine: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100%',
    },
});