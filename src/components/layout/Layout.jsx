import React, { useState } from 'react';
import { Header, Footer, Content, Router } from '..';

const Layout = () => {
  return (
    <div style={{ display: 'flex-col' }}>
      <Header />
      <Content/>
      <Footer />
    </div>
  );
}

export default Layout;
