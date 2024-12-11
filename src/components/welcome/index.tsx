import React from 'react'
import { View, Text, Image } from 'react-native'

import { styles } from './styles'

export function Welcome() {
    return (
        <View>
            <Image source={require('@/assets/logo.png')} style={styles.logo} />
            <Text style={styles.title}>Boas vindas ao Nearby!</Text>
            <Text style={styles.subtitle}>Encontre os melhores estabelecimentos com os melhores cupons de desconto próximos a você.</Text>
        </View>
    )
}