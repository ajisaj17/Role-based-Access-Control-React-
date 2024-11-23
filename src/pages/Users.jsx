import React, { useState } from "react";
import { Container, Row, Col, Card, Button, ListGroup, Badge, Modal, Form } from "react-bootstrap";

const Users = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Alice Smith", email: "alice.smith@example.com", role: "Moderator", status: "Inactive" },
    { id: 3, name: "Bob Johnson", email: "bob.johnson@example.com", role: "User", status: "Active" },
    { id: 4, name: "Mary Brown", email: "mary.brown@example.com", role: "User", status: "Active" },
  ]);

  const [roles, setRoles] = useState(["Admin", "Moderator", "User"]); // List of roles
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // Current user being edited
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "", status: "" });

  // Add a new user
  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.role && newUser.status) {
      setUsers([...users, { id: users.length + 1, ...newUser }]);
      setNewUser({ name: "", email: "", role: "", status: "" });
      setShowModal(false);
    } else {
      alert("Please fill in all fields!");
    }
  };

  // Edit an existing user
  const handleEditUser = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    setCurrentUser(userToEdit);
    setShowModal(true);
  };

  const saveUserChanges = () => {
    if (currentUser.name && currentUser.email && currentUser.role && currentUser.status) {
      setUsers(
        users.map((user) =>
          user.id === currentUser.id ? currentUser : user
        )
      );
      setShowModal(false);
      setCurrentUser(null);
    } else {
      alert("Please fill in all fields!");
    }
  };

  // Delete a user
  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="users-section py-5">
      <Container>
        <Row className="justify-content-center">
          <Col xl={10} lg={12} md={12} sm={12}>
            <h2 className="text-center my-4">User Management</h2>

            <Button variant="primary" className="mb-3" onClick={() => setShowModal(true)}>
              Add User
            </Button>

            {/* Users List */}
            <Row>
              {users.map((user) => (
                <Col xl={3} lg={4} md={6} sm={12} key={user.id} className="mb-4">
                  <Card className="shadow-sm">
                    <Card.Body>
                      <Card.Title>{user.name}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">{user.email}</Card.Subtitle>
                      <Card.Text>Role: {user.role}</Card.Text>

                      {/* User Status */}
                      <Badge pill bg={user.status === "Active" ? "success" : "danger"} className="mb-2">
                        {user.status}
                      </Badge>

                      {/* Action Buttons */}
                      <div className="d-flex justify-content-between">
                        <Button variant="info" size="sm" onClick={() => alert(`Viewing ${user.name}`)}>
                          View
                        </Button>
                        <Button variant="warning" size="sm" onClick={() => handleEditUser(user.id)}>
                          Edit
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => handleDeleteUser(user.id)}>
                          Delete
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>

      {/* Add/Edit User Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
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
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={currentUser ? currentUser.email : newUser.email}
                onChange={(e) =>
                  currentUser
                    ? setCurrentUser({ ...currentUser, email: e.target.value })
                    : setNewUser({ ...newUser, email: e.target.value })
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
                {roles.map((role, index) => (
                  <option key={index} value={role}>
                    {role}
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
          <Button variant="secondary" onClick={() => setShowModal(false)}>
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
    </div>
  );
};

export default Users;
