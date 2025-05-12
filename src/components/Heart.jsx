import { View, Text, TouchableOpacity, StyleSheet, Animated, Modal } from 'react-native';
import { useEffect, useRef, useState } from 'react';

export function Heart() {
    const [progress, setProgress] = useState(0);
    const [hearts, setHearts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const progressAnim = useRef(new Animated.Value(0)).current;
    const modalScaleAnim = useRef(new Animated.Value(0)).current;
    const buttonAnimValue = useRef(new Animated.Value(0)).current;

    // Animação contínua de pulsar
    useEffect(() => {
        const pulsate = () => {
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.1,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ]).start(() => pulsate()); // Loop da animação
        };

        pulsate();
    }, []);

    
    // Animação de click com coração flutuante
    const handlePress = (event) => {
        const newHeart = {
            id: Date.now(),
            x: event.nativeEvent.locationX,
            y: event.nativeEvent.locationY,
            opacity: new Animated.Value(1),
            scale: new Animated.Value(0),
        };
        
        setHearts(prev => [...prev, newHeart]);
        setProgress(prev => {
            const newProgress = prev + 10;
            if (newProgress >= 1000) {
                showLoveModal();
            }
            return newProgress;
        });
        
        // Animação do coração flutuante
        Animated.parallel([
            Animated.timing(newHeart.scale, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.sequence([
                Animated.timing(newHeart.opacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(newHeart.opacity, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]),
        ]).start(() => {
            setHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
        });
    };
    
    // Atualiza a barra de progresso
    useEffect(() => {
        Animated.timing(progressAnim, {
            toValue: progress,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [progress]);
    
    const width = progressAnim.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
    });
    
    // Modal
    
    const showLoveModal = () => {
        setShowModal(true);
        Animated.spring(modalScaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            friction: 8,
            tension: 40
        }).start();
    };

    // Animação do modal

    const animateButton = () => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(buttonAnimValue, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.spring(modalScaleAnim, {
                    toValue: 0,
                    friction: 8,
                    tension: 40,
                    useNativeDriver: true,
                })
            ])
        ]).start(() => {
            setShowModal(false);
            modalScaleAnim.setValue(0);
            buttonAnimValue.setValue(0);
        });
    };

    const buttonScale = buttonAnimValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 1.2, 0]
    });

    const buttonRotation = buttonAnimValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    });

    // Corpo do componente

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={handlePress}
                activeOpacity={0.7}
            >
                <Animated.View style={[
                    styles.heart,
                    { transform: [{ scale: scaleAnim }] }
                ]}>
                    <Text style={styles.heartSymbol}>♥</Text>
                    {hearts.map(heart => (
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
                                        {
                                            translateY: heart.opacity.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [-50, 0]
                                            })
                                        }
                                    ]
                                }
                            ]}
                        >
                            ♥
                        </Animated.Text>
                    ))}
                </Animated.View>
            </TouchableOpacity>

            <View style={styles.progressContainer}>
                <Animated.View
                    style={[
                        styles.progressBar,
                        { width: progress <= 100 ? `${progress}%` : '100%' }
                    ]}
                />
                <Text style={styles.progressText}>{progress}%</Text>
            </View>

            <Modal
            transparent={true}
            visible={showModal}
            animationType="fade"
        >
            <View style={styles.modalOverlay}>
                <Animated.View
                    style={[
                        styles.modalContent,
                        {
                            transform: [{ scale: modalScaleAnim }]
                        }
                    ]}
                >
                    <Text style={styles.modalHeart}>♥</Text>
                    <Text style={styles.modalText}>EU TE AMO</Text>
                    <Animated.View
                        style={[
                            styles.modalButton,
                            {
                                transform: [
                                    { scale: buttonScale },
                                    { rotate: buttonRotation }
                                ]
                            }
                        ]}
                    >
                        <TouchableOpacity
                            onPress={animateButton}
                            style={styles.buttonTouchable}
                        >
                            <Text style={styles.modalButtonText}>♥</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </Animated.View>
            </View>
        </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0D0D0D',
        padding: 20,
        alignItems: 'center',
        minHeight: 300,
    },
    heart: {
        marginBottom: 20,
        position: 'relative',
        width: 300,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heartSymbol: {
        color: '#FF0000',
        fontSize: 180,
        textShadowColor: 'rgb(124, 12, 12)',
        textShadowOffset: { width: 4, height: 4 },
        textShadowRadius: 10,
    },
    floatingHeart: {
        position: 'absolute',
        color: '#FF69B4',
        fontSize: 30,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    progressContainer: {
        width: '80%',
        height: 20,
        backgroundColor: '#333',
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#FF0000',
        borderRadius: 10,
    },
    progressText: {
        position: 'absolute',
        width: '100%',
        textAlign: 'center',
        color: '#FFF',
        fontSize: 12,
        lineHeight: 20,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#FFF',
        padding: 30,
        borderRadius: 20,
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    modalHeart: {
        color: '#FF0000',
        fontSize: 60,
        marginBottom: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    modalText: {
        fontSize: 24,
        fontFamily: 'LoveYaLikeASister',
        color: '#1F1F1F',
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButton: {
        padding: 10,
        borderRadius: 50,
        backgroundColor: '#FFF',
        borderWidth: 2,
        borderColor: '#FF0000',
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#f50505',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonTouchable: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#FF0000',
        fontSize: 24,
    },
});