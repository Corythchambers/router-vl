class Link extends Component {
  handleClick = (event) => {
    const { repalce, to } = this.props;
    event.preventDefault();

    //route here
  };

  render() {
    const { to, children } = this.props;

    return (
      <a href={to} onClick={this.handleClick}>
        {children}
      </a>
    );
  }
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
  replace: PropTypes.bool,
};
