import * as path from 'path'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as webpack from 'webpack'
import * as config from 'config'

const webpackConfig = {
  mode: 'development',
  entry: {
    index: path.resolve(__dirname, './src/main.ts'),
  },
  output: {
    filename: 'bundle.js',
  },
  devServer: {
    host: '0.0.0.0',
    port: '9000',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.jsx', '.css'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
    new webpack.DefinePlugin({
      'window.CANVAS_WIDTH': config.get<number>('canvas.width'),
      'window.CANVAS_HEIGHT': config.get<number>('canvas.height'),
    }),
  ],
}

export default webpackConfig
