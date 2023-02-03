import BedIcon from '@mui/icons-material/Bed';
import PersonIcon from '@mui/icons-material/Person';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';

const convertData = (professionalGuide, accommodation, meals, transferAlongTheRoute, travelInsurance) => {
  const array = [
    { name: professionalGuide, icon: <PersonIcon color="primary" />, service: 'Professional guide' },
    { name: accommodation, icon: <BedIcon color="primary" />, service: 'Accomodation' },
    { name: meals, icon: <RestaurantIcon color="primary" />, service: 'Meals' },
    { name: travelInsurance, icon: <VerifiedUserIcon color="primary" />, service: 'Insurance' },
    { name: transferAlongTheRoute, icon: <AirportShuttleIcon color="primary" />, service: 'Transfer' },
  ];

  const included = array.filter((item) => item.name);

  return included;
};

export default convertData;
