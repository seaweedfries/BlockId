import './Navbar.css'
import React from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
} from './NavbarElements';
import { Icon, Button, ButtonGroup } from '@chakra-ui/react';
import { MdWallet } from "react-icons/md";

export default function Navbar(props) {
  return (
    <Nav>
      <Bars />
      <NavMenu>
        <NavLink to='/' activeStyle>
          Gallery
        </NavLink>
        <NavLink to='/create-nft' activeStyle>
          Request NFT
        </NavLink>
        {props.account == '0xbBf359CA690500312003763c73Fbc21Ce3A8987A' ? ( //contract owner address CHANGE THIS
          <NavLink to='/approve-nft' activeStyle>
            Approve NFT Requests
          </NavLink>
        ): ('')} 
      </NavMenu>
      <NavBtn>
        {props.account ? (
          <>
            <p>
              {props.account.substring(0, 5)}...{props.account.substring(42, 38)} &nbsp;
            </p>
            <Button onClick={() => {props.connectWallet()}}>
              Connected
            </Button>
          </>
        ):(
          <Button leftIcon={<MdWallet />} onClick={() => {props.connectWallet()}}>
            Connect Wallet
          </Button>
        )}
      </NavBtn>
    </Nav>
  );
}