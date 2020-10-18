import React from "react";
import { TodoList } from "../components/TodoList";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

export function Homepage() {
  return (
    <>
      <Box component="div">
        <Typography component="h1" variant="h3" color="primary" align="center">
          Todoism
        </Typography>
      </Box>
      <TodoList />
    </>
  );
}
