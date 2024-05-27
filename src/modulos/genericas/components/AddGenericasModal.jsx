import { Box, Button, Grid, Input, Modal, TextField, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import { addGenerica, getGenericas } from "../utils/utils";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: 500,
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

export const AddGenericasModal = ({ isOpen, handleClose, setProductos }) => {
    const [idAuxiliar, setIdAuxiliar] = useState("");
    const [idParametro, setIdParametro] = useState("");
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");
    const [cantidad, setCantidad] = useState("");

    const handleAddProduct = () => {
        addGenerica(idAuxiliar, idParametro, nombre, descripcion, precio, cantidad).then((data) => {
            if (!data) getGenericas().then((data) => { setProductos(data) });
            handleClose();
        });
    }

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
                        AGREGAR GENERICA
                    </Typography>
                </Box>
                <Grid
                    container
                    style={{ display: "flex", justifyContent: "center", gap: "40px" }}
                >
                    <TextField
                        label="Id auxiliar"
                        variant="standard"
                        value={idAuxiliar}
                        onChange={(e) => setIdAuxiliar(e.target.value)}
                    />
                    <TextField
                        label="Id parametro"
                        variant="standard"
                        value={idParametro}
                        onChange={(e) => setIdParametro(e.target.value)}
                    />
                    <TextField
                        label="Nombre"
                        variant="standard"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        style={{ width: "70%" }}
                    />
                    <TextField
                        label="Descripción"
                        variant="standard"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        style={{ width: "70%" }}
                    />
                    <TextField
                        label="Precio"
                        variant="standard"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                    />
                    <TextField
                        label="Cantidad"
                        variant="standard"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                    />
                    <label htmlFor="contained-button-file" >
                        <Input accept="image/*" id="contained-button-file" multiple type="file" />
                    </label>
                </Grid>
                <Box sx={footerStyle}>
                    <Button
                        color="primary"
                        style={{ backgroundColor: "white", color: "#1976D2" }}
                        onClick={handleAddProduct}
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
