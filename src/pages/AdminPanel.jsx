import React, { useState } from "react";
import { Container, Row, Col, Card, Button, ListGroup, Form, Modal } from "react-bootstrap";

const AdminPanel = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", role: "Admin", status: "Active" },
    { id: 2, name: "Alice Smith", role: "Moderator", status: "Active" },
    { id: 3, name: "Bob Johnson", role: "User", status: "Inactive" },
  ]);

  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [currentUser, setCurrentUser] = useState(null); // Current user being edited
  const [newUser, setNewUser] = useState({ name: "", role: "", status: "" }); // New user form

  // Handle adding a new user
  const handleAddUser = () => {
    if (newUser.name && newUser.role && newUser.status) {
      setUsers([...users, { id: users.length + 1, ...newUser }]);
      setNewUser({ name: "", role: "", status: "" });
      setShowModal(false);
    } else {
      alert("Please fill in all fields!");
    }
  };

  // Handle editing a user
  const handleEditUser = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    setCurrentUser(userToEdit);
    setShowModal(true);
  };

  const saveUserChanges = () => {
    if (currentUser.name && currentUser.role && currentUser.status) {
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

  // Handle deleting a user
  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="admin-panel-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg={10} md={12} sm={12}>
            {/* Admin Panel Header */}
            <h2 className="text-center my-4">Admin Panel</h2>

            {/* User Management Section */}
            <Card className="shadow-sm mt-5">
              <Card.Header>
                <h4 className="m-0">User Management</h4>
              </Card.Header>
              <Card.Body>
                <Button
                  variant="primary"
                  className="mb-3"
                  onClick={() => setShowModal(true)}
                >
                  Add User
                </Button>
                <ListGroup variant="flush">
                  {users.map((user) => (
                    <ListGroup.Item key={user.id} className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{user.name}</strong> - {user.role} ({user.status})
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
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
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
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter role"
                value={currentUser ? currentUser.role : newUser.role}
                onChange={(e) =>
                  currentUser
                    ? setCurrentUser({ ...currentUser, role: e.target.value })
                    : setNewUser({ ...newUser, role: e.target.value })
                }
              />
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

export default AdminPanel;
