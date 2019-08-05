import React from 'react';
import { Link } from 'react-router-dom';

const HeaderItems = props => {
  return (
    <ul className="nav navbar-nav pull-xs-right" >

      <li className="nav-item">
        <Link to="/part1" className="nav-link">
          Part1
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/part2" className="nav-link">
           Part2
        </Link>
      </li>
    </ul>
  );
};

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-light" style={{
        position: "fixed",
        top: "0",
        width: "100%",
        height: "55px",
        background: "#f1f1f1",
        zIndex: "1"
      }}>
        <div className="container">

          <Link to="/" className="navbar-brand">
            {this.props.appName}
          </Link>

          <HeaderItems />
        </div>
      </nav>
    );
  }
}

export default Header;
