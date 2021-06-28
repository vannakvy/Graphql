import shadows from "./shadows";
import typography from "./typography";
import { createMuiTheme, colors } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#F4F6F8",
      paper: colors.common.white,
    },
    tbHead:{
      main:"#8f3245",
      light:"#3c44b126"
    },
    primary: {
      contrastText: "#ffffff",
      main: "#5664d2",
    },
    text: {
      primary: "#172b4d",
      secondary: "#6b778c",
    },
    edit_bg:{
      main:"#333996",
      light:"#3c44b126"
    },
    delete_bg:{
      main:"#f83245",
      light:"#f8324526"
    }
  },
  shadows,
  typography,
  
});

export default theme;
