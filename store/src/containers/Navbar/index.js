import { useAuth } from '../../contexts/auth.context';
import { useCategory } from '../../contexts/categories.context';
import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Leaderboard from 'static/leaderboard.svg';
import CampK12Logo from 'static/camp-k-12-logo.svg';
import { useHistory } from "react-router-dom";
import './styles.scss';
import './styles.css';
import { NavLink } from 'react-router-dom';
import _ from 'lodash';
import Avatar from '@material-ui/core/Avatar';
import SearchBar from './search';
import Catego from './category';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
const Navbar = () => {

  const { authenticated, user, signOut } = useAuth();
  let [catego, setCatego] = useState([]);
  let [userInfo, setUserInfo] = useState({});
  let contextCate = useCategory();
  useEffect(() => {
    let mounted = true;
    if (contextCate.categories) {
      setCatego(contextCate.categories)
    }
    if (mounted && user) {
      setUserInfo(user.user);
      mounted = false;
    }
  });
  const [isShowMobileNav, setIsShowMobileNav] = useState(false);
  let history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseLogout = () => {
    signOut();
    return window.location.reload();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function handleClickLogin() {
    history.push("/signin");
  }
  const handleLinktoProfile = () => {
    handleClose();
    history.push("/profile");


  }
  const handleLinkToMycourses = () => {
    handleClose();
    history.push("/myorders");

  }
  return (
    <nav className="container">
      <a href="/">
        <img width={'150'} src={'https://res.cloudinary.com/taskmanagereaglob123/image/upload/v1642001860/Screenshot_2022-01-12_223709-removebg-preview_smo3zg.png'} alt="Camp K12 Logo" />
      </a>
      <div className={isShowMobileNav ? 'nav-items-mobile' : 'nav-items'}>

           <SearchBar style={{ padding: '10px', marginLeft:'0px' }} />
          
           <Catego catego={catego} />    

       
        <div>

        <ShoppingCartIcon style={{marginTop: '20px', color: 'white', marginRight: '20px', cursor: 'pointer'}} onClick={()=>{ history.push('/cart')}}/>
          {authenticated === true && userInfo ?
            <div>
              <Avatar className='size-avatar' alt="Remy Sharp" src={userInfo.avatar_url} onClick={handleClick} style={{ marginTop: '10px', backgroundColor: 'white' }} />
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLinktoProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLinkToMycourses}>Danh s??ch ????n h??ng</MenuItem>
                <MenuItem onClick={handleCloseLogout}>Logout</MenuItem>
              </Menu>
            </div>
            : <button type="button" onClick={handleClickLogin}>
              Log In
            </button>}
        </div>
      </div>
      <button className="mobile-nav-button" onClick={() => setIsShowMobileNav(!isShowMobileNav)}>
        {isShowMobileNav ? '????' : '???'}
      </button>
      
    </nav>
  )

}

export default Navbar;
