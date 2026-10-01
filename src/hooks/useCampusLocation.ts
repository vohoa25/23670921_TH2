import { useState } from 'react';
import * as Location from 'expo-location';
import { Linking } from 'react-native';
import { BASE_SHIP_FEE, VARIANT } from '@constants/student';

const KTX_GATE_COORDS = {
    latitude: 10.8222,
    longitude: 106.6875,
};

function calculateHaversineDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

export function useCampusLocation() {
    const [status, setStatus] = useState<'idle' | 'granted' | 'denied' | 'blocked'>('idle');
    const [distanceKm, setDistanceKm] = useState<number | null>(null);
    const [shippingFee, setShippingFee] = useState<number | null>(null);

    const requestLocation = async () => {
        const { status: existingStatus, canAskAgain } = await Location.getForegroundPermissionsAsync();

        let finalStatus = existingStatus;
        if (existingStatus !== 'granted' && canAskAgain) {
            const { status: newStatus } = await Location.requestForegroundPermissionsAsync();
            finalStatus = newStatus;
        }

        if (finalStatus === 'granted') {
            setStatus('granted');
            const loc = await Location.getCurrentPositionAsync({});
            const km = calculateHaversineDistance(
                loc.coords.latitude,
                loc.coords.longitude,
                KTX_GATE_COORDS.latitude,
                KTX_GATE_COORDS.longitude
            );
            setDistanceKm(parseFloat(km.toFixed(1)));

            let fee = 0;
            if (VARIANT.shipFormula === 'A') {
                fee = BASE_SHIP_FEE + Math.round(km * 2000);
            } else {
                fee = BASE_SHIP_FEE + Math.round(km * 1500) + 2000;
            }
            setShippingFee(fee);
        } else if (!canAskAgain && existingStatus === 'denied') {
            setStatus('blocked');
        } else {
            setStatus('denied');
        }
    };

    const openSettings = () => {
        Linking.openSettings();
    };

    return {
        status,
        distanceKm,
        shippingFee,
        requestLocation,
        openSettings,
    };
}