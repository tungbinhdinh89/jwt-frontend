import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import "./Users.scss";
import { fetchAllUser } from "../../services/userService";

function Users() {
  const [userList, setUserList] = useState([]);
  console.log("userList: ", userList);
  const [currentPage, setCurrentPage] = useState(1);
  console.log("currentPage: ", currentPage);
  const [currentLimit, setcurrentLimit] = useState(2);
  const [totalPage, setTotalPage] = useState(2);

  const fetchUsers = async () => {
    let res = await fetchAllUser(currentPage, currentLimit);
    console.log("res: ", res);
    let data = res.data.data;
    if (res && res.data && +res.data.errorCode === 0) {
      setUserList(data.users);
      setTotalPage(data.totalPage);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const handlePageClick = (e) => {
    setCurrentPage(+e.selected + 1);
  };

  return (
    <div className="manage-users-container container">
      <div className="users-header">
        <div className="title">
          <h3>Table user</h3>
        </div>
        <div className="actions">
          <button className="btn btn-success">Refresh </button>
          <button className="btn btn-primary">Add new user</button>
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
                    <th scope="row">{index + 1}</th>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>{user.username}</td>
                    <td>{user.phone}</td>
                    <td>{user.address}</td>
                    <td>{user.Group ? user.Group.name : ""}</td>
                    <td className="d-flex gap-2">
                      <button className="btn btn-warning">Edit</button>
                      <button className="btn btn-danger">Delete</button>
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
  );
}

export default Users;
