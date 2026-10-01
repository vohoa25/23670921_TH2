import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Watermark } from '@components/Watermark';
import { STUDENT, examStamp, VARIANT } from '@constants/student';
import { COLORS } from '@constants/theme';
import { useCampusLocation } from '@hooks/useCampusLocation';
import { useAuthStore } from '@stores/authStore';

export const MeScreen = () => {
    const { status, distanceKm, shippingFee, requestLocation, openSettings } = useCampusLocation();
    const logout = useAuthStore((s) => s.logout);

    return (
        <View style={styles.container}>
            {VARIANT.watermarkAtTop && <Watermark />}

            <View style={styles.header}>
                <Text style={styles.headerTitle}>TÔI · LOCATION</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.userName}>{STUDENT.hoTen}</Text>
                <Text style={styles.userSub}>
                    {STUDENT.mssv} · #{examStamp()}
                </Text>

                <View style={styles.card}>
                    <Text style={styles.statusText}>Quyền: {status}</Text>
                    {distanceKm !== null && (
                        <Text style={styles.infoText}>≈ {distanceKm} km tới cổng KTX</Text>
                    )}
                    {shippingFee !== null && (
                        <View>
                            <Text style={styles.infoText}>Phí ship ước tính</Text>
                            <Text style={styles.feeText}>{shippingFee.toLocaleString('vi-VN')} đ</Text>
                        </View>
                    )}
                </View>

                <TouchableOpacity style={styles.primaryBtn} onPress={requestLocation}>
                    <Text style={styles.btnText}>Lấy vị trí ước tính ship</Text>
                </TouchableOpacity>

                {status === 'blocked' && (
                    <TouchableOpacity style={styles.outlineBtn} onPress={openSettings}>
                        <Text style={styles.outlineText}>Mở Cài đặt (blocked)</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
                    <Text style={styles.btnText}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>

            {!VARIANT.watermarkAtTop && <Watermark />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: { backgroundColor: COLORS.primary, padding: 16, alignItems: 'center' },
    headerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    content: { flex: 1, padding: 20, alignItems: 'center' },
    userName: { fontSize: 20, fontWeight: 'bold', color: COLORS.text },
    userSub: { color: COLORS.textLight, marginBottom: 20 },
    card: {
        width: '100%',
        backgroundColor: COLORS.surface,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        marginBottom: 20,
    },
    statusText: { color: COLORS.success, fontWeight: 'bold', marginBottom: 8 },
    infoText: { color: COLORS.textLight, marginTop: 4 },
    feeText: { fontSize: 20, fontWeight: 'bold', color: COLORS.secondary, marginTop: 4 },
    primaryBtn: {
        width: '100%',
        backgroundColor: COLORS.primary,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 12,
    },
    outlineBtn: {
        width: '100%',
        borderWidth: 1,
        borderColor: COLORS.primary,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 12,
    },
    outlineText: { color: COLORS.primary, fontWeight: 'bold' },
    logoutBtn: {
        width: '100%',
        backgroundColor: COLORS.error,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    btnText: { color: '#FFF', fontWeight: 'bold' },
});