import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Button,
  Typography,
} from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { indigo } from "@material-ui/core/colors";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { CREATE_NEW_ORDER } from "../../graphql/order";
const TotalProfit = (props) => {
  const [createOrderItem, { data }] = useMutation(CREATE_NEW_ORDER);

  const createOrder = () => {

    const arr =[
      { product: "609c931482a24b1ca89992c8",
     name: "product very much",
     qty: 4,
     salePrice: 5,
     category: "grocery"},
     { product: "609c931482a24b1ca89992c8",
     name: "product very much",
     qty: 4,
     salePrice: 5,
     category: "grocery"}
    ];
    createOrderItem({
      variables: {
        user_id: "6094acd939f3530fcc801913",
        paymentMethod: "cash",
        taxPrice: 2,
        shippingPrice: 4,
        totalPrice: 10,
        orderItems: arr,
        address: "Siem Reap , cambodia",
        tel: "212332",
        email: "email@gmail.com",
        long: 102.3,
        lat: 23.3,
      },
    });
  };
  return (
    <Card {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              TOTAL PROFIT
            </Typography>
            <Typography color="textPrimary" variant="h3">
              $0000
            </Typography>
            {/* <Button variant="contained" onClick={() => createOrder()}>
              Testing
            </Button> */}
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: indigo[600],
                height: 56,
                width: 56,
              }}
            >
              <AttachMoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TotalProfit;
