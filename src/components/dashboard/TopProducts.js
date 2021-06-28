import { v4 as uuid } from 'uuid';
import moment from 'moment';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {useQuery} from '@apollo/client'
import {GET_ALL_PRODUCTS,GET_TOP_PRODUCTS
  } from '../../graphql/product'
import {useNavigate} from 'react-router-dom'


const TopProducts = (props) => {
  const {data, loading,error} = useQuery(GET_TOP_PRODUCTS)
 
  const navigate = useNavigate();
 
  
  return <Card {...props}>
    <CardHeader
      
      title="Latest Products"
      subtitle={`${data?.getTopProducts?.length} in total`}
    />
    <Divider />
    <List>
      {data?.getTopProducts?.map((product, i) => (
        <ListItem onClick={() =>navigate(`/app/productDetail/${product?.id}`)}
          divider={i < data?.getTopProducts?.length - 1}
          key={product.id}
        >
          <ListItemAvatar>
            <img
              alt={product?.productName}
              src={product?.productImage}
              style={{
                height: 48,
                width: 48
              }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={product.productName}
            secondary={`Updated ${product.updatedAt}`}
          />
          <IconButton
            edge="end"
            size="small"
          >
            <MoreVertIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
    <Divider />
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    >
      <Button
        color="primary"
        endIcon={<ArrowRightIcon />}
        size="small"
        variant="text" onClick={()=>navigate('/app/products', { replace: true })}
      >
        View all
      </Button>
    </Box>
  </Card>
};

export default TopProducts;
