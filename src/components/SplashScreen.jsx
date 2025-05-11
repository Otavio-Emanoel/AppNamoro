import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';

import logo from '../assets/icone.png';

export function SplashScreen() {

  // Animação de loading
  const animations = [...Array(9)].map(() => useRef(new Animated.Value(0)).current);

  useEffect(() => {
    const createAnimation = (index) => {
      return Animated.sequence([

        Animated.delay(index * 120),

        Animated.loop(
          Animated.sequence([
            Animated.timing(animations[index], {
              toValue: -20,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(animations[index], {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
          ])
        ),
      ]);
    };

    // Inicia todas as animações
    Animated.parallel(
      animations.map((_, index) => createAnimation(index))
    ).start();
  }, []);

  const renderDots = () => {
    return animations.map((anim, index) => (
      <Animated.View
        key={index}
        style={[
          styles.loading,
          {
            transform: [
              { translateY: anim }
            ]
          }
        ]}
      />
    ));
  };

  return (
    <View style={styles.splashScreen}>
      <View style={styles.container}>
        <Image
          source={logo}
          style={styles.img}
        />
        <Text style={styles.h1}>Seja Bem Vinda{'\n'}meu Amor</Text>
        <View style={styles.loadingContainer}>
          <Text style={styles.p}>Carregando App...</Text>
        </View>
        <View style={styles.dotsContainer}>
          {renderDots()}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  splashScreen: {
    flex: 1,
    backgroundColor: '#FF69B4',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  img: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 3,
    borderColor: '#FFF',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  h1: {
    fontSize: 32,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginBottom: 20,
  },
  loadingContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  p: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: '500',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 25,
    width: '75%',
  },
  loading: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: '#FFF',
    margin: 5,
  },
});
