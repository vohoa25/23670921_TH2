import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Product } from '@services/productApi';
import { PRICE_MULTIPLIER, VARIANT } from '@constants/student';
import { COLORS } from '@constants/theme';
import { useCartStore } from '@stores/cartStore';

interface Props {
    product: Product;
    onPress: () => void;
}

export const ProductCard = ({ product, onPress }: Props) => {
    const addToCart = useCartStore((s) => s.addToCart);

    const formattedPrice =
        Math.round(product.price * PRICE_MULTIPLIER).toLocaleString('vi-VN') + ' đ';

    const handleAdd = () => {
        if (VARIANT.hapticOnAdd === 'impact') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        } else {
            Haptics.selectionAsync();
        }
        addToCart(product);
    };

    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
            <View style={styles.imagePlaceholder}>
                <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
            </View>
            <Text style={styles.title} numberOfLines={1}>
                {product.title}
            </Text>
            <Text style={styles.price}>{formattedPrice}</Text>
            <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
                <Text style={styles.addText}>+</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: COLORS.surface,
        margin: 6,
        borderRadius: 12,
        padding: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
        justifyContent: 'space-between',
    },
    imagePlaceholder: {
        height: 100,
        backgroundColor: '#EFF6FF',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    image: {
        width: '80%',
        height: '80%',
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.text,
    },
    price: {
        fontSize: 13,
        fontWeight: '700',
        color: COLORS.primary,
        marginTop: 4,
    },
    addButton: {
        position: 'absolute',
        right: 8,
        bottom: 8,
        backgroundColor: COLORS.primary,
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});