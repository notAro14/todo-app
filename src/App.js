import React from "react";
import { TodoList } from "./components/TodoList";
import { CssBaseline } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

export default function App(props) {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box component="div">
          <Typography
            component="h1"
            variant="h3"
            color="primary"
            align="center"
          >
            Todoism
          </Typography>
        </Box>
        <TodoList />
      </Container>
    </>
  );
}
