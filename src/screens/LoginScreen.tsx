import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import { Watermark } from '@components/Watermark';
import { STUDENT, VARIANT, examStamp } from '@constants/student';
import { COLORS } from '@constants/theme';
import { useAuthStore } from '@stores/authStore';

export const LoginScreen = () => {
    const [value, setValue] = useState('');

    const login = useAuthStore((s) => s.login);

    const handleLogin = () => {
        login(`ktxgo-${STUDENT.mssv}-${examStamp()}`);
    };

    return (
        <View style={styles.container}>
            {VARIANT.watermarkAtTop && <Watermark />}

            <View style={styles.content}>
                <Text style={styles.title}>KTXGO</Text>

                <Text style={styles.subtitle}>
                    Giao đồ tận phòng ký túc xá
                </Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder={
                            VARIANT.authField === 'email'
                                ? `Email — ${STUDENT.mssv}@iuh.edu.vn`
                                : `SĐT — 09${STUDENT.mssv.slice(-8)}`
                        }
                        value={value}
                        onChangeText={setValue}
                        keyboardType={
                            VARIANT.authField === 'email'
                                ? 'email-address'
                                : 'phone-pad'
                        }
                    />

                    <Text style={styles.fieldLabel}>
                        ({VARIANT.authField === 'email' ? 'A' : 'B'})
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleLogin}
                >
                    <Text style={styles.buttonText}>Vào cửa hàng</Text>
                </TouchableOpacity>

                <Text style={styles.footerText}>
                    Auth Stack · chưa có token
                </Text>
            </View>

            {!VARIANT.watermarkAtTop && <Watermark />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

    title: {
        fontSize: 36,
        fontWeight: '800',
        color: COLORS.primary,
    },

    subtitle: {
        fontSize: 14,
        color: COLORS.textLight,
        marginBottom: 30,
    },

    inputContainer: {
        width: '100%',
        position: 'relative',
        marginBottom: 20,
    },

    input: {
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 12,
        padding: 14,
        fontSize: 14,
        color: COLORS.text,
    },

    fieldLabel: {
        position: 'absolute',
        right: 12,
        top: 14,
        color: COLORS.primary,
        fontWeight: 'bold',
    },

    button: {
        width: '100%',
        backgroundColor: COLORS.primary,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },

    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },

    footerText: {
        marginTop: 20,
        color: COLORS.textLight,
        fontSize: 12,
    },
});