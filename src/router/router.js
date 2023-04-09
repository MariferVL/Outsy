import routes from './routes.js';

class Router {
  constructor() {
    this.routes = routes;
    this.currentRoute = null;
    this.container = document.getElementById('root');
    window.addEventListener('popstate', this.handlePopState.bind(this));
  }

  navigateTo(path) {
    const route = Object.values(this.routes).find(route => route.path === path);
    if (route) {
      this.currentRoute = route;
      this.container.innerHTML = route.template;
      document.title = route.title;
      window.history.pushState({ path }, '', path);
    }
  }

  handlePopState(event) {
    const { path } = event.state || {};
    this.navigateTo(path || '/');
  }

  start() {
    this.navigateTo(window.location.pathname);
  }
}

export default new Router();
