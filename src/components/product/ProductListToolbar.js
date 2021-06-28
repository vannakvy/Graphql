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

const ProductListToolbar = ({setKeyword,openPopup},props) => (
  <Box {...props}>
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
              placeholder="Search customer"
              variant="outlined"
            />
          </Box>
          <Button
        color="primary"
        variant="contained"
        onClick={()=>props.openPopup(true)}
      >
        Add Product
      </Button>

         </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);

export default ProductListToolbar;
