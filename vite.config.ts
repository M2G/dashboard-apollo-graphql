import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

export default defineConfig(() => ({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      assets: path.resolve(__dirname, './src/assets/'),
      components: path.resolve(__dirname, './src/components/'),
      constants: path.resolve(__dirname, './src/constants/'),
      containers: path.resolve(__dirname, './src/containers/'),
      exceptions: path.resolve(__dirname, './src/exceptions/'),
      fixtures: path.resolve(__dirname, './src/fixtures/'),
      gql: path.resolve(__dirname, './src/gql/'),
      modules: path.resolve(__dirname, './src/modules/'),
      routes: path.resolve(__dirname, './src/routes/'),
      sentry: path.resolve(__dirname, './src/sentry/'),
      services: path.resolve(__dirname, './src/services/'),
    },
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
      },
    },
    esbuild: {
      jsxFactory: 'React.createElement',
      jsxFragment: 'React.Fragment',
    },
  },
}));
