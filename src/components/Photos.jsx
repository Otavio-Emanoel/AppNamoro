import { View, Text, Image, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { useState, useEffect, useRef } from 'react';

export function Photos() {
    const [photosState, setPhotosState] = useState([
        {
            id: 1,
            image: require('../assets/Photos/heart.png'),
            text: 'Agora algumas fotos que eu gosto muito.',
            liked: false,
            likeAnim: new Animated.Value(0),
            enterAnim: new Animated.Value(0),
            hearts: []
        },
        {
            id: 2,
            image: require('../assets/Photos/foto1.png'),
            text: 'Essa foi da primeira vez em que saímos ficamos conversando acompanhados de doces colas e a nossa vergonha de comprar os produtos daquele vendedor ambulante.',
            liked: false,
            likeAnim: new Animated.Value(0),
            enterAnim: new Animated.Value(0),
            hearts: []
        },
        {
            id: 3,
            image: require('../assets/Photos/foto2.png'),
            text: 'Essa foi uma das primeiras fotos que a gente tirou com o meu celular quando ele era novo.',
            liked: false,
            likeAnim: new Animated.Value(0),
            enterAnim: new Animated.Value(0),
            hearts: []
        },
        {
            id: 4,
            image: require('../assets/Photos/foto3.png'),
            text: 'Essa foi no interclasse de volei, foi bem doido o dia mesmo a minha sala perdendo na final, foi muito bom estar com você.',
            liked: false,
            likeAnim: new Animated.Value(0),
            enterAnim: new Animated.Value(0),
            hearts: []
        },
        {
            id: 5,
            image: require('../assets/Photos/foto4.png'),
            text: 'Essa foi da vez que fui na sua casa e brincamos de lego.',
            liked: false,
            likeAnim: new Animated.Value(0),
            enterAnim: new Animated.Value(0),
            hearts: []
        },
        {
            id: 6,
            image: require('../assets/Photos/foto5.png'),
            text: 'Essa foi de um dia quando a gente tava na fila e tiraram uma foto nossa mas queriam que a gente se abrassasse e ficou assim KKKKK.',
            liked: false,
            likeAnim: new Animated.Value(0),
            enterAnim: new Animated.Value(0),
            hearts: []
        },
        {
            id: 7,
            image: require('../assets/Photos/foto6.png'),
            text: 'Essa tiraram com a sua camera e foi muito legal.',
            liked: false,
            likeAnim: new Animated.Value(0),
            enterAnim: new Animated.Value(0),
            hearts: []
        },
        {
            id: 8,
            image: require('../assets/Photos/foto7.png'),
            text: 'Eu nem lembro quem tirou essa foto mas lembro que voce tava com suas amigas e eu cheguei do nada e a gente ficou conversando.',
            liked: false,
            likeAnim: new Animated.Value(0),
            enterAnim: new Animated.Value(0),
            hearts: []
        },
        {
            id: 9,
            image: require('../assets/Photos/foto8.png'),
            text: 'Essa foi em um intervalo que a gente tava junto e tiramos essa foto com o celular da Maria.',
            liked: false,
            likeAnim: new Animated.Value(0),
            enterAnim: new Animated.Value(0),
            hearts: []
        },
        {
            id: 10,
            image: require('../assets/Photos/foto9.png'),
            text: 'Essa foi em uma das vezes que fui na sua casa e tiramos essa foto, eu acho ela muito engraçada e gosto muito.',
            liked: false,
            likeAnim: new Animated.Value(0),
            enterAnim: new Animated.Value(0),
            hearts: []
        },
        {
            id: 11,
            image: require('../assets/Photos/foto10.png'),
            text: 'Essa foi uma das nossas jogatinas de Roblox.',
            liked: false,
            likeAnim: new Animated.Value(0),
            enterAnim: new Animated.Value(0),
            hearts: []
        },
        {
            id: 12,
            image: require('../assets/Photos/foto11.png'),
            text: 'Essa foi alguns dias antes do seu aniversário e voce tava achando que eu queria tirar foto porque eu queria mais fotos pra postar (eu queria mesmo).',
            liked: false,
            likeAnim: new Animated.Value(0),
            enterAnim: new Animated.Value(0),
            hearts: []
        },
        {
            id: 13,
            image: require('../assets/Photos/foto12.png'),
            text: 'Essa foi no seu aniversário e eu gosto muito dela, esse dia foi perfeito.',
            liked: false,
            likeAnim: new Animated.Value(0),
            enterAnim: new Animated.Value(0),
            hearts: []
        },
        {
            id: 14,
            image: require('../assets/Photos/foto13.png'),
            text: 'Essa foi quando a gente tava perto daquelas florezinhas na Etec e voce colocou elas no meu cabelo, eu fiquei muito feliz.',
            liked: false,
            likeAnim: new Animated.Value(0),
            enterAnim: new Animated.Value(0),
            hearts: []
        },
        {
            id: 15,
            image: require('../assets/Photos/foto14.png'),
            text: 'Essa foi quando voce pegou meu celular e tirou essa foto e colocou de plano de fundo, eu sempre que vejo esta foto fico admirando, voce é tão linda.',
            liked: false,
            likeAnim: new Animated.Value(0),
            enterAnim: new Animated.Value(0),
            hearts: []
        },
        {
            id: 16,
            image: require('../assets/Photos/foto15.png'),
            text: 'Essa foi no dia que voce apresentou Cartas Chilenas, voce estava tão linda, eu fiquei muito feliz quando tiramos a foto.',
            liked: false,
            likeAnim: new Animated.Value(0),
            enterAnim: new Animated.Value(0),
            hearts: []
        },
        {
            id: 17,
            image: require('../assets/Photos/foto16.png'),
            text: 'Essa foi uma das nossas gameplays de Minecraft, foi muito legal.',
            liked: false,
            likeAnim: new Animated.Value(0),
            enterAnim: new Animated.Value(0),
            hearts: []
        },
        {
            id: 18,
            image: require('../assets/Photos/foto17.png'),
            text: 'Essa foi uns dias antes da gente completar 6 meses de namoro, até hoje fico triste por ter esquecido de fazer uma cara melhor pra tirar foto.',
            liked: false,
            likeAnim: new Animated.Value(0),
            enterAnim: new Animated.Value(0),
            hearts: []
        },
        {
            id: 19,
            image: require('../assets/Photos/foto18.png'),
            text: 'Essa foi quando a gente foi assistir Moana 2 no cinema, foi incrível aquele dia, passei a maior parte dele com voce, não há nada melhor que isso.',
            liked: false,
            likeAnim: new Animated.Value(0),
            enterAnim: new Animated.Value(0),
            hearts: []
        },
        {
            id: 20,
            image: require('../assets/Photos/foto19.png'),
            text: 'Essa foi uma das mais recentes que a gente tem na escola e eu acho ela bem legal (voce jogou ela no ChatGPT pra ele transformar em lego e fico muito legal).',
            liked: false,
            likeAnim: new Animated.Value(0),
            enterAnim: new Animated.Value(0),
            hearts: []
        },
        {
            id: 21,
            image: require('../assets/Photos/foto20.png'),
            text: 'Esse foi o dia que meu bumbum foi brutalmente molestado misteriosamente e eu apareci jogado no chão do seu quarto igual um doido.',
            liked: false,
            likeAnim: new Animated.Value(0),
            enterAnim: new Animated.Value(0),
            hearts: []
        },
        {
            id: 22,
            image: require('../assets/Photos/foto21.png'),
            text: 'Essa foi quando a gente se desenhou com giz na sua casa e eu amo esses desenhos.',
            liked: false,
            likeAnim: new Animated.Value(0),
            enterAnim: new Animated.Value(0),
            hearts: []
        },
        {
            id: 23,
            image: require('../assets/Photos/foto22.png'),
            text: 'E por fim essa foi na integração desse ano, eu acho até que é a nossa foto junto que eu mais gosto, voce está perfeita, como sempre.',
            liked: false,
            likeAnim: new Animated.Value(0),
            enterAnim: new Animated.Value(0),
            hearts: []
        },

    ].map(photo => ({
        ...photo,
        hearts: [],
        enterAnim: new Animated.Value(0),
        likeAnim: new Animated.Value(0)
    })));

    // Atualizar useEffect para usar photosState
    useEffect(() => {
        const animations = photosState.map((photo, index) => {
            return Animated.timing(photo.enterAnim, {
                toValue: 1,
                duration: 800,
                delay: index * 200,
                useNativeDriver: true
            });
        });

        Animated.stagger(150, animations).start();
    }, []);

    // Função para criar coração aleatório
    const createRandomHeart = () => {
        const { width, height } = Dimensions.get('window');
        const randomX = Math.random() * (width - 100); 
        const randomY = Math.random() * (height / 2); 
        
        return {
            id: Date.now() + Math.random(),
            x: randomX,
            y: randomY,
            opacity: new Animated.Value(1),
            scale: new Animated.Value(0),
            rotation: `${Math.random() * 360}deg`
        };
    };

    const handleDoubleTap = (index) => {
        setPhotosState(prevState => {
            const newState = [...prevState];
            const photo = newState[index];

            // Criar 5 corações aleatórios
            const newHearts = Array(5).fill().map(() => createRandomHeart());
            photo.hearts = [...photo.hearts, ...newHearts];

            // Animar cada coração
            newHearts.forEach(heart => {
                Animated.sequence([
                    Animated.spring(heart.scale, {
                        toValue: 1,
                        friction: 5,
                        tension: 40,
                        useNativeDriver: true
                    }),
                    Animated.timing(heart.opacity, {
                        toValue: 0,
                        duration: 1000,
                        useNativeDriver: true
                    })
                ]).start(() => {
                    // Remover o coração após a animação
                    setPhotosState(currentState => {
                        const updatedState = [...currentState];
                        updatedState[index].hearts = updatedState[index].hearts.filter(
                            h => h.id !== heart.id
                        );
                        return updatedState;
                    });
                });
            });

            return newState;
        });
    };

    let lastTap = useRef(null);
    const handlePress = (index) => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 300;

        if (lastTap.current && (now - lastTap.current) < DOUBLE_PRESS_DELAY) {
            handleDoubleTap(index);
            lastTap.current = null;
        } else {
            lastTap.current = now;
        }
    };

    return (
        <View style={styles.container}>
            {photosState.map((photo, index) => (
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
                                        outputRange: [100, 0]
                                    })
                                },
                                {
                                    scale: photo.enterAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0.8, 1]
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
                        <View style={styles.photoWrapper}>
                            <Image source={photo.image} style={styles.photo} />
                            {photo.hearts.map(heart => (
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
                                                { rotate: heart.rotation }
                                            ]
                                        }
                                    ]}
                                >
                                    ♥
                                </Animated.Text>
                            ))}
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.text}>{photo.text}</Text>
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
        marginBottom: 40,
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    photo: {
        width: '100%',
        height: 400,
        borderRadius: 15,
    },
    text: {
        color: '#FFF',
        fontSize: 24,
        fontFamily: 'LoveYaLikeASister',
        textAlign: 'center',
        marginTop: 15,
        lineHeight: 24,
        paddingHorizontal: 10,
    },
    photoWrapper: {
        position: 'relative',
        width: '100%',
        height: 400,
    },
    floatingHeart: {
        position: 'absolute',
        fontSize: 40,
        color: '#FF69B4',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        zIndex: 10,
    },
});