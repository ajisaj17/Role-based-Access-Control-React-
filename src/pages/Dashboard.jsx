import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  Form,
  Modal,
} from "react-bootstrap";
import { useUser } from "../contexts/UserContext";

const Dashboard = () => {
  const { userInfo } = useUser();

  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", role: "Admin", status: "Active" },
    { id: 2, name: "Alice Smith", role: "Moderator", status: "Active" },
    { id: 3, name: "Bob Johnson", role: "User", status: "Inactive" },
  ]);

  const [roles, setRoles] = useState([
    { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
    { id: 2, name: "Moderator", permissions: ["Read", "Write"] },
    { id: 3, name: "User", permissions: ["Read"] },
  ]);

  const [showUserModal, setShowUserModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: "", role: "", status: "" });
  const [newRole, setNewRole] = useState({ name: "", permissions: [] });

  const [selectedPermissions, setSelectedPermissions] = useState([]);

  // Handle Adding/Editing Users
  const handleAddUser = () => {
    if (newUser.name && newUser.role && newUser.status) {
      setUsers([...users, { id: users.length + 1, ...newUser }]);
      setNewUser({ name: "", role: "", status: "" });
      setShowUserModal(false);
    } else {
      alert("Please fill in all fields!");
    }
  };

  const handleEditUser = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    setCurrentUser(userToEdit);
    setShowUserModal(true);
  };

  const saveUserChanges = () => {
    if (currentUser.name && currentUser.role && currentUser.status) {
      setUsers(
        users.map((user) =>
          user.id === currentUser.id ? currentUser : user
        )
      );
      setShowUserModal(false);
      setCurrentUser(null);
    } else {
      alert("Please fill in all fields!");
    }
  };

  // Handle Adding/Editing Roles
  const handleAddRole = () => {
    if (newRole.name && selectedPermissions.length) {
      setRoles([
        ...roles,
        { id: roles.length + 1, name: newRole.name, permissions: selectedPermissions },
      ]);
      setNewRole({ name: "", permissions: [] });
      setSelectedPermissions([]);
      setShowRoleModal(false);
    } else {
      alert("Please provide a role name and permissions!");
    }
  };

  // Permission options
  const permissions = ["Read", "Write", "Delete"];

  return (
    <div className="dashboard-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg={10} md={12} sm={12}>
            <h2 className="text-center my-4">Admin Dashboard</h2>

            {/* Welcome Card */}
            <Card className="shadow-sm mb-4">
              <Card.Body>
                <h4>Welcome back, {userInfo?.firstname || "Admin"}!</h4>
                <p>Here’s an overview of the admin panel and system status.</p>
              </Card.Body>
            </Card>

            {/* Management Section */}
            <Row>
              {/* User Management */}
              <Col xl={6} lg={6} md={12} sm={12}>
                <Card className="shadow-sm mb-4">
                  <Card.Body>
                    <h5>User Management</h5>
                    <Button
                      variant="primary"
                      className="mb-3"
                      onClick={() => setShowUserModal(true)}
                    >
                      Add User
                    </Button>
                    <ListGroup variant="flush">
                      {users.map((user) => (
                        <ListGroup.Item
                          key={user.id}
                          className="d-flex justify-content-between align-items-center"
                        >
                          <div>
                            <strong>{user.name}</strong> - {user.role} (
                            {user.status})
                          </div>
                          <div>
                            <Button
                              variant="secondary"
                              size="sm"
                              className="me-2"
                              onClick={() => handleEditUser(user.id)}
                            >
                              Edit
                            </Button>
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>

              {/* Role Management */}
              <Col xl={6} lg={6} md={12} sm={12}>
                <Card className="shadow-sm mb-4">
                  <Card.Body>
                    <h5>Role Management</h5>
                    <Button
                      variant="success"
                      className="mb-3"
                      onClick={() => setShowRoleModal(true)}
                    >
                      Add Role
                    </Button>
                    <ListGroup variant="flush">
                      {roles.map((role) => (
                        <ListGroup.Item
                          key={role.id}
                          className="d-flex justify-content-between align-items-center"
                        >
                          <div>
                            <strong>{role.name}</strong> -{" "}
                            {role.permissions.join(", ")}
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      {/* User Modal */}
      <Modal show={showUserModal} onHide={() => setShowUserModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentUser ? "Edit User" : "Add User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={currentUser ? currentUser.name : newUser.name}
                onChange={(e) =>
                  currentUser
                    ? setCurrentUser({ ...currentUser, name: e.target.value })
                    : setNewUser({ ...newUser, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={currentUser ? currentUser.role : newUser.role}
                onChange={(e) =>
                  currentUser
                    ? setCurrentUser({ ...currentUser, role: e.target.value })
                    : setNewUser({ ...newUser, role: e.target.value })
                }
              >
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.name}>
                    {role.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={currentUser ? currentUser.status : newUser.status}
                onChange={(e) =>
                  currentUser
                    ? setCurrentUser({ ...currentUser, status: e.target.value })
                    : setNewUser({ ...newUser, status: e.target.value })
                }
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUserModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={currentUser ? saveUserChanges : handleAddUser}
          >
            {currentUser ? "Save Changes" : "Add User"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Role Modal */}
      <Modal show={showRoleModal} onHide={() => setShowRoleModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Role Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter role name"
                value={newRole.name}
                onChange={(e) =>
                  setNewRole({ ...newRole, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Permissions</Form.Label>
              {permissions.map((permission) => (
                <Form.Check
                  key={permission}
                  type="checkbox"
                  label={permission}
                  checked={selectedPermissions.includes(permission)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedPermissions([...selectedPermissions, permission]);
                    } else {
                      setSelectedPermissions(
                        selectedPermissions.filter((perm) => perm !== permission)
                      );
                    }
                  }}
                />
              ))}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRoleModal(false)}>
            Close
          </Button>
          <Button variant="success" onClick={handleAddRole}>
            Add Role
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
