import React from 'react'
import { View, Text } from 'react-native'
import { styles } from './styles'
import { IconMapPin, IconQrcode, IconTicket } from '@tabler/icons-react-native'
import Step from '../step'

export function Steps() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Veja como funciona:</Text>

            <Step icon={IconMapPin} title="1. Encontre estabelecimentos" description="Veja locais perto de você que não parceiros Nearby" />
            <Step icon={IconQrcode} title="2. Ative o cupom com QR Code" description="Escaneie o código do estabelecimento para usar o benefício" />
            <Step icon={IconTicket} title="3. Garante vantagens perto de você" description="Ative cupons onde estiver, em diferentes tipo de estabelecimentos" />
        </View>
    )
}
