import React, { useState, useEffect } from 'react';
import { Button, Container, Typography, Box, CssBaseline, AppBar, Toolbar, IconButton, Snackbar, Divider } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

import Cookies from 'js-cookie';
import LoginPage from './LoginPage';
import ProtectedRoute from './ProtectedRoute'; 
import { getAllUsers, getMessages } from './allUsersService';

function App() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({ username: '' });
  const [messages, setMessages] = useState([]);
  const [chatRefreshKey, setChatRefreshKey] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let isUserInfoSet = false;
    if (process.env.REACT_APP_ENV === 'development') {
      console.log("In dev mode")
      const mockUserInfo = { username: 'testuser', name: 'Test User' };
      localStorage.setItem('userDetails', JSON.stringify(mockUserInfo));
      isUserInfoSet = true;
    }

    const storedUserDetails = localStorage.getItem('userDetails');
    if (storedUserDetails) {
      const userDetails = JSON.parse(storedUserDetails);
      setUserDetails(userDetails);
      setLoggedIn(true);
      isUserInfoSet = true;
    }

    if (!isUserInfoSet) {
      const encodedUserInfo = Cookies.get('userinfo');
      if (encodedUserInfo) {
        const userInfo = JSON.parse(atob(encodedUserInfo));
        setUserDetails(userInfo);
        setLoggedIn(true);
        localStorage.setItem('userDetails', JSON.stringify(userInfo));
      }
    }

    const fetchMessages = async () => {
        try {
          const msgData = await getMessages();
          setMessages(msgData);
        } catch (error) {
            console.error('Error fetching message details:', error);
        }
    };
    fetchMessages();

    const fetchData = async () => {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
        console.log(usersData);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    setLoading(false); 
  }, []);

  const handleLogout = () => {
    setUserDetails({});
    setLoggedIn(false);
    localStorage.removeItem('userDetails');
    const sessionHint = Cookies.get('session_hint');
    window.location.href = `/auth/logout?session_hint=${sessionHint}`;
    Cookies.remove('userinfo', { path: '/' });
  };

  if (loading) {
    return <div>Admin page loading...</div>; 
  }

  return (
    <>
        <CssBaseline />
        <Router>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <div style={{ flexGrow: 1 }}> {/* This div takes up the available space */}
                        <span style={{ color: 'white', fontSize: '1.25rem', fontWeight: 'bold' }}>
                            RobChat - Admin
                        </span>
                    </div>
                    {loggedIn && (
                        <Button onClick={handleLogout} color="inherit">
                            Logout
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route element={<ProtectedRoute isLoggedIn={loggedIn} />}>
                    <Route path="/" element={
                        <Container maxWidth="sm">
                            <div style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography variant="h5" style={{ marginBottom: '20px' }}>
                                    Welcome Admin, {userDetails.name}
                                </Typography>
                                <Divider style={{ margin: '20px 0' }} />
                                <TableContainer component={Paper} style={{ marginTop: '4rem' }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>Username</TableCell>
                                            <TableCell>Email</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {users.map(user => (
                                            <TableRow key={user._id}>
                                                <TableCell>{user._id}</TableCell>
                                                <TableCell>{user.username}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Divider style={{ margin: '20px 0' }} />
                            <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Sender ID</TableCell>
                                        <TableCell>Receiver ID</TableCell>
                                        <TableCell>Message</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {messages.map((message, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{35}</TableCell>
                                            <TableCell>{134}</TableCell>
                                            <TableCell>{message.message}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                            </div>
                        </Container>
                    } />
                </Route>
            </Routes>
        </Router>
    </>
);
};

export default App;