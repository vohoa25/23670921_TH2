import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts, Product } from '@services/productApi';
import { ProductCard } from '@components/ProductCard';
import { Watermark } from '@components/Watermark';
import { STUDENT, ROOM_LABEL, DEBOUNCE_MS, STALE_TIME_MS, VARIANT } from '@constants/student';
import { COLORS } from '@constants/theme';
import { useDebouncedValue } from '@hooks/useDebouncedValue';

export const HomeScreen = ({ navigation }: any) => {
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebouncedValue(search, DEBOUNCE_MS);

    const { data, isLoading, isError, refetch, isRefetching } = useQuery({
        queryKey: ['products', STUDENT.mssv],
        queryFn: fetchProducts,
        staleTime: STALE_TIME_MS,
    });

    const filteredData = data?.filter((p) =>
        p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    return (
        <View style={styles.container}>
            {VARIANT.watermarkAtTop && <Watermark />}

            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>KTXGO</Text>
                    <Text style={styles.headerSub}>Giao tận {ROOM_LABEL}</Text>
                </View>
                <Text style={styles.headerTag}>(A)</Text>
            </View>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder={`Tìm món (debounce) — ${STUDENT.mssv}`}
                    value={search}
                    onChangeText={setSearch}
                />
                <Text style={styles.searchTag}>(B)</Text>
            </View>

            <Text style={styles.listTag}>(C) FlashList ×2</Text>

            {isLoading ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                    <Text style={styles.loadingText}>Đang tải món...</Text>
                </View>
            ) : isError ? (
                <View style={styles.center}>
                    <Text style={styles.errorMssv}>{STUDENT.mssv}</Text>
                    <Text style={styles.errorText}>Không tải được dữ liệu món.</Text>
                    <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
                        <Text style={styles.retryText}>Thử lại</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.listWrapper}>
                    <FlashList
                        data={filteredData}
                        renderItem={({ item }: { item: Product }) => (
                            <ProductCard
                                product={item}
                                onPress={() => navigation.navigate('Detail', { id: String(item.id) })}
                            />
                        )}
                        numColumns={2}
                        estimatedItemSize={180}
                        keyExtractor={(item) => `${STUDENT.mssv}-${item.id}`}
                        refreshing={isRefetching}
                        onRefresh={refetch}
                    />
                </View>
            )}

            {!VARIANT.watermarkAtTop && <Watermark />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: {
        backgroundColor: COLORS.primary,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
    headerSub: { color: '#BFDBFE', fontSize: 13 },
    headerTag: { color: COLORS.secondary, fontWeight: 'bold' },
    searchContainer: { padding: 12, position: 'relative' },
    searchInput: {
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    searchTag: { position: 'absolute', right: 24, top: 22, color: COLORS.primary, fontWeight: 'bold' },
    listTag: { textAlign: 'right', paddingRight: 16, color: COLORS.primary, fontSize: 12 },
    listWrapper: { flex: 1, paddingHorizontal: 6 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    loadingText: { marginTop: 10, color: COLORS.textLight },
    errorMssv: { fontSize: 18, fontWeight: 'bold', color: COLORS.error },
    errorText: { color: COLORS.text, marginVertical: 8 },
    retryButton: { backgroundColor: COLORS.error, paddingHorizontal: 24, paddingVertical: 10, borderRadius: 8 },
    retryText: { color: '#FFF', fontWeight: 'bold' },
});