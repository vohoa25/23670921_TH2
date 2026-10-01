import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import * as Haptics from 'expo-haptics';
import { fetchProducts } from '@services/productApi';
import { Watermark } from '@components/Watermark';
import { STUDENT, PRICE_MULTIPLIER, VARIANT } from '@constants/student';
import { COLORS } from '@constants/theme';
import { useCartStore } from '@stores/cartStore';

export const DetailScreen = ({ route, navigation }: any) => {
    const { id } = route.params;
    const addToCart = useCartStore((s) => s.addToCart);

    const { data } = useQuery({ queryKey: ['products', STUDENT.mssv], queryFn: fetchProducts });
    const product = data?.find((p) => String(p.id) === id);

    if (!product) return null;

    const formattedPrice =
        Math.round(product.price * PRICE_MULTIPLIER).toLocaleString('vi-VN') + ' đ';

    const handleAddToCart = () => {
        if (VARIANT.hapticOnAdd === 'impact') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        } else {
            Haptics.selectionAsync();
        }
        addToCart(product);
        Alert.alert('Thành công', `Đã thêm món vào giỏ! (${STUDENT.mssv})`);
    };

    return (
        <View style={styles.container}>
            {VARIANT.watermarkAtTop && <Watermark />}

            <View style={styles.navHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backText}>← Chi tiết món</Text>
                </TouchableOpacity>
                <Text style={styles.stackTag}>Stack</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.imageBox}>
                    <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
                </View>

                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.price}>{formattedPrice}</Text>
                <Text style={styles.subText}>Giao nội khu · nhận tận phòng</Text>

                <Text style={styles.desc} numberOfLines={3}>
                    {product.description}
                </Text>

                <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
                    <Text style={styles.addText}>Thêm vào giỏ · Haptic</Text>
                </TouchableOpacity>
            </View>

            {!VARIANT.watermarkAtTop && <Watermark />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    navHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: COLORS.surface,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    backText: { fontSize: 16, fontWeight: 'bold', color: COLORS.primary },
    stackTag: { color: COLORS.secondary, fontWeight: 'bold' },
    content: { flex: 1, padding: 20, alignItems: 'center' },
    imageBox: {
        width: '100%',
        height: 200,
        backgroundColor: '#FEF08A',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    image: { width: '80%', height: '80%' },
    title: { fontSize: 20, fontWeight: 'bold', color: COLORS.text, textAlign: 'center' },
    price: { fontSize: 18, fontWeight: 'bold', color: COLORS.primary, marginVertical: 6 },
    subText: { color: COLORS.textLight, fontSize: 13, marginBottom: 12 },
    desc: { color: COLORS.textLight, fontSize: 13, textAlign: 'center', marginBottom: 24 },
    addButton: {
        width: '100%',
        backgroundColor: COLORS.primary,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    addText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});