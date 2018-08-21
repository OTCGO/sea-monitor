module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
  apps: [
    {
      name: 'sea-monitor',
      script: './app.js',
      env: {   // all environment

      },
      'exec_mode': 'fork'  // cluster or fork
    }
  ]
}
