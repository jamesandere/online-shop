import styled from 'styled-components';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { usersDelete, usersFetch } from '../../redux/usersSlice';

export default function UsersList() {
  const { users } = useSelector(state => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
        usersFetch()
    )
  }, [dispatch]);

  const rows = users && users.map((user) => {
    return {
      id: user._id,
      uName: user.name,
      uEmail: user._email,
      isAdmin: user.isAdmin
    }
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'uName', headerName: 'Name', width: 150,
   },
    { field: 'uEmail', headerName: 'Email', width: 200 },
    {
      field: 'isAdmin',
      headerName: 'Role',
      width: 100,
      renderCell: (params) => {
        return (
          <div>
            {
                params.row.isAdmin ? (
                <Admin>Admin</Admin>
                ) 
                :(
                <Customer>Customer</Customer>
                )
            }
          </div>
        )
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 120,
      renderCell: (params) => {
        return (
          <Actions>
            <Delete onClick={()=> handleDelete(params.row.id)}>Delete</Delete>
            <View onClick={()=> navigate(`/user/${params.row.id}`)}>View</View>
          </Actions>
        )
      }
    },
  ];

  const handleDelete = (id) => {
    dispatch(
      usersDelete(id)
    );
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}

const Actions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  button {
    border: none;
    outline: none;
    padding: 3px 5px;
    color: white;
    border-radius: 3px;
    cursor: pointer;
  }
`;

const Delete = styled.button`
  background: rgb(255, 77, 73);
`;

const View = styled.button`
  background: rgb(114, 255, 40);
`;

const Admin = styled.div`
    color: rgb(253, 181, 40);
    background-color: rgb(253, 181, 40, 0.12);
    padding: 3px 5px;
    border-radius: 3px;
    font-size: 14px;
`;

const Customer = styled.div`
    color: rgb(38, 198, 249);
    background-color: rgb(38, 198, 249, 0.12);
    padding: 3px 5px;
    border-radius: 3px;
    font-size: 14px;
`;