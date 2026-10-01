import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ShopStack } from './ShopStack';
import { CartScreen } from '@screens/CartScreen';
import { MeScreen } from '@screens/MeScreen';
import { useCartStore } from '@stores/cartStore';
import { VARIANT } from '@constants/student';
import { COLORS } from '@constants/theme';

export type MainTabParamList = {
    Shop: undefined;
    Cart: undefined;
    Me: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabs = () => {
    const totalQty = useCartStore((s) => s.getTotalQuantity());

    const shopTab = (
        <Tab.Screen
            key="shop"
            name="Shop"
            component={ShopStack}
            options={{ title: 'Cửa hàng' }}
        />
    );

    const cartTab = (
        <Tab.Screen
            key="cart"
            name="Cart"
            component={CartScreen}
            options={{
                title: 'Giỏ',
                tabBarBadge: totalQty > 0 ? totalQty : undefined,
            }}
        />
    );

    const meTab = (
        <Tab.Screen
            key="me"
            name="Me"
            component={MeScreen}
            options={{ title: 'Tôi' }}
        />
    );

    const tabs =
        VARIANT.tabOrder === 'cartFirst'
            ? [cartTab, shopTab, meTab]
            : [shopTab, cartTab, meTab];

    return (
        <Tab.Navigator
            id="MainTabs"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: COLORS.primary,
            }}
        >
            {tabs}
        </Tab.Navigator>
    );
};