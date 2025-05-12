import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useState, useEffect } from 'react';

export function PhotosWithDate() {
    // Array com os dados das fotos
    const [photos] = useState([
        {
            id: 1,
            image: require('../assets/PhotosWithDate/foto1.png'),
            date: '11/03/2024',
            text: 'Esta é uma das nossas primeiras fotos juntos, apenas o começo dessa nossa linda história.',
            liked: false,
            likeAnim: new Animated.Value(0),
            enterAnim: new Animated.Value(0)
        },
        {
            id: 2,
            image: require('../assets/PhotosWithDate/foto2.png'),
            date: '19/03/2024',
            text: 'Esta é uma das nossas fotos de terças de aulas vagas juntos, até hoje sinto falta delas.',
            liked: false,
            likeAnim: new Animated.Value(0),
            enterAnim: new Animated.Value(0)
        },
        {
            id: 3,
            image: require('../assets/PhotosWithDate/foto3.png'),
            date: '26/04/2024',
            text: 'Essa foto foi no interclasse de futsal e eu lembro de torcer pros dois times, foi muito legal só por estar com você.',
            liked: false,
            likeAnim: new Animated.Value(0),
            enterAnim: new Animated.Value(0)
        },
        {
            id: 4,
            image: require('../assets/PhotosWithDate/foto4.png'),
            date: '13/05/2024',
            text: 'Essa foi nos nossos intervalos juntos, eu adoro que sempre temos coisas pra falar ou fazer independente do tempo que passe.',
            liked: false,
            likeAnim: new Animated.Value(0),
            enterAnim: new Animated.Value(0)
        },
        {
            id: 5,
            image: require('../assets/PhotosWithDate/foto5.png'),
            date: '23/05/2024',
            text: 'Essa foi na manhã do dia em que a gente começou a namorar, apesar da minha lerdeza, sou muito grato por tudo desde que conheci.',
            liked: false,
            likeAnim: new Animated.Value(0),
            enterAnim: new Animated.Value(0)
        },
        {
            id: 6,
            image: require('../assets/PhotosWithDate/foto6.png'),
            date: '23/06/2024',
            text: 'Esse dia foi uma das primeiras vezes que fui na sua casa, um dia depois do meu aniversário e nosso aniversário de 1 mes de namoro, e também a primeira vez que ganhei flores, as melhores que ja recebi, que foram feitas pelas mãos do amor da minha vida.',
            liked: false,
            likeAnim: new Animated.Value(0),
            enterAnim: new Animated.Value(0)
        },
    ].map(photo => ({
        ...photo,
        enterAnim: new Animated.Value(0)
    })));

    const handleDoubleTap = (index) => {
        photos[index].liked = !photos[index].liked;

        if (photos[index].liked) {
            Animated.sequence([
                Animated.timing(photos[index].likeAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true
                }),
                Animated.timing(photos[index].likeAnim, {
                    toValue: 0.8,
                    duration: 100,
                    useNativeDriver: true
                }),
                Animated.spring(photos[index].likeAnim, {
                    toValue: 1,
                    friction: 3,
                    useNativeDriver: true
                })
            ]).start();
        } else {
            photos[index].likeAnim.setValue(0);
        }
    };

    let lastTap = null;
    const handlePress = (index) => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 300;

        if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
            handleDoubleTap(index);
        } else {
            lastTap = now;
        }
    };

    // Efeito para animar entrada das fotos
    useEffect(() => {
        const animations = photos.map((photo, index) => {
            return Animated.sequence([
                Animated.delay(index * 200), // Delay crescente para cada foto
                Animated.parallel([
                    Animated.timing(photo.enterAnim, {
                        toValue: 1,
                        duration: 600,
                        useNativeDriver: true
                    })
                ])
            ]);
        });

        Animated.stagger(150, animations).start();
    }, []);

    return (
        <View style={styles.container}>
            {photos.map((photo, index) => (
                <Animated.View 
                    key={photo.id} 
                    style={[
                        styles.photoContainer,
                        {
                            opacity: photo.enterAnim,
                            transform: [
                                {
                                    translateY: photo.enterAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [50, 0]
                                    })
                                }
                            ]
                        }
                    ]}
                >
                    <TouchableOpacity 
                        onPress={() => handlePress(index)}
                        activeOpacity={0.9}
                    >
                        <Image source={photo.image} style={styles.photo} />
                        <Animated.View style={[
                            styles.likeContainer,
                            {
                                opacity: photo.likeAnim,
                                transform: [{
                                    scale: photo.likeAnim
                                }]
                            }
                        ]}>
                            <Text style={styles.likeHeart}>♥</Text>
                        </Animated.View>
                    </TouchableOpacity>
                    <View style={styles.infoContainer}>
                        <Text style={styles.date}>{photo.date}</Text>
                        <Text style={styles.text}>{photo.text}</Text>
                    </View>
                </Animated.View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D0D0D',
        padding: 20,
    },
    photoContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    photo: {
        width: 350,
        height: 350,
        borderRadius: 15,
        marginBottom: 10,
    },
    infoContainer: {
        padding: 10,
    },
    date: {
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'LoveYaLikeASister',
        marginBottom: 15,
    },
    text: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 24,
        fontFamily: 'LoveYaLikeASister',
        lineHeight: 24,
        marginBottom: 15,
    },
    likeContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    likeHeart: {
        color: '#FF0000',
        fontSize: 24,
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    }
});