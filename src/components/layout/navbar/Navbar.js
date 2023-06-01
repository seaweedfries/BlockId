import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
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
      {
      props.account == '0x8519EFB74800372022094790175dB23f8Fe751c5' ? (
        <NavLink to='/approve-nft' activeStyle>
          Approve NFT Requests
        </NavLink>
      ) : ('')}
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
          onClick={() => {
            props.connectWallet()
          }}
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
