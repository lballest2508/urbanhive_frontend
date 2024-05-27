import { Avatar, Box, Button, CssBaseline, Divider, Fab, IconButton, Input, List, ListItemAvatar, ListItemText, Paper, SvgIcon, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, ThemeProvider, Toolbar, Typography, createTheme, styled } from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { NavBar } from "../../../auth/hooks/NavBar";
import { mainListItems } from "../../../auth/hooks/mainListItems";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MuiDrawer from "@mui/material/Drawer";
import EditIcon from '@mui/icons-material/Edit';
import { getUsers } from "../utils/utils";
import { ChangePasswordModal } from "../components/ChangePasswordModal";
import { AddUserModal } from "../components/AddUserModal";
import { EditUserModal } from "../components/EditUserModal";
import LockResetIcon from '@mui/icons-material/LockReset';

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

export const UserList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [filteredUser, setFilteredUser] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    getUsers().then((data) => { setFilteredUser(data) });
  }, [])


  const handleChangeRowsPerPage = (event) => {
    // Establecer un límite máximo de filas por página (por ejemplo, 10)
    const newRowsPerPage = parseInt(event.target.value, 10);
    if (newRowsPerPage <= 10) {
      setRowsPerPage(newRowsPerPage);
      setPage(0);
    }
  };

  const [open, setOpen] = useState(false);

  const handleOpenModal = (user) => {
    setUserDetails(user);
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

  const handleOpenEditModal = (user) => {
    setUserDetails(user);
    setIsOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setIsOpenEditModal(false);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };
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
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableBody>
              <TableRow>
                <TableCell colSpan={3}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography>
                      <strong>
                        Lista de usuarios - Mostrando{" "}
                        {Math.min(page * rowsPerPage + 1, filteredUser.length)} al{" "}
                        {Math.min((page + 1) * rowsPerPage, filteredUser.length)}{" "}
                        de un total de {filteredUser.length} registros
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
              {filteredUser.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                <TableRow key={user.id}>
                  <TableCell component="th" style={{ display: 'flex' }}>
                    <ListItemAvatar style={{ marginTop: '10px' }}>
                      <Avatar>
                        <SvgIcon>
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </SvgIcon>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText>
                      <Typography variant="body2" color="text.secondary" display="block" component="div">
                        <span style={{ color: 'black' }}>
                          {user.name}
                        </span>
                        <Typography variant="body2" color="text.secondary">
                          {user.id}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {user.username}
                        </Typography>
                      </Typography>
                    </ListItemText>
                  </TableCell>
                  <TableCell style={{ width: "auto" }} align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<EditIcon style={{ marginLeft: '11px' }} />}
                      onClick={() => handleOpenEditModal(user)}
                      style={{ borderRadius: '80px', marginRight: '10px' }}
                    >
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<LockResetIcon style={{ marginLeft: '11px' }} />}
                      onClick={() => handleOpenModal(user)}
                      style={{ borderRadius: '80px' }}
                    >
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10]} // Opciones de filas por página
            component="div"
            count={filteredUser.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
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
        <ChangePasswordModal
          isOpen={isOpenModal}
          handleClose={handleCloseModal}
          userDetails={userDetails}
          setUserDetails={setUserDetails}
        />
        <AddUserModal
          isOpen={isOpenAddModal}
          handleClose={handleCloseAddModal}
          setFilteredUser={setFilteredUser}
        />
        <EditUserModal
          isOpen={isOpenEditModal}
          handleClose={handleCloseEditModal}
          userDetails={userDetails}
          setFilteredUser={setFilteredUser}
        />
      </Box>
    </ThemeProvider>
  );
};
