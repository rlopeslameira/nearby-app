import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import { styles } from './styles'

import { Button } from '@/components/button'
import { IconArrowLeft } from '@tabler/icons-react-native'
import { router } from 'expo-router'

type CoverProps = {
    uri: string
}

export function Cover({uri}: CoverProps) {
  return (
    <ImageBackground source={{uri}} style={styles.container}>
        <View style={styles.header}>
            <Button style={{
                width: 50,
                height: 40,                
            }} onPress={() => router.navigate('/home')}>
                <Button.Icon icon={IconArrowLeft} />
            </Button>
        </View>
    </ImageBackground>
  )
}