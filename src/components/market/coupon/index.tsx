import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { IconTicket } from '@tabler/icons-react-native'
import { colors } from '@/styles/colors'

type Props = {
    code: string
}

export function Coupon({code}: Props) {
  return (
        <View style={styles.container}>
            <Text style={styles.title}>Tutilize esse cupom</Text>                  
            <View style={styles.content}>
                <IconTicket size={24} color={colors.green.light} />
                <Text style={styles.code}>{code}</Text>                  
            </View>
        </View>
  )
}