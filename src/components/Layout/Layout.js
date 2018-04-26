import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MenuSidebar from './../Sidebar/MenuSidebar';
import './Layout.scss';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  componentWillMount() {
    if (!localStorage.getItem('role')) {
      localStorage.setItem('role', 'GPC');
    }
  }

  toggleDrawer = () => this.setState({ open: !this.state.open });

  render() {
    const { location } = this.props;
    let isLogin = false;
    if (location.pathname === '/' || location.pathname === '/login' || location.pathname === 'login' || location.pathname === 'NewUser' || location.pathname === '/NewUser') {
      isLogin = true;
    }
    return (
      <main className={isLogin ? 'loginWrapp' : 'app'}>
        <div className="app-wrapper">
          {isLogin ? '' : <Header location={location} />}
          {isLogin ? '' : <MenuSidebar location={location} />}
          <section className="content paddingTop-10">
            {this.props.children}
          </section>
          {isLogin ? '' : <Footer />}
        </div>
      </main>
    );
  }
}

export default Layout;
