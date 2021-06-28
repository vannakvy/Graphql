import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
  FormControl,
  Select,
  TextField,
  InputLabel,
  makeStyles,
} from "@material-ui/core";
import { TryOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "100%",
    // backgroundColor:'red'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const NotificationForm = ({data}) => {
  const classes = useStyles();
console.log(data)
  const handleChange = () => {};
  const values = "";
  return (
    <form autoComplete="off">
      <Card>
        <CardHeader
          subheader="Manage the notifications"
          title="Notifications"
        />
  
        <CardContent>
          <Grid container spacing={6} wrap="wrap">
            <Grid item sx={12} md={6} lg={6}>
              <TextField
                fullWidth
                id="outlined-required"
                label=""
                defaultValue={data?.eventType}
                variant="outlined"
              />
            </Grid>

            <Grid item sx={12} md={6} lg={6}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="filled-age-native-simple">
                  Select Client
                </InputLabel>
                <Select
                  fullWidth
                  native
          
                  onChange={handleChange}
                  defaultValue={data?.user?.username}
                >
                  <option aria-label="None" value="" />
                  <option value={10}>fgd</option>
                  <option value={20}>Twenty</option>
                  <option value={30}>Thirty</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid item sx={12} md={6} lg={6}>
              <TextField
                fullWidth
                multiline
                rows={4}
                id="outlined-required"
                label=""
                defaultValue={data?.message}
                variant="outlined"
              />
            </Grid>
            <Grid item sx={12} md={6} lg={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data?.allClient}
                    onChange={handleChange}
                    name="checkedA"
                  />
                }
                label="All Client"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained">
            Save
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default NotificationForm;
