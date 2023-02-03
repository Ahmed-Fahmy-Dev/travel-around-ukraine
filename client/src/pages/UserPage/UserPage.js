import React, { useEffect, useState } from 'react';
import { Container, Paper, CircularProgress, Typography, Tab, Box, Button } from '@mui/material';
import { TabPanel, TabList, TabContext } from '@mui/lab';
import { grey } from '@mui/material/colors';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { fetchUserInfo, setIsModalOpen } from '../../store/slices/userSlice/userSlice';
import { UserList, UserOrders } from '../../features/User/components';

const containerSX = {
  marginTop: { xs: '120px', tablet: '180px' },
  py: '20px !important',
  backgroundColor: grey.A100,
  borderRadius: '20px',
  marginBottom: '100px',
};
const preloaderSX = {
  display: 'block',
  m: '15% auto',
  width: '100px !important',
  height: '100px !important',
  color: 'secondary',
};

const buttonBoxSX = { display: 'flex', width: '100%', justifyContent: 'end', my: '20px' };

const buttonSX = {
  width: { xs: '86px', mobile: '110px', tablet: '140px', laptop: '150px' },
  px: 0,
  py: { xs: '8px', mobile: '12px', desktop: '14px' },
  mx: 4,
  fontSize: { xs: '12px', laptop: '14px' },
};

const UserPage = () => {
  const { userData, error, isLoading } = useSelector((store) => store.user, shallowEqual);
  const [value, setValue] = useState('1');
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (!userData) dispatch(fetchUserInfo());
  }, []);

  const userDataContent = userData && (
    <>
      <Typography sx={{ my: '15px', p: 0, textAlign: 'center' }} variant="h2">
        {userData.firstName} {userData.lastName}
      </Typography>

      <TabContext value={value}>
        <TabList
          textColor="secondary"
          indicatorColor="secondary"
          onChange={handleChange}
          aria-label="User tabs"
          centered
        >
          <Tab label="User Info" value="1" />
          <Tab label="Orders" value="2" />
        </TabList>

        <TabPanel value="1">
          <UserList userData={userData} />
        </TabPanel>

        <TabPanel value="2">
          <UserOrders />
        </TabPanel>
      </TabContext>

      <Box sx={buttonBoxSX}>
        <Button onClick={() => dispatch(setIsModalOpen(true))} sx={buttonSX}>
          log out
        </Button>
      </Box>
    </>
  );

  const errorContent = error && (
    <Container sx={{ textAlign: 'center' }}>
      <Typography variant="h2">Error code: {error.status}</Typography>
      <Typography sx={{ color: 'red', py: 3 }} variant="h3">
        {error.statusText}
      </Typography>
      <Typography>Please move to LogIn page</Typography>
    </Container>
  );

  return (
    <Container component={Paper} sx={containerSX}>
      {isLoading && <CircularProgress sx={preloaderSX} />}
      {userDataContent}
      {errorContent}
    </Container>
  );
};
export default UserPage;
