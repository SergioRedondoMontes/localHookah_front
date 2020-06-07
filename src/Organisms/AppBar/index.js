import React from "react";
import {
  AppBar as AppBarMui,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

const AppBar = (props) => {
  const history = useHistory();
  return (
    <AppBarMui position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flex: 1 }}>
          HOOKAH
        </Typography>
        <Button
          color="inherit"
          onClick={() => {
            localStorage.removeItem("hookah-jwt");
            history.push("/");
          }}
        >
          Cerrar sesión
        </Button>
      </Toolbar>
    </AppBarMui>
  );
};

export { AppBar };
