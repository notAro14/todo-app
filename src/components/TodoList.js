// react
import React from "react";

// material-ui
import {
  TextField,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  List,
  Paper,
  Typography,
  Button,
  Box,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";

// custom
import { normalize } from "../utils/index";
import { useLocalStorageState } from "../hooks/useLocalStorage";

// styles
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(1),
  },
  noTask: {
    marginTop: theme.spacing(5),
  },
  markedTask: {
    textDecoration: "line-through",
  },
}));

// main
export function TodoList({ initialTasks = [] }) {
  const classes = useStyles();

  // UNCOMMENT TO USE NORMAL STATE
  // const [tasks, setTasks] = React.useState(initialTasks);
  // const [checked, setChecked] = React.useState([]);

  const [tasks, setTasks] = useLocalStorageState("todoism:tasks", []);
  const [checked, setChecked] = useLocalStorageState(
    "todoism:checked-tasks",
    []
  );

  const [duplicateAlert, setDuplicateAlert] = React.useState(false);
  const [incomingTask, setIncomingTask] = React.useState("");

  function handleChange(event) {
    setIncomingTask(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (incomingTask.length === 0) return;
    if (tasks.find(({ task }) => normalize(task) === normalize(incomingTask))) {
      setDuplicateAlert(true);
      setIncomingTask("");
      setTimeout(() => {
        setDuplicateAlert(false);
      }, 2000);
      return;
    }
    setTasks((prev) => [...prev, { task: incomingTask }]);
    setIncomingTask("");
  }

  function handleToggle(value) {
    return (event) => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
      setChecked(newChecked);
    };
  }

  function deleteMarkedTask() {
    const newTasks = tasks.filter(
      ({ task }) => !checked.includes(normalize(task))
    );
    setTasks(newTasks);
    setChecked([]);
  }

  return (
    <>
      <Box>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Enter a task"
            autoFocus
            fullWidth
            value={incomingTask}
            onChange={handleChange}
          />
        </form>
        {duplicateAlert && (
          <div role="alert">
            <Typography component="p" variant="caption" color="error">
              Task already entered.
            </Typography>
          </div>
        )}
      </Box>
      {tasks.length ? (
        <Box>
          <Paper elevation={1} className={classes.root}>
            <List>
              {tasks.map(({ task }) => {
                const id = normalize(task);
                return (
                  <ListItem
                    onClick={handleToggle(id)}
                    key={id}
                    dense
                    divider={tasks.length > 1}
                    button
                  >
                    <ListItemText
                      className={
                        checked.indexOf(id) !== -1 ? classes.markedTask : ""
                      }
                      primary={task}
                    />
                    <ListItemIcon>
                      <Checkbox
                        color="primary"
                        edge="end"
                        checked={checked.indexOf(id) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{
                          "aria-label":
                            "checkbox for markin a task as completed",
                        }}
                      />
                    </ListItemIcon>
                  </ListItem>
                );
              })}
            </List>
          </Paper>
          <Button
            style={{ marginBottom: "1.5rem" }}
            disabled={checked.length === 0}
            variant="outlined"
            startIcon={<DeleteIcon />}
            color="secondary"
            onClick={deleteMarkedTask}
          >
            Delete all marked task
          </Button>
        </Box>
      ) : (
        <Typography
          className={classes.noTask}
          component="p"
          color="textSecondary"
          variant="h6"
        >
          No tasks left. You are doing great.
        </Typography>
      )}
    </>
  );
}
