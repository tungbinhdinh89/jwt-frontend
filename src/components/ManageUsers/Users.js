import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import "./Users.scss";
import { deleteUser, fetchAllUser } from "../../services/userService";
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";

function Users() {
  const [userList, setUserList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setcurrentLimit] = useState(2);
  const [totalPage, setTotalPage] = useState(5);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [actionModalUser, setActionModalUser] = useState("CREATE");

  const [dataModalUser, setDataModalUser] = useState({});

  const fetchUsers = async () => {
    let res = await fetchAllUser(currentPage, currentLimit);
    let data = res.data.data;
    if (res && res.data && +res.data.errorCode === 0) {
      setUserList(data.users);
      setcurrentLimit(5);
      setTotalPage(data.totalPage);
    }
  };

  useEffect(() => {
    fetchUsers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, currentLimit]);

  const handlePageClick = (e) => {
    setCurrentPage(+e.selected + 1);
  };

  const handleDeleteUser = (user) => {
    setDataModal(user);
    setIsShowModalDelete(true);
  };

  const handleUpdateUser = (user) => {
    setDataModalUser(user);
    setActionModalUser("UPDATE");
    setIsShowModal(true);
  };

  const handleCreateNewUser = () => {
    setIsShowModal(true);
    setActionModalUser("CREATE");
  };

  const handleClose = () => {
    setDataModal({});
    setIsShowModalDelete(false);
    setIsShowModal(false);
  };

  const confirmDeleteUser = async () => {
    let res = await deleteUser(dataModal);
    if (res.data && +res.data.errorCode === 0) {
      await fetchUsers();
      toast.success(res.data.errorMessage);
      setIsShowModalDelete(false);
    } else {
      toast.error(res.data.errorMessage);
    }
  };

  const handleRefresh = async () => {
    console.log("tung");
    await fetchUsers();
  };

  return (
    <>
      <div className="manage-users-container container">
        <div className="users-header">
          <div className="title">
            <h3>Manage user</h3>
          </div>
          <div className="actions d-flex gap-2 my-3">
            <button
              className="btn btn-success mr
            -2"
              onClick={() => handleRefresh()}
            >
              <i className="fa fa-refresh mx-2"></i>
              Refresh{" "}
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleCreateNewUser()}
            >
              <i className="fa fa-plus-circle mx-2"></i>
              Add new user
            </button>
          </div>
        </div>
        <div className="users-body">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">ID</th>
                <th scope="col">Email</th>
                <th scope="col">Username</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Address</th>
                <th scope="col">Role</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {userList && userList.length > 0 ? (
                <>
                  {userList.map((user, index) => (
                    <tr key={user.id}>
                      <th scope="row">
                        {(currentPage - 1) * currentLimit + index + 1}
                      </th>
                      <td>{user.id}</td>
                      <td>{user.email}</td>
                      <td>{user.username}</td>
                      <td>{user.phone}</td>
                      <td>{user.address}</td>
                      <td>{user.Group ? user.Group.name : ""}</td>
                      <td className="d-flex gap-2">
                        <button
                          className="btn btn-warning"
                          onClick={() => {
                            handleUpdateUser(user);
                          }}
                        >
                          <i className="fa fa-pencil-square-o"></i>
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            handleDeleteUser(user);
                          }}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <>
                  <tr>
                    <td>Not Found User</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
        <div className="users-footer">
          {totalPage > 0 && (
            <ReactPaginate
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={totalPage}
              previousLabel="< previous"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />
          )}
        </div>
      </div>

      {isShowModalDelete && (
        <ModalDelete
          handleClose={handleClose}
          confirmDeleteUser={confirmDeleteUser}
          show={isShowModalDelete}
          user={dataModal}
        />
      )}
      {isShowModal && (
        <ModalUser
          handleClose={handleClose}
          user={{
            ...dataModalUser,
            group_id: dataModalUser.Group ? dataModalUser.Group.id : "",
          }}
          show={isShowModal}
          action={actionModalUser}
        />
      )}
    </>
  );
}

export default Users;
