import { Doughnut } from "react-chartjs-2";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  useTheme,
} from "@material-ui/core";

import FastfoodIcon from "@material-ui/icons/Fastfood";
import LocalBarIcon from "@material-ui/icons/LocalBar";
import NatureIcon from "@material-ui/icons/Nature";
import {useQuery} from '@apollo/client'
import {GET_PRODUCT_SOLD_BY_CATEGORY} from '../../graphql/order'
const CategoryTrafic = (props) => {
  const theme = useTheme();
  const {data : cateData,loading, error} = useQuery(GET_PRODUCT_SOLD_BY_CATEGORY);
  const data = {
    datasets: [
      {
        data: [cateData?.classifyNumberOfProductSold?.food, cateData?.classifyNumberOfProductSold?.grocery, cateData?.classifyNumberOfProductSold?.drink],
        backgroundColor: [
          colors.indigo[500],
          colors.red[600],
          colors.orange[600],
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white,
      },
    ],
    labels: ["Food", "Grocery", "Drink"],
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: "index",
      titleFontColor: theme.palette.text.primary,
    },
  };

  const devices = [
    {
      title: "Food",
      value: cateData?.classifyNumberOfProductSold?.food,
      icon: FastfoodIcon,
      color: colors.indigo[500],
    },
    {
      title: "Grocery",
      value: cateData?.classifyNumberOfProductSold?.grocery,
      icon: NatureIcon,
      color: colors.red[600],
    },
    {
      title: "Drink",
      value: cateData?.classifyNumberOfProductSold?.drink,
      icon: LocalBarIcon,
      color: colors.orange[600],
    },
  ];

  return (
    <Card {...props}>
      <CardHeader title="Category Tracking" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: "relative",
          }}
        >
          <Doughnut data={data} options={options} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 2,
          }}
        >
          {devices.map(({ color, icon: Icon, title, value }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: "center",
              }}
            >
              <Icon color="action" />
              <Typography color="textPrimary" variant="body1">
                {title}
              </Typography>
              <Typography style={{ color }} variant="h2">
                {value}%
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CategoryTrafic;
