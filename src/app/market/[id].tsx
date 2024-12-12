import React, { useEffect, useRef, useState } from 'react'
import { Alert, Modal, ScrollView, StatusBar, Text, View } from 'react-native'
import { useLocalSearchParams, Redirect} from 'expo-router'
import { useCameraPermissions, CameraView } from 'expo-camera'
import api from '@/services/api'

import Loading from '@/components/loading'
import {Cover} from '@/components/market/cover'
import { Details, DetailsProps } from '@/components/market/details'
import { Button } from '@/components/button'
import { Coupon } from '@/components/market/coupon'

type MarketProps = DetailsProps & {
    cover: string
}

export default function Market() {

    const [isloading, setIsLoading] = useState(true);
    const [coupon, setCoupon] = useState<string|null>(null);
    const [market, setMarket] = useState<MarketProps>();
    const [visibleCameraModal, setVisibleCameraModal] = useState(false);
    const [couponIsLoading, setCouponIsLoading] = useState(false);

    const qrLock = useRef(false);

    const params = useLocalSearchParams<{id: string}>();
    const [hasPermission, requestPermission] = useCameraPermissions();

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
    }, [params.id, coupon])

    async function handleOpenCamera() {
        try{
            const {granted} = await requestPermission();

            if (!granted)
            {   
                Alert.alert('Câmera', 'Precisamos da sua permissão para acessar a câmera');         
                return;
            }
            qrLock.current = false;
            setVisibleCameraModal(true);        
        }catch(error){
            console.log(error);
            Alert.alert('Erro', 'Não foi possível abrir a câmera')
        }
    }

    async function getCoupon(id: string) {
        try{
            setCouponIsLoading(true);
            const { data } = await api.patch('/coupons/' + id);
            Alert.alert('Cupom', `Cupom gerado com sucesso: ${data.coupon}`);
            setCoupon(data.coupon);
        }catch(error){
            console.log(error);
            Alert.alert('Erro', 'Não foi possível obter o cupom')
        }finally{
            setCouponIsLoading(false);
        }
    }

    function handleUseCoupon(id: string) {
        setVisibleCameraModal(false);
        if (id !== params.id){
            Alert.alert('Atenção', 'O QrCode lido não corresponde a este local', [
                {
                    text: 'Ok',
                    onPress: () => qrLock.current = false
                }
            ]);
            return
        }

        Alert.alert('Cupom', 'Não é possível reutilizar um cupom resgatado. Deseja realmente resgatar o cupom ?', [
            {
                text: 'Não',
                style: 'cancel',
                onPress: () => qrLock.current = false
            },
            {
                text: 'Sim',
                onPress: () => getCoupon(id)
            }
        ])
    }

    if (isloading) return <Loading />

    if (!market) return <Redirect href="/home" />

    return (
        <View style={{flex: 1}}>
            <StatusBar barStyle="light-content" backgroundColor="black" hidden={visibleCameraModal}/>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Cover uri={market?.cover} />
                <Details data={market} />
            </ScrollView>
            {coupon && (
                <Coupon code={coupon} />
            )}
            <View style={{padding: 32}}>
                <Button onPress={() => handleOpenCamera()}>
                    <Button.Title>Ler QR Code</Button.Title>
                </Button>
            </View>

            <Modal style={{flex: 1}} visible={visibleCameraModal} >
                <CameraView style={{flex: 1}} facing='back' onBarcodeScanned={({data})=> {
                    if (qrLock.current) return;

                    qrLock.current = true;
                    setTimeout(() => {
                        handleUseCoupon(data);
                    }, 500)
                    
                }} />                
                
                <View style={{flex: 1, position: 'absolute', bottom: 32, left: 32, right: 32 }} >
                    <Button isLoading={couponIsLoading} onPress={() => setVisibleCameraModal(false)}>
                        <Button.Title>Voltar</Button.Title>
                    </Button>
                </View>
            </Modal>
        </View>
    )
}
