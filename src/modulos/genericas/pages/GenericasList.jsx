import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, CssBaseline, Divider, Fab, Grid, IconButton, Input, List, ListItemAvatar, ListItemText, Paper, SvgIcon, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, ThemeProvider, Toolbar, Typography, createTheme, styled } from "@mui/material";
import { NavBar } from "../../../auth/hooks/NavBar";
import { mainListItems } from "../../../auth/hooks/mainListItems";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MuiDrawer from "@mui/material/Drawer";
import { getGenericas } from "../utils/utils";
import EditIcon from '@mui/icons-material/Edit';
import { EditGenericaModal } from "../components/EditGenericaModal";
import AddIcon from '@mui/icons-material/Add';
import { AddGenericasModal } from "../components/AddGenericasModal";

const defaultTheme = createTheme();
const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const filterProductos = (productos, searchText) => {
  if (!searchText) return productos;
  return productos.filter(producto =>
    producto.valor.toLowerCase().includes(searchText.toLowerCase()) ||
    producto.valorx.toLowerCase().includes(searchText.toLowerCase()) ||
    producto.valory.toLowerCase().includes(searchText.toLowerCase()) ||
    producto.valorz.toLowerCase().includes(searchText.toLowerCase())
  );
};

export const GenericasList = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [productos, setProductos] = useState([]);
  const [productDetails, setProductDetails] = useState({});
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getGenericas().then((data) => { setProductos(data); });
  }, []);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = (producto) => {
    setProductDetails(producto);
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleOpenAddModal = () => {
    setIsOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setIsOpenAddModal(false);
  };

  const filteredProductos = filterProductos(productos, searchText);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <NavBar open={open} toggleDrawer={toggleDrawer} />
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">{mainListItems}</List>
        </Drawer>
        <TableContainer component={Paper} style={{ marginTop: '70px' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={7}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography>
                      <strong>
                        Lista de productos - Mostrando{" "}
                        {Math.min(page * rowsPerPage + 1, filteredProductos.length)} al{" "}
                        {Math.min((page + 1) * rowsPerPage, filteredProductos.length)}{" "}
                        de un total de {filteredProductos.length} registros
                      </strong>
                    </Typography>
                    <Input
                      placeholder="Buscar..."
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>ID</strong></TableCell>
                <TableCell><strong>Nombre</strong></TableCell>
                <TableCell align="right"><strong>Descripción</strong></TableCell>
                <TableCell align="right"><strong>Precio</strong></TableCell>
                <TableCell align="right"><strong>Cantidad</strong></TableCell>
                <TableCell align="right"><strong>Imagen</strong></TableCell>
                <TableCell align="right"><strong>Acciones</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? filteredProductos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : filteredProductos
              ).map((producto) => (
                <TableRow
                  key={producto.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {producto.id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {producto.valor}
                  </TableCell>
                  <TableCell align="right">{producto.valorx}</TableCell>
                  <TableCell align="right">{producto.valory}</TableCell>
                  <TableCell align="right">{producto.valorz}</TableCell>
                  <TableCell align="right">---</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<EditIcon style={{ marginLeft: '11px' }} />}
                      onClick={() => handleOpenModal(producto)}
                      style={{ borderRadius: '80px', marginRight: '10px' }}
                    >
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={filteredProductos.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
          }}
        >
          <Fab
            color="primary"
            aria-label="add"
            onClick={handleOpenAddModal}
          >
            <AddIcon />
          </Fab>
        </div>
        <AddGenericasModal
          isOpen={isOpenAddModal}
          handleClose={handleCloseAddModal}
          setProductos={setProductos}
        />
        <EditGenericaModal
          isOpen={isOpenModal}
          handleClose={handleCloseModal}
          productDetails={productDetails}
          setProductos={setProductos}
        />
      </Box>
    </ThemeProvider>
  )
}
