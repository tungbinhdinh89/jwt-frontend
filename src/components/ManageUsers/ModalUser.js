import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import _ from "lodash";

import {
  createNewUser,
  fetchGroupList,
  updateUser,
} from "../../services/userService";

function ModalUser({ handleClose, action, user, show }) {
  const defaultUserInfo = {
    email: "",
    phone: "",
    username: "",
    password: "",
    address: "",
    sex: "male",
    group_id: "",
  };

  const validInputsDefault = {
    email: true,
    phone: true,
    password: true,
    group_id: true,
  };

  const [groupList, setGroupList] = useState([]);

  const [userInfo, setUserInfo] = useState({});

  const [validInput, setValidInput] = useState(validInputsDefault);

  const getGroups = async () => {
    let res = await fetchGroupList();
    setGroupList(res.data);

    // if (res && res.data && res.data.errorCode === 0) {
    //   setGroupList(res.data.data);
    //   if (res.data.data && res.data.data.length > 0) {
    //     let group = res.data.data;
    //     setUserInfo({ ...userInfo, group_id: group[0].id });
    //   }
    // } else {
    //   toast.error(res.data.errorMessage);
    // }
  };

  const handleChangeInput = (value, name) => {
    let _userInfo = _.cloneDeep(userInfo);
    _userInfo[name] = value;
    setUserInfo(_userInfo);
  };

  const checkValidInputs = () => {
    // create user
    if (action === "UPDATE") return true;
    let check = true;
    let arr = ["email", "phone", "password", "group_id"];

    for (let i = 0; i < arr.length; i++) {
      if (!userInfo[arr[i]]) {
        let _validInput = _.cloneDeep(validInputsDefault);
        _validInput[arr[i]] = false;
        setValidInput(_validInput);
        toast.error(`${arr[i]} require input`);
        check = false;
        break;
      }
    }
    return check;
  };

  const handleConfirmUser = async () => {
    // create new user

    let check = checkValidInputs();
    if (check) {
      let res =
        action === "UPDATE"
          ? await updateUser(userInfo)
          : await createNewUser(userInfo);
      if (res && res.errorCode === 0) {
        handleClose();
        // window.location.reload();
        toast.success(res.errorMessage);
      }
      if (res && res.errorCode !== 0) {
        let _validInput = _.cloneDeep(validInputsDefault);
        _validInput[res.data] = false;
        setValidInput(_validInput);
        toast.error(res.errorMessage);
      }
    }
  };

  useEffect(() => {
    getGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    action === "UPDATE" ? setUserInfo(user) : setUserInfo(defaultUserInfo);
    // if (action === "UPDATE") {
    //   setUserInfo(user);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div>
      <Modal
        show={show}
        className="modal-user"
        onHide={handleClose}
        centered
        size="large"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {action === "CREATE" ? "Create new user" : "Update user"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="content-body row">
            <div className="col-12 col-sm-6 form-group">
              <label htmlFor="">
                Email (<span className="text-danger">*</span>):{" "}
              </label>
              <input
                type="email"
                disabled={action === "UPDATE" ? true : false}
                value={userInfo.email}
                className={
                  validInput.email ? "form-control" : "form-control is-invalid"
                }
                onChange={(event) =>
                  handleChangeInput(event.target.value, "email")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label htmlFor="">
                Phone number (<span className="text-danger">*</span>):{" "}
              </label>
              <input
                type="text"
                disabled={action === "UPDATE" ? true : false}
                value={userInfo.phone}
                className={
                  validInput.phone ? "form-control" : "form-control is-invalid"
                }
                onChange={(event) =>
                  handleChangeInput(event.target.value, "phone")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label htmlFor="">Username :</label>
              <input
                type="text"
                value={userInfo.username}
                onChange={(event) =>
                  handleChangeInput(event.target.value, "username")
                }
                className="form-control"
              />
            </div>
            {action !== "UPDATE" && (
              <div className="col-12 col-sm-6 form-group">
                <label htmlFor="">Password :</label>
                <input
                  type="password"
                  className={
                    validInput.password
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  onChange={(event) =>
                    handleChangeInput(event.target.value, "password")
                  }
                />
              </div>
            )}
            <div className="col-12  form-group">
              <label htmlFor="">Address :</label>
              <input
                type="text"
                value={userInfo.address}
                className="form-control"
                onChange={(event) =>
                  handleChangeInput(event.target.value, "address")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label htmlFor="">Gender :</label>
              <select
                value={userInfo.sex}
                className="form-control"
                onChange={(event) =>
                  handleChangeInput(event.target.value, "sex")
                }
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Option</option>
              </select>
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label htmlFor="">
                Group (<span className="text-danger">*</span>):
              </label>
              <select
                value={userInfo.group_id}
                className={
                  validInput.group_id
                    ? "form-control"
                    : "form-control is-invalid"
                }
                onChange={(event) =>
                  handleChangeInput(event.target.value, "group_id")
                }
              >
                {groupList.length > 0 &&
                  groupList.map((group, index) => (
                    <option key={`group-${index}`} value={group.id}>
                      {group.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleConfirmUser}>
            {action === "UPDATE" ? "Update" : "Add new"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalUser;
