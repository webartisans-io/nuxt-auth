import { routeOption, getMatchedComponents, normalizePath } from '../utils'

export default async function (ctx) {
	// Disable middleware if options: { auth: false } is set on the route
	if (routeOption(ctx.route, 'auth', false)) { return }
	
	// Disable middleware if no route was matched to allow 404/error page
	const matches = []
	const Components = getMatchedComponents(ctx.route, matches)
	if (!Components.length) { return }
	
	// const { login, callback } = ctx.$auth.options.redirect
	const pageIsInGuestMode = routeOption(ctx.route, 'auth', 'guest')
	const insidePage = page => normalizePath(ctx.route.path) === normalizePath(page)

	
	// Step 1.  Is user logged in?
	if (ctx.$auth.isLoggedIn) {
		// -> yes -> Is page "guest" only?
		if (pageIsInGuestMode) {
			// --> yes -> redirect to "dashboard"
			ctx.redirect("/secret")
		} else {
			// --> no -> do nothing
		}
	}
	else {
		console.log('not logged in')
		if (pageIsInGuestMode) {
			console.log('do not redirect')
			// --> yes -> do nothing
		} else {
			console.log('redirect to login')
			// --> no -> redirect to login
			ctx.redirect("/login")
		}
	}
}
