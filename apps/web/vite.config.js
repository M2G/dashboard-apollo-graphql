import path from 'path';
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

import packageJson from './package.json';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    define: {
      'process.env': {},
      'import.meta.env.PACKAGE_VERSION': JSON.stringify(packageJson.version),
    },
    plugins: [
      react({
        jsxImportSource: '@welldone-software/why-did-you-render', // <-----
      }),
      svgr(),
    ],
    publicDir: 'public',
    resolve: {
      alias: {
        // Needed for `useSelector` tracking in wdyr.tsx: https://github.com/welldone-software/why-did-you-render/issues/85
        //@see only with react-redux
        '@': path.resolve(__dirname, './src'),
        //'react-redux': 'react-redux/dist/react-redux.js',
        '@types': path.resolve(__dirname, './src/@types'),
        api: path.resolve(__dirname, './src/api/'),
        api2: path.resolve(__dirname, './src/api2/'),
        assets: path.resolve(__dirname, './src/assets/'),
        components: path.resolve(__dirname, './src/components/'),
        constants: path.resolve(__dirname, './src/constants/'),
        containers: path.resolve(__dirname, './src/containers/'),
        exceptions: path.resolve(__dirname, './src/exceptions/'),
        fixtures: path.resolve(__dirname, './src/fixtures/'),
        gql: path.resolve(__dirname, './src/gql/'),
        hooks: path.resolve(__dirname, './src/hooks/'),
        index: path.resolve(__dirname, './src/index/'),
        modules: path.resolve(__dirname, './src/modules/'),
        routes: path.resolve(__dirname, './src/routes/'),
        sentry: path.resolve(__dirname, './src/sentry/'),
        services: path.resolve(__dirname, './src/services/'),
        store: path.resolve(__dirname, './src/store/'),
      },
    },
    server: {
      port: 3002,
    },
    preview: {
      port: 3002,
    },
  };
});
