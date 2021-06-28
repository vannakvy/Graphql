import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';

const user = {
  avatar: 'https://scontent-sin6-3.xx.fbcdn.net/v/t1.6435-9/98944826_2637547379849206_1440173281050099712_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=8bfeb9&_nc_ohc=n5nrdyC3fmwAX9iC7Lt&_nc_ht=scontent-sin6-3.xx&oh=838e6d463c89e4d2937c95ce72a340d2&oe=60D0E68B',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-7'
};

const AccountProfile = (props) => (
  <Card {...props}>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{
            height: 100,
            width: 100
          }}
        />
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h3"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
        >
          {`${user.city} ${user.country}`}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
        >
          {`${moment().format('hh:mm A')} ${user.timezone}`}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button
        color="primary"
        fullWidth
        variant="text"
      >
        Upload picture
      </Button>
    </CardActions>
  </Card>
);

export default AccountProfile;
