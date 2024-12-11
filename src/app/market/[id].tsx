import React, { useEffect, useState } from 'react'
import { Alert, Text, View } from 'react-native'
import api from '@/services/api';

import Loading from '@/components/loading';
import {Cover} from '@/components/market/cover'
import { Details, DetailsProps } from '@/components/market/details';

import { useLocalSearchParams, Redirect} from 'expo-router'

type MarketProps = DetailsProps & {
    cover: string
}

export default function Market() {

    const [isloading, setIsLoading] = useState(true);
    const [market, setMarket] = useState<MarketProps>();
    const params = useLocalSearchParams<{id: string}>();

    async function fetchMarkets() {
        try{
            const {data} = await api.get(`/markets/${params.id}`);
            setMarket(data);
        }catch(error){
            console.log(error);
            Alert.alert('Erro', 'Não foi possível carregar os locais')
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchMarkets();
    }, [])

    if (isloading) return <Loading />

    if (!market) return <Redirect href="/home" />

    return (
        <View style={{flex: 1}}>
            <Cover uri={market?.cover} />
            <Details data={market} />
        </View>
    )
}
