
import React from 'react'
import {
  Box,
  Button,
  FormGroup,
  FormControlLabel,
  FormControl,
  Card,
  Checkbox,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import DatePickerTwo from '../DatePickerTow';
import { Search as SearchIcon } from 'react-feather';
import Popup from '../Popup'
import Dropdown from '../Dropdown'
const OrderListToolbar = ({setKeyword, ranges, setRange},props) => {
 const [open, setOpen] = React.useState(false)
 const [switchToDate, setSwitchToDate] =React.useState(false)

 const handleSwitchChange = () => {
  setSwitchToDate(!switchToDate)
  setRange({
    startDate: "",
    endDate: "",
  });
 }


  return <Box {...props}>
    <Box sx={{ mt: 1 }}>
      <Card>
        <CardContent>
         <Box display="flex" justifyContent="space-between">
           
           <Box sx={{ maxWidth: 500}} flexGrow={2}>
            <TextField
            onChange={(e)=>setKeyword(e.target.value)}
              fullWidth
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      fontSize="small"
                      color="action"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Search by ...."
              variant="outlined"
            />

          </Box>
          <FormControl>
            <FormGroup>
             <FormControlLabel
          value="end"
          control={<Checkbox color="primary" value={switchToDate} onChange={handleSwitchChange} />}
          label="Search By Date"
          labelPlacement="end"
          
        />
      </FormGroup>
    </FormControl>
    {switchToDate?  <Dropdown open={open} setOpen={setOpen}  text="Pick date to search">
          <DatePickerTwo ranges={ranges} setRange={setRange} />
          </Dropdown> :null }
         </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
}

export default OrderListToolbar;
