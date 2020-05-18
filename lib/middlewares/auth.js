import { routeOption, getMatchedComponents, normalizePath } from '../utils'

export default async function (ctx) {
	// Disable middleware if options: { auth: false } is set on the route
	if (routeOption(ctx.route, 'auth', false)) { return }
	
	// Disable middleware if no route was matched to allow 404/error page
	const matches = []
	const Components = getMatchedComponents(ctx.route, matches)
	if (!Components.length) { return }
	
	const { login, dashboard } = ctx.app.$auth.opts.redirects
	const pageIsInGuestMode = routeOption(ctx.route, 'auth', 'guest')
	const insidePage = page => normalizePath(ctx.route.path) === normalizePath(page)

	
	// Step 1.  Is user logged in?
	if (ctx.app.$auth.isLoggedIn) {
		// -> yes -> Is page "guest" only?
		if (pageIsInGuestMode) {
			// --> yes -> redirect to "dashboard"
			ctx.redirect(dashboard)
		} else {
			// --> no -> do nothing
		}
	}
	else {
		if (pageIsInGuestMode) {
			// --> yes -> do nothing
		} else {
			// --> no -> redirect to login
			ctx.redirect(login)
		}
	}
}
