import React from 'react';
import { View, Text, Image } from 'react-native';

import logoImg from '../../../assets/logo.png';

import style from './styles';
import styles from './styles';

export default function Incidents() {
  return (
    <View style={style.container}>
      <View style={style.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>Ola</Text>
      </View>
    </View>
  );
}
