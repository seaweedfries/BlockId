import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

// export const Navbar = BrowserRouter(({ account, connectWallet }) => {
//   const [anchorEl, setAnchorEl] = useState(null)
//   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)

//   const isMenuOpen = Boolean(anchorEl)
//   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

//   const handleProfileMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget)
//   }

//   const handleMobileMenuClose = () => {
//     setMobileMoreAnchorEl(null)
//   }

//   const handleMenuClose = () => {
//     setAnchorEl(null)
//     handleMobileMenuClose()
//   }

//   const handleMobileMenuOpen = (event) => {
//     setMobileMoreAnchorEl(event.currentTarget)
//   }

//   const menuId = 'primary-search-account-menu'
//   const renderMenu = (
//     <Menu
//       anchorEl={anchorEl}
//       anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       id={menuId}
//       keepMounted
//       transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//       open={isMenuOpen}
//       onClose={handleMenuClose}
//     >
//       <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
//       <MenuItem onClick={handleMenuClose}>My account</MenuItem>
//     </Menu>
//   )

//   const mobileMenuId = 'primary-search-account-menu-mobile'
//   const renderMobileMenu = (
//     <Menu
//       anchorEl={mobileMoreAnchorEl}
//       anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       id={mobileMenuId}
//       keepMounted
//       transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//       open={isMobileMenuOpen}
//       onClose={handleMobileMenuClose}
//     >
//       <MenuItem>
//         <IconButton aria-label="show 4 new mails" color="inherit">
//           <Badge badgeContent={4} color="secondary">
//             <MailIcon />
//           </Badge>
//         </IconButton>
//         <p>Messages</p>
//       </MenuItem>
//       <MenuItem>
//         <IconButton aria-label="show 11 new notifications" color="inherit">
//           <Badge badgeContent={11} color="secondary">
//             <NotificationsIcon />
//           </Badge>
//         </IconButton>
//         <p>Notifications</p>
//       </MenuItem>
//       <MenuItem onClick={handleProfileMenuOpen}>
//         <IconButton
//           aria-label="account of current user"
//           aria-controls="primary-search-account-menu"
//           aria-haspopup="true"
//           color="inherit"
//         >
//           <AccountCircle />
//         </IconButton>
//         <p>Profile</p>
//       </MenuItem>
//     </Menu>
//   )

//   return (
//     <StylesProvider injectFirst>
//       <div className="grow">
//         <AppBar position="static">
//           <Toolbar>
//             <Link to="/" className="whiteLink">
//               <img src={logo} alt="logo" className="logo" />
//             </Link>
//             <Link to="/" className="whiteLink">
//               <Typography className="title" variant="h6" noWrap>
//                 PetGram
//               </Typography>
//             </Link>
//             <Button className="whiteLink" component={Link} to="/">
//               Home
//             </Button>

//             <Button className="whiteLink" component={Link} to="/create-pet">
//               Create Pet
//             </Button>

//             <div className="grow" />
//             <div className="sectionDesktop">
//             {
//   account ? (
//     <>
//       <Button className="whiteLink">
//         {account.substring(0, 8)}...{account.substring(32, 24)}
//       </Button>
//       <Button
//         variant="contained"
//         className="connected-btn"
//         endIcon={<VerifiedUserSharpIcon />}
//       >
//         Connected
//       </Button>
//     </>
//   ) : (
// }

//               <IconButton
//                 edge="end"
//                 aria-label="account of current user"
//                 aria-controls={menuId}
//                 aria-haspopup="true"
//                 onClick={handleProfileMenuOpen}
//                 color="inherit"
//               >
//                 <AccountCircle />
//               </IconButton>
//             </div>
//             <div className="sectionMobile">
//               <IconButton
//                 aria-label="show more"
//                 aria-controls={mobileMenuId}
//                 aria-haspopup="true"
//                 onClick={handleMobileMenuOpen}
//                 color="inherit"
//               >
//                 <MoreIcon />
//               </IconButton>
//             </div>
//           </Toolbar>
//         </AppBar>
//         {renderMobileMenu}
//         {renderMenu}
//       </div>
//     </StylesProvider>
//   )
// })
// export default Navbar

import React from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';

export default function Navbar(props) {
  return (
    <>
    <Nav>
      <Bars />

      <NavMenu>
      <NavLink to='/' activeStyle>
        Home
      </NavLink>
      <NavLink to='/create-nft' activeStyle>
        Create NFT
      </NavLink>
      </NavMenu>
      <NavBtn>
        {
    props.account ? (
      <>
        <p className="whiteLink">
          {props.account.substring(0, 5)}...{props.account.substring(42, 38)} &nbsp;
        </p>
        <button
          variant="contained"
          className="connected-btn"
        >
          Connected
        </button>
      </>
    ) : (
      <button
        variant="contained"
        className="connect-wallet-btn"
        onClick={() => {
          props.connectWallet()
        }}
      >
        Connect Wallet
      </button>
    )
  }
      </NavBtn>
    </Nav>
    </>
  );
}
