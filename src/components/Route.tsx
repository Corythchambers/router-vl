import React from "react";
import PropTypes from "prop-types";

class Route extends React.Component {
  componentDidMount() {
    window.addEventListener("popstate", this.handlePop);
  }
  componentWillUnmount() {
    window.removeEventListener("popstate", this.handlePop);
  }

  handlePop = () => {
    this.forceUpdate();
  };

  render() {
    let instances = [];
    const { path, exact, component, render } = this.props;

    const historyPush = (path) => {
      window.history.pushState({}, null, path);
      instances.forEach((instance) => instance.forceUpdate());
    };

    const historyReplace = (path) => {
      window.history.replaceState({}, null, path);
      instances.forEach((instance) => instance.forceUpdate());
    };

    const matchPath = (pathname, options) => {
      const { exact = false, path } = options;

      if (!path) {
        return {
          path: null,
          url: pathname,
          isExact: true,
        };
      }

      const match = new RegExp(`^${path}`).exec(pathname);

      if (!match) {
        return null;
      }

      const url = match[0];
      const isExact = pathname === url;

      if (exact && !isExact) {
        return null;
      }

      return { path, url, isExact };
    };

    const match = matchPath(window.location.pathname, { path, exact });

    if (!match) {
      return null;
    }

    if (component) {
      return React.createElement(component, { match });
    }

    if (render) {
      return render({ match });
    }

    return null;
  }
}

Route.propTypes = {
  path: PropTypes.string,
  exact: PropTypes.bool,
  component: PropTypes.func,
  render: PropTypes.func,
};
