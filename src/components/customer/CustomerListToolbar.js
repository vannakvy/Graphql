import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const CustomerListToolbar = ({handleKeywordChange},props) => (
  <Box {...props}>

    <Box sx={{ mt: 1 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500, }}>
            <TextField
              fullWidth
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
              placeholder="Search customer"
              variant="outlined"
              onChange={(e)=>handleKeywordChange(e.target.value)}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);

export default CustomerListToolbar;
