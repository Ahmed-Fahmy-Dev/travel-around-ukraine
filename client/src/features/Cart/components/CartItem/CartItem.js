// React
import React, { useState, useEffect, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// Redux
import { useDispatch } from 'react-redux';

// MUI components
import {
  styled,
  Stack,
  CardActions,
  CardMedia,
  Button,
  Typography,
  CardContent as MuiCardContent,
  IconButton,
  TextField,
} from '@mui/material';
import { AccessTime, Remove, Add, DeleteOutline } from '@mui/icons-material';

// Components
import { ReactComponent as CoinsIcon } from '../../../../assets/svg/CoinsIcon.svg';
import { AlertModal } from '../../../../components';

// Redux Thunk functions
import {
  addProduct,
  addProductToLocal,
  decreaseQuantity,
  deleteProduct,
  decreaseProductFromLocal,
  delProductFromLocal,
} from '../../../../store/slices/cartSlice/cartSlice';
import getProduct from '../../../../api/getProduct';

const CardContainer = styled(Stack)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.primary.contrastText,
  borderRadius: 10,
  boxShadow: '0px 0px 40px rgba(0, 0, 0, 0.05)',
}));

const CardContent = styled(MuiCardContent)(({ theme }) => ({
  [theme.breakpoints.up('tablet')]: {
    paddingTop: 24,
    width: '100%',
  },
}));

const CardImage = styled(CardMedia)(({ theme }) => ({
  width: '100%',
  maxHeight: 240,
  borderRadius: '10px 10px 0 0',

  [theme.breakpoints.up('tablet')]: {
    width: 238,
    height: 'auto',
    borderRadius: '10px 0 0 10px',
  },
}));

const CardTitle = styled((props) => <Typography variant="h3" {...props} />)(({ theme }) => ({
  color: theme.palette.text.primary,
  marginBottom: 20,
  [theme.breakpoints.up('tablet')]: {
    marginRight: 45,
  },
}));

const CardButton = styled(Button)(({ theme }) => ({
  padding: '12px 85px',
  textAlign: 'center',

  [theme.breakpoints.up('tablet')]: {
    paddingInline: '43px',
  },
}));

const DeleteButton = styled((props) => (
  <IconButton color="error" {...props}>
    <DeleteOutline />
  </IconButton>
))(({ theme }) => ({
  position: 'absolute',
  top: 15,
  right: 15,

  [theme.breakpoints.down('tablet')]: {
    backgroundColor: theme.palette.common.white,
    transition: theme.transitions.create('background-color'),

    '&:hover': {
      backgroundColor: theme.palette.grey[300],
    },
  },
}));

const AmountField = styled((props) => <TextField size="small" autoComplete="off" {...props} />)({
  maxWidth: '56px',

  '& input': {
    textAlign: 'center',
  },
});

const CartItem = ({ imageUrls, name, currentPrice, duration, cartQuantity, itemNo, id, isLogin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [amountError, setAmountError] = useState(false);

  useEffect(() => {
    // ? should error text be provided?
    // add error if amount less than 1
    if (cartQuantity < 1) {
      setAmountError(true);
    } else {
      setAmountError(false);
    }
  }, [cartQuantity]);

  const openDeleteDialog = () => setDeleteDialogOpen(true);

  const handleDeleteDialogClose = () => setDeleteDialogOpen(false);

  const handleDeleteFromCart = () => {
    isLogin ? dispatch(deleteProduct(id)) : dispatch(delProductFromLocal(id));

    setDeleteDialogOpen(false);
  };

  const increaseBtnHandler = async () => {
    if (isLogin) {
      dispatch(addProduct(id));
    } else {
      const product = await getProduct(itemNo);
      dispatch(addProductToLocal(product));
    }
  };

  const decreaseBtnHandler = () => {
    isLogin ? dispatch(decreaseQuantity(id)) : dispatch(decreaseProductFromLocal(id));
  };

  if (!imageUrls || !name || !currentPrice || !duration || !cartQuantity || !itemNo || !id) return null;

  return (
    <>
      <CardContainer direction={{ xs: 'column', tablet: 'row' }}>
        <DeleteButton onClick={openDeleteDialog} />
        {imageUrls ? <CardImage component="img" image={imageUrls[1]} alt="tour photo" /> : null}

        <CardContent>
          <CardTitle>{name}</CardTitle>

          <Stack direction="row" gap={1} alignItems="start" sx={{ marginBottom: '10px' }}>
            <Stack direction="row" gap={1} alignItems="center" flexBasis="100px">
              <CoinsIcon />
              <Typography variant="h3" component="span">
                {currentPrice * cartQuantity} €
              </Typography>
            </Stack>

            <Stack direction="row" gap={1} alignItems="center">
              <AccessTime color="primary" sx={{ height: '21px' }} />
              <Typography variant="h3" component="span">
                {duration}
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="row" marginY="5px">
            <IconButton disabled={cartQuantity <= 1} onClick={decreaseBtnHandler}>
              <Remove />
            </IconButton>
            <AmountField value={cartQuantity} error={amountError} />
            <IconButton onClick={increaseBtnHandler}>
              <Add />
            </IconButton>
          </Stack>
          <CardActions>
            <CardButton onClick={() => navigate(`/tour/${itemNo}`)}>More details</CardButton>
          </CardActions>
        </CardContent>
      </CardContainer>
      <AlertModal
        open={isDeleteDialogOpen}
        onClose={handleDeleteDialogClose}
        onSubmit={handleDeleteFromCart}
        title="Delete this tour?"
        submitButtonText="Delete"
      >
        Are you sure you want to delete tour:
        <Typography component="span" fontStyle="italic">
          {name}
        </Typography>
      </AlertModal>
    </>
  );
};

CartItem.propTypes = {
  imageUrls: PropTypes.array,
  name: PropTypes.string,
  currentPrice: PropTypes.number,
  duration: PropTypes.string,
  cartQuantity: PropTypes.number,
  itemNo: PropTypes.string,
  id: PropTypes.string,
  isLogin: PropTypes.bool,
};

CartItem.defaultProps = {
  imageUrls: [],
  name: 'unknown',
  currentPrice: 0,
  duration: '',
  cartQuantity: 0,
  itemNo: '',
  id: '',
  isLogin: false,
};

export default memo(CartItem);
