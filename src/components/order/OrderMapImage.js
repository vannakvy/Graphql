import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {useNavigate} from 'react-router-dom'

const useStyles = makeStyles({
  root: {
 
  },
});

export default function OrderMapImage({data}) {
  const classes = useStyles();
 const navigate = useNavigate();
  return (
    <Card className={classes.root} onClick={()=>navigate(`/app/map/${data}`)}>
      <CardActionArea>
        <CardMedia 
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image="https://assets.website-files.com/5e832e12eb7ca02ee9064d42/5f7db426b676b95755fb2844_Group%20805.jpg"
          title="Contemplative Reptile"
        />
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          See Detail
        </Button>
      </CardActions>
    </Card>
  );
}
