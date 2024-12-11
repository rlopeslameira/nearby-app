import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { IconPhone, IconMapPin, IconTicket } from '@tabler/icons-react-native'
import { Info } from '../info'

export type DetailsProps = {
    name: string
    description: string
    address: string
    phone: string
    coupons: number
    rules: {
        id: string
        description: string
    }[]
}

type Props = {
    data: DetailsProps
}

export function Details({data}: Props) {
  return (
        <View style={styles.container}>
            <Text style={styles.name}>{data.name}</Text>
            <Text style={styles.description}>{data.description}</Text>
            <View style={styles.group}>
                <Text style={styles.title}>Informações</Text>
            </View>            
            <Info description={`${data.coupons} cupons disponíveis`} icon={IconTicket} />
            <Info description={data.address} icon={IconMapPin} />
            <Info description={data.phone} icon={IconPhone} />
        </View>
  )
}