module.exports = function (api) {
    api.cache(true);

    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    root: ['./'],
                    extensions: [
                        '.ios.js',
                        '.android.js',
                        '.js',
                        '.jsx',
                        '.ts',
                        '.tsx',
                        '.json',
                    ],
                    alias: {
                        '@': './src',
                        '@assets': './src/assets',
                        '@components': './src/components',
                        '@screens': './src/screens',
                        '@navigation': './src/navigation',
                        '@stores': './src/stores',
                        '@services': './src/services',
                        '@hooks': './src/hooks',
                        '@data': './src/data',
                        '@utils': './src/utils',
                        '@constants': './src/constants',
                        '@types': './src/types',
                        '@contexts': './src/contexts',
                        '@api': './src/api',
                    },
                },
            ],
            'react-native-reanimated/plugin',
        ],
    };
};