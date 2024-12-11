import React from 'react'
import { View, Text } from 'react-native'
import { styles } from './styles'
import { colors } from '@/styles/theme'
import { IconProps } from '@tabler/icons-react-native'

type StepProps = {
    icon: React.ComponentType<IconProps>
    title: string
    description: string
}

export default function Step({ title = '', description = '', icon: Icon }: StepProps) {
    return (
        <View style={styles.container}>
            {Icon && <Icon size={32} color={colors.red.base} />}
            <View style={styles.details}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
        </View>
    )
}