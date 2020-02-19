// NOTE: This was mostly lifted from https://github.com/wesharehoodies/webpack-2.0-from-scratch/tree/chapter-5

const webpack = require('webpack');
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

let ENV_NAME = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev';

let config = {
  entry: ['./src/Index.jsx'],
  output: {
    path: path.resolve(__dirname, 'build', ENV_NAME),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss', '.css', '.jpeg', '.jpg', '.gif', '.png', 'pde'],
    alias: {
      Assets: path.resolve(__dirname, './src/assets'),
      Components: path.resolve(__dirname, './src/components'),
      Context: path.resolve(__dirname, './src/context'),
      Icons: path.resolve(__dirname, './src/assets/images/svg/icons'),
      Middleware: path.resolve(__dirname, './src/middleware'),
      Pages: path.resolve(__dirname, './src/pages'),
      ProjectRoot: path.resolve(__dirname, './src'),
      // Redux
      Reducers: path.resolve(__dirname, './src/reducers'),
      Actions: path.resolve(__dirname, './src/actions')

    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(scss|css)$/i,
        use: ['css-hot-loader'].concat(ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: 'global',
              }
            },
            {
              loader: 'sass-loader',
            },
            {
              loader: 'sass-resources-loader',
              options: {
                resources: [
                  path.resolve(__dirname, 'src/assets/styles/_variables.scss')
                ]
              }
            }
          ]
        })),
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
          test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          use: [{
              loader: 'file-loader',
              options: {
                  name: '[name].[ext]',
                  outputPath: 'fonts/'
              }
          }]
      },
      {
          test: /\.svg$/,
          exclude: ['/node_modules/', `${__dirname}/src/assets/images/svg/static`],
          use: {
              loader: 'svg-react-loader',
          },
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/i,
        loaders: [
          'file-loader?limit=100000&context=src/assets/images/&name=images/[path][name].[ext]', {
            loader: 'image-webpack-loader',
          }
        ],
        exclude: /node_modules/,
        include: __dirname,
      },
    ]
  },
  plugins: [
    new ExtractTextWebpackPlugin({
      filename: 'styles.css',
      allChunks: true
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    historyApiFallback: true,
    inline: true,
    open: false,
    compress: true,
    hot: true,
    port: 3000,
    disableHostCheck: true
  },
  devtool: 'source-map',
}

module.exports = config;

module.exports.plugins.push(
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'process.env.API_URL': JSON.stringify(process.env.API_URL),
    'process.env.PLAID_ENV': JSON.stringify(process.env.PLAID_ENV),
    'process.env.PLAID_WEBHOOK_URL': JSON.stringify(process.env.PLAID_WEBHOOK_URL),
  })
);

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(
    new OptimizeCSSAssets()
  );

  module.exports.optimization = {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        }
      }),
    ],
  };

}
