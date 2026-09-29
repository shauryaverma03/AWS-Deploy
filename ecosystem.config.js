module.exports = {
	apps: [
		{
			name: 'aws-app',
			script: './index.js',
			instances: 1,
			exec_mode: 'fork',
			env: {
				NODE_ENV: 'production',
				PORT: 3000,
			},
		},
	],
};