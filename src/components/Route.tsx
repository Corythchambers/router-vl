class Route extends React.Component {
    render() {
      const {
        path,
        exact,
        component,
        render,
      } = this.props
  
      const match = matchPath(
        window.location.pathname, // global variable
        { path, exact }
      )
  
      if (!match)
        // Do nothing because the current
        // location doesn't match the path prop.
  
        return null
      }
  
      if (component)
        // The component prop takes precedent over the
        // render method. If the current location matches
        // the path prop, create a new element passing in
        // match as the prop.
  
        return React.createElement(component, { match })
  
      if (render) {
        // If there's a match but component
        // was undefined, invoke the render
        // prop passing in match as an argument.
  
        return render({ match })
      }
  
      return null
    }
  }
  
  Route.propTypes = {
    path: PropTypes.string,
    exact: PropTypes.bool,
    component: PropTypes.func,
    render: PropTypes.func,
  }