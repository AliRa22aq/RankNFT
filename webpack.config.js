module: {
    rules: [ 
      {test: require.resolve('jquery'), loader: 'expose-loader?$!expose-loader?jQuery'}
    ]
  }