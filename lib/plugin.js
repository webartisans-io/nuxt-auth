import AuthModule from './AuthModule'

// Install the plugin
export default function (ctx, inject) {
	const options = JSON.parse(`<%= JSON.stringify(options) %>`)
	
	const auth = new AuthModule(ctx, options)
	inject('auth', auth)
}
