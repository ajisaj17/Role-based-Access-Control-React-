import React, { useState } from "react";
import { Container, Row, Col, Card, Button, ListGroup, Badge, Table, Form, Modal } from "react-bootstrap";

const UserInfo = () => {
  const [user, setUser] = useState({
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    phone: "123-456-7890",
    status: "Active",
    address: "123 Main St, Springfield, IL",
    createdAt: "2021-08-15",
  });

  const [roles, setRoles] = useState(["Admin", "Moderator", "User"]); // Available roles
  const [permissions, setPermissions] = useState({
    Admin: ["Read", "Write", "Delete"],
    Moderator: ["Read", "Write"],
    User: ["Read"],
  });

  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [editedUser, setEditedUser] = useState(null); // Temporary storage for user edits

  // Handle saving user changes
  const saveChanges = () => {
    setUser({ ...editedUser });
    setShowModal(false);
  };

  return (
    <div className="user-info-section py-5">
      <Container>
        <Row className="justify-content-center">
          <Col xl={8} lg={10} md={12} sm={12}>
            <h2 className="text-center my-4">User Information</h2>

            {/* User Profile Card */}
            <Card className="shadow-sm mb-4">
              <Card.Body className="text-center">
                <Card.Title>{user.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{user.role}</Card.Subtitle>
                <Card.Text>{user.email}</Card.Text>

                {/* User Status Badge */}
                <Badge pill bg={user.status === "Active" ? "success" : "danger"} className="mb-3">
                  {user.status}
                </Badge>

                {/* Button to Edit User Info */}
                <Button
                  variant="primary"
                  onClick={() => {
                    setEditedUser(user);
                    setShowModal(true);
                  }}
                >
                  Edit Info
                </Button>
              </Card.Body>
            </Card>

            {/* User Details Table */}
            <Card className="shadow-sm">
              <Card.Header>
                <h4>User Details</h4>
              </Card.Header>
              <Card.Body>
                <Table bordered responsive>
                  <tbody>
                    <tr>
                      <th>Name:</th>
                      <td>{user.name}</td>
                    </tr>
                    <tr>
                      <th>Email:</th>
                      <td>{user.email}</td>
                    </tr>
                    <tr>
                      <th>Phone:</th>
                      <td>{user.phone}</td>
                    </tr>
                    <tr>
                      <th>Address:</th>
                      <td>{user.address}</td>
                    </tr>
                    <tr>
                      <th>Status:</th>
                      <td>{user.status}</td>
                    </tr>
                    <tr>
                      <th>Account Created:</th>
                      <td>{user.createdAt}</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>

            {/* Role Permissions Table */}
            <Card className="shadow-sm mt-4">
              <Card.Header>
                <h4>Role Permissions</h4>
              </Card.Header>
              <Card.Body>
                <Table bordered responsive>
                  <thead>
                    <tr>
                      <th>Role</th>
                      <th>Permissions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(permissions).map(([role, perms]) => (
                      <tr key={role}>
                        <td>{role}</td>
                        <td>{perms.join(", ")}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>

            {/* User Activity / Action History */}
            <Card className="shadow-sm mt-4">
              <Card.Header>
                <h4>User Activity</h4>
              </Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Login:</strong> Last login at 2024-11-22 09:30 AM
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Password Update:</strong> 2024-11-20
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Role Change:</strong> Promoted to Admin on 2024-11-18
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Edit User Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={editedUser?.name || ""}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={editedUser?.email || ""}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={editedUser?.role || ""}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, role: e.target.value })
                }
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={editedUser?.status || ""}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, status: e.target.value })
                }
              >
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
          <Button variant="primary" onClick={saveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserInfo;
