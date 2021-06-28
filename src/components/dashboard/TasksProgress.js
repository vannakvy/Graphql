import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
} from "@material-ui/core";

import { orange, green } from "@material-ui/core/colors";
import InsertChartIcon from "@material-ui/icons/InsertChartOutlined";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import {useQuery} from '@apollo/client'
import {GET_TOTAL} from '../../graphql/product'



const TasksProgress = (props) => {

  const {data, error, loading} = useQuery(GET_TOTAL)
  console.log(data)
  return <Card sx={{ height: "100%" }} {...props}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="h6">
            TOTAL ITEMS
          </Typography>
          <Typography color="textPrimary" variant="h3">
            {data?.totalProduct}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: orange[600],
              height: 56,
              width: 56,
            }}
          >
            <InsertChartIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          pt: 2,
        }}
      >
        <ArrowUpwardIcon sx={{ color: orange[900] }} />
        <Typography
          variant="body2"
          sx={{
            color: green[900],
            mr: 1,
          }}
        >
          16%
        </Typography>
        <Typography color="textSecondary" variant="caption">
          Since last month
        </Typography>
      </Box>
    </CardContent>
  </Card>
};

export default TasksProgress;
