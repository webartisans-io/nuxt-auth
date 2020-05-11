import Middleware from '../middleware'
import AuthMiddleware from './middlewares/auth'
import AuthModule from './AuthModule'

Middleware.auth = AuthMiddleware

// Install the plugin
export default function (ctx, inject) {
	const options = JSON.parse(`<%= JSON.stringify(options) %>`)
	const auth = new AuthModule(ctx, options)
	inject('auth', auth)
}
