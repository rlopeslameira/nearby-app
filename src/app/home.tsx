import { View, Alert, Text, SafeAreaView, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Categories, CategoryProps } from '@/components/categories'
import MapView, {Callout, Marker} from 'react-native-maps'

import api from '@/services/api'
import { PlaceProps } from '@/components/place'
import { Places } from '@/components/places'
import { fontFamily, colors } from '@/styles/theme'

import imgLocation from '@/assets/location.png'
import imgPin from '@/assets/pin.png'


import * as Location from 'expo-location'
import Loading from '@/components/loading'
import { router, useFocusEffect } from 'expo-router'
import { IconPhoneCall } from '@tabler/icons-react-native'

type MarketProps = PlaceProps & {
    latitude: number;
    longitude: number;
}

type LocationProps = {
    latitude: number;
    longitude: number;
}

export default function Home() {

    const [categories, setCategories] = useState<CategoryProps>([]);
    const [category, setCategory] = useState<string>('');    
    const [marteks, setMarkets] = useState<MarketProps[]>([]);
    const [currentLocation, setCurrentLocation] = useState<LocationProps>();
    const [loading, setLoading] = useState(false);
    
    useFocusEffect(
        useCallback(() => {
            const controller = new AbortController();
            const signal = controller.signal;
            fetchMarkets();          
            return () => {
                controller.abort();
            }
        }, [])
      );

    async function getLocation() {
        const {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão de localização', 'É necessário permitir o acesso à localização');
            return;
        }
        const location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High});
        setCurrentLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        });
    }

    async function fetchCategories() {        
        try{
            const {data} = await api.get('/categories');
            data.unshift({id: 'todos', name: 'Todos'});
            setCategories(data);
            setCategory(data[0].id);        
        }catch(error){
            console.log(error);
            Alert.alert('Erro', 'Não foi possível carregar as categorias')
        }
    }

    async function fetchMarkets() {
        try{
            setLoading(true);
            
            if (!category || !currentLocation) return;
            const url = `/markets/category/${category}/${currentLocation?.latitude}/${currentLocation?.longitude}`;
            console.log('fetching markets ', url);
            const {data} = await api.get(url);
            setMarkets(data);
        }catch(error){
            console.log(error);
            Alert.alert('Erro', 'Não foi possível carregar os mercados')
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        getLocation();
        fetchCategories();
    }, [])

    useEffect(() => {
        fetchMarkets();
    }, [category])



    return (
        <View style={{flex: 1, backgroundColor: colors.green.soft}} >
            {currentLocation?.latitude ? (
            <>
                <Categories data={categories} selected={category} onSelect={setCategory}/>
                {loading ? (
                    <Loading />
                ) : (
                    <>                      
                        <MapView 
                        style={{flex: 1}} 
                        initialRegion={{
                            latitude: currentLocation.latitude,
                            longitude: currentLocation.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        }} 
                        >
                        <Marker 
                        identifier="current" 
                        coordinate={{
                            latitude: currentLocation.latitude,
                            longitude: currentLocation.longitude
                        }} 
                        image={imgLocation}
                        title="Você está aqui" />

                        {marteks.map((market, index) => (
                            <Marker 
                                key={index} 
                                identifier={market.id}
                                coordinate={{
                                    latitude: market.latitude,
                                    longitude: market.longitude
                                }} 
                                image={imgPin}
                            >
                                <Callout onPress={()=> router.navigate(`/market/${market.id}`)}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Image source={{uri: market.cover}} style={{
                                            width: 52,
                                            height: 52,
                                            backgroundColor: colors.gray[200],
                                            marginRight: 12,
                                        }}/>

                                        <View >

                                            <Text style={{
                                                fontSize: 14,
                                                color: colors.gray[600],
                                                fontFamily: fontFamily.medium,
                                            }}>{market.name}</Text>
                                            <Text style={{
                                                fontSize: 12,
                                                color: colors.gray[600],
                                                fontFamily: fontFamily.regular,
                                            }}>{market.address}</Text>
                                            {(market.phone && market.phone.length > 0) && (
                                                <View style={{flexDirection:'row', paddingTop: 2}}>
                                                    <IconPhoneCall size={16} color={colors.green.base} />
                                                    <Text style={{
                                                        fontSize: 12,
                                                        color: colors.gray[600],
                                                        fontFamily: fontFamily.regular,
                                                        marginLeft: 6
                                                    }}>{market.phone}</Text>
                                                </View>
                                            )}
                                        </View>
                                    </View>
                                </Callout>
                            </Marker>
                        ))}
                        </MapView>
                        <Places data={marteks} />
                    </>
                )}
            </>
        ) : (
            <Loading />
        )}
        </View>
    )
}