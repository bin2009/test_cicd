// module.exports = {
//     apps: [
//         {
//             name: 'melodies',
//             script: './src/server.js',
//             watch: false,
//             autorestart: true,
//             // max_restarts: 10,
//             restart_delay: 1000,
//             env: {
//                 NODE_ENV: 'development',
//             },
//             env_production: {
//                 NODE_ENV: 'production',
//             },
//         },
//     ],
// };

module.exports = {
    apps: [
        {
            name: 'melodies',
            script: 'babel-node',
            args: './src/server.js',
            watch: true,
            env: {
                BUILD_MODE: 'dev',
            },
        },
    ],
};
