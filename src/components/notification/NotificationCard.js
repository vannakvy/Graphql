import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { FormGroup,FormControlLabel,Checkbox } from '@material-ui/core';
import {useNavigate} from 'react-router-dom'
const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
  },

});

export default function NotificationCard({eventType,message,allClient, user,id}) {
  const classes = useStyles();
  const navigate = useNavigate()

  // const [handleChange,sethandleChange] =React.useState({

  // })
const handleChange = ()=>{

}
  return (
    <Card className={classes.root}>
      <CardActionArea onClick={()=>navigate(`/app/notidetail/${id}`,{replace:true})}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {eventType}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {message}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <FormGroup row>
      <FormControlLabel
        control={<Checkbox checked={allClient} onChange={handleChange} name="checkedA" />}
        label={user?.username}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={allClient}
            onChange={handleChange}
            name="checkedB"
            color="primary"
          />
        }
        label="Every One"
      />
      </FormGroup>
      </CardActions>
    </Card>
  );
}