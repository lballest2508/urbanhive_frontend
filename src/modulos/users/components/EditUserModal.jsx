import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from "react";
import { editUser, getUsers } from "../utils/utils";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 400,
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

export const EditUserModal = ({ isOpen, handleClose, userDetails, setFilteredUser }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const handleEditUser = () => { 
    editUser(name, username, userDetails.id).then((data) => {
        if (!data) getUsers().then((data) => { setFilteredUser(data) });
    });
    handleClose();
   }

  useEffect(() => {
    if (userDetails) {
      setName(userDetails.name || "");
      setUsername(userDetails.username || "");
    }
  }, [userDetails]);

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
            EDITAR USUARIO
          </Typography>
        </Box>
        <Grid
          container
          style={{ display: "flex", justifyContent: "center", gap: "40px" }}
        >
          <TextField
            label="Nombre"
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Nombre de Usuario"
            variant="standard"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Grid>
        <Box sx={footerStyle}>
          <Button
            color="primary"
            style={{ backgroundColor: "white", color: "#1976D2" }}
            onClick={handleEditUser}
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
