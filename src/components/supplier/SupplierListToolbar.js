import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
} from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";

const CustomerListToolbar = ({handleKeywordChange,setOpenForm},props) => (
  <Box {...props}>
    <Box sx={{ mt: 1 }}>
    <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" flexWrap="flex">
            <Box sx={{ maxWidth: 600 }} flexGrow={2}>
              <TextField
                fullWidth
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Search by first name , lastName , email , village, commune, district, province..."
                variant="outlined"
                onChange={(e)=>handleKeywordChange(e.target.value)}
              />
            </Box>
            <Button size="small" color="primary" variant="contained" onClick={()=>setOpenForm(true)}>
              Add New User
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);

export default CustomerListToolbar;
