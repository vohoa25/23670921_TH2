const fs = require('fs');
const path = require('path');

// Danh sách các thư mục cần tạo
const folders = [
    'docs',
    'src/constants',
    'src/hooks',
    'src/services',
    'src/stores',
    'src/navigation',
    'src/components',
    'src/screens',
];

// Danh sách các file cần khởi tạo (nếu chưa có)
const files = [
    'README.md',
    'App.tsx',
    'package.json',
    'babel.config.js',
    'tsconfig.json',
    'src/constants/student.ts',
    'src/constants/theme.ts',
    'src/hooks/useDebouncedValue.ts',
    'src/hooks/useCampusLocation.ts',
    'src/services/apiClient.ts',
    'src/services/productApi.ts',
    'src/stores/authStore.ts',
    'src/stores/cartStore.ts',
    'src/navigation/RootNavigator.tsx',
    'src/navigation/AuthStack.tsx',
    'src/navigation/MainTabs.tsx',
    'src/navigation/ShopStack.tsx',
    'src/components/ProductCard.tsx',
    'src/components/Watermark.tsx',
    'src/screens/LoginScreen.tsx',
    'src/screens/HomeScreen.tsx',
    'src/screens/DetailScreen.tsx',
    'src/screens/CartScreen.tsx',
    'src/screens/MeScreen.tsx',
    'docs/screenshot-th2-home.png',
    'docs/screenshot-th2-cart.png',
];

console.log('🚀 Đang khởi tạo cây thư mục dự án KTXGo_23670921...\n');

// 1. Tạo thư mục
folders.forEach((folder) => {
    const dirPath = path.join(__dirname, folder);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`  [+] Đã tạo thư mục: ${folder}`);
    }
});

// 2. Tạo file trống
files.forEach((file) => {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) {
        // Nếu là file png giả lập thì ghi file rỗng, file khác tạo comment header
        if (file.endsWith('.png')) {
            fs.writeFileSync(filePath, '');
        } else {
            fs.writeFileSync(filePath, `// File: ${file}\n`);
        }
        console.log(`  [✓] Đã tạo file: ${file}`);
    }
});

console.log('\n✨ Đã khởi tạo thành công cây thư mục hoàn chỉnh!');