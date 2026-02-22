const routes = {}

export function route(pattern, handler) {
  routes[pattern] = handler
}

export function navigate(path) {
  window.location.hash = path
}

export function initRouter() {
  const handleRoute = () => {
    const hash = window.location.hash.slice(1) || '/'
    const [path] = hash.split('?')

    // Exact match
    if (routes[path]) {
      routes[path](path, {})
      return
    }

    // Parameterized match
    for (const [pattern, handler] of Object.entries(routes)) {
      const { regex, keys } = patternToRegex(pattern)
      const match = path.match(regex)
      if (match) {
        const params = {}
        keys.forEach((key, i) => { params[key] = match[i + 1] })
        handler(path, params)
        return
      }
    }

    // Fallback
    if (routes['*']) routes['*'](path, {})
  }

  window.addEventListener('hashchange', handleRoute)
  handleRoute()
}

function patternToRegex(pattern) {
  const keys = []
  const escaped = pattern
    .replace(/\//g, '\\/')
    .replace(/:(\w+)/g, (_, key) => { keys.push(key); return '([^\\/]+)' })
  return { regex: new RegExp(`^${escaped}$`), keys }
}
