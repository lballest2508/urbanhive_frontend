import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import { changePassword } from "../utils/utils";

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
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '20px',
};

export const ChangePasswordModal = ({ isOpen, handleClose, userDetails, setUserDetails }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSavePassword = () => {
    if (newPassword == confirmPassword) {
      changePassword(userDetails.id, newPassword).then(() => {
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
            CAMBIAR CONTRASEÑA
          </Typography>
        </Box>
        <Grid
          container
          style={{ display: "flex", justifyContent: "center", gap: "40px" }}
        >
          <TextField
            label="Usuario"
            variant="standard"
            type="text"
            value={userDetails.username || ""}
            onChange={(e) =>
              setUserDetails({ ...userDetails, username: e.target.value })
            }
            disabled
          />
          <TextField
            label="Password"
            variant="standard"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            label="Confirm Password"
            variant="standard"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Grid>
        <Box sx={footerStyle}>
          <Button
            color="primary"
            style={{ backgroundColor: "white", color: "#1976D2" }}
            onClick={handleSavePassword}
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
