import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Watermark } from '@components/Watermark';
import { ROOM_LABEL, PRICE_MULTIPLIER, VARIANT } from '@constants/student';
import { COLORS } from '@constants/theme';
import { useCartStore } from '@stores/cartStore';

export const CartScreen = () => {
    const { items, removeFromCart, getTotalAmount } = useCartStore();

    const totalAmount = Math.round(getTotalAmount() * PRICE_MULTIPLIER);

    return (
        <View style={styles.container}>
            {VARIANT.watermarkAtTop && <Watermark />}

            <View style={styles.header}>
                <Text style={styles.headerTitle}>GIỎ HÀNG</Text>
            </View>

            <FlatList
                data={items}
                keyExtractor={(item) => String(item.product.id)}
                contentContainerStyle={{ padding: 16 }}
                renderItem={({ item }) => (
                    <View style={styles.cartCard}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.itemTitle}>{item.product.title}</Text>
                            <Text style={styles.itemPrice}>
                                ×{item.quantity}{' '}
                                {(Math.round(item.product.price * PRICE_MULTIPLIER) * item.quantity).toLocaleString(
                                    'vi-VN'
                                )}{' '}
                                đ
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => removeFromCart(item.product.id)}
                        >
                            <Text style={styles.deleteText}>✕</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            <View style={styles.footer}>
                <View style={styles.shipBox}>
                    <Text style={styles.shipRoom}>Giao đến {ROOM_LABEL}</Text>
                    <Text style={styles.shipFee}>Phí ship: 12.000 đ (công thức {VARIANT.shipFormula})</Text>
                </View>

                <Text style={styles.totalText}>
                    Tổng hàng: {totalAmount.toLocaleString('vi-VN')} đ
                </Text>
            </View>

            {!VARIANT.watermarkAtTop && <Watermark />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: {
        backgroundColor: COLORS.primary,
        padding: 16,
        alignItems: 'center',
    },
    headerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    cartCard: {
        backgroundColor: COLORS.surface,
        padding: 12,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    itemTitle: { fontSize: 14, fontWeight: 'bold', color: COLORS.text },
    itemPrice: { fontSize: 13, color: COLORS.textLight, marginTop: 4 },
    deleteButton: {
        backgroundColor: COLORS.error,
        width: 32,
        height: 32,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteText: { color: '#FFF', fontWeight: 'bold' },
    footer: { padding: 16 },
    shipBox: {
        borderWidth: 1,
        borderColor: COLORS.secondary,
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
    },
    shipRoom: { fontWeight: 'bold', color: COLORS.text },
    shipFee: { color: COLORS.secondary, fontWeight: 'bold', marginTop: 4 },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.primary,
        textAlign: 'center',
    },
});