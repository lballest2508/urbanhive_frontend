import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import { createUser, getUsers } from "../utils/utils";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 450,
    bgcolor: "background.paper",
    border: "0px",
    boxShadow: 24,
    p: 4,
    padding: "0px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
};

const headerStyle = {
    backgroundColor: "primary.main",
    color: "white",
    textAlign: "center",
    padding: "10px",
    display: "flex",
    justifyContent: "center",
};

const footerStyle = {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "20px",
};

export const AddUserModal = ({ isOpen, handleClose, setFilteredUser }) => {
  const [newName, setNewName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserConfirmPassword, setNewUserConfirmPassword] = useState("");

  const handleAddUser = () => {
    if (newUserPassword == newUserConfirmPassword) {
        createUser(newName, newUsername, newUserPassword).then(() => {
            getUsers().then((data) => { setFilteredUser(data) });
            handleClose();
        });
    }
  };

  return (
    <Modal
      keepMounted
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        <Box sx={headerStyle}>
          <EditIcon />
          <Typography
            variant="h6"
            component="h2"
            style={{ marginLeft: "10px" }}
          >
            AGREGAR USUARIO
          </Typography>
        </Box>
        <Grid
          container
          style={{ display: "flex", justifyContent: "center", gap: "40px" }}
        >
          <TextField
            label="Nombre"
            variant="standard"
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <TextField
            label="Usuario"
            variant="standard"
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <TextField
            label="Password"
            variant="standard"
            type="password"
            value={newUserPassword}
            onChange={(e) => setNewUserPassword(e.target.value)}
          />
          <TextField
            label="Confirm Password"
            variant="standard"
            type="password"
            value={newUserConfirmPassword}
            onChange={(e) => setNewUserConfirmPassword(e.target.value)}
          />
        </Grid>
        <Box sx={footerStyle}>
          <Button
            color="primary"
            style={{ backgroundColor: "white", color: "#1976D2" }}
            onClick={handleAddUser}
          >
            Guardar
          </Button>
          <Button
            color="secondary"
            style={{ backgroundColor: "white", color: "#1976D2" }}
            onClick={handleClose}
          >
            Cancelar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
