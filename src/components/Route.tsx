import React from "react";
import PropTypes from "prop-types";

class Route extends React.Component {
  render() {
    const { path, exact, component, render } = this.props;

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
