"use client";

import { useState, useEffect } from "react";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Chip } from "@heroui/chip";
import { Avatar } from "@heroui/avatar";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Pagination } from "@heroui/pagination";
import {
  Search,
  Filter,
  Trash2,
  Eye,
  UserPlus,
  Crown,
  Shield,
  Ban,
  CheckCircle,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  status: "active" | "suspended" | "inactive";
  subscriptions: number;
  totalSpent: number;
  joinDate: string;
  lastActive: string;
}

export function AdminUserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockUsers: User[] = [
        {
          id: "user_1",
          name: "John Doe",
          email: "john@example.com",
          role: "user",
          status: "active",
          subscriptions: 2,
          totalSpent: 1200000,
          joinDate: "2024-01-15",
          lastActive: "2024-01-20",
        },
        {
          id: "user_2",
          name: "Jane Smith",
          email: "jane@example.com",
          role: "user",
          status: "active",
          subscriptions: 1,
          totalSpent: 800000,
          joinDate: "2024-01-10",
          lastActive: "2024-01-19",
        },
        {
          id: "user_3",
          name: "Admin User",
          email: "admin@seacatering.com",
          role: "admin",
          status: "active",
          subscriptions: 0,
          totalSpent: 0,
          joinDate: "2023-12-01",
          lastActive: "2024-01-20",
        },
        {
          id: "user_4",
          name: "Bob Johnson",
          email: "bob@example.com",
          role: "user",
          status: "suspended",
          subscriptions: 0,
          totalSpent: 300000,
          joinDate: "2023-11-20",
          lastActive: "2024-01-05",
        },
      ];

      setUsers(mockUsers);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus =
      filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getRoleColor = (role: string) => {
    return role === "admin" ? "warning" : "primary";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "suspended":
        return "danger";
      case "inactive":
        return "default";
      default:
        return "default";
    }
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    onOpen();
  };

  const handleUpdateUserStatus = async (userId: string, newStatus: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, status: newStatus as any } : user
        )
      );
    } catch (error) {
      console.error("Failed to update user status:", error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (
      confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    ) {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));
        setUsers((prev) => prev.filter((user) => user.id !== userId));
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        <Button color="primary" startContent={<UserPlus className="w-4 h-4" />}>
          Add New User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="shadow-lg border-0">
          <CardBody className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {users.length}
            </div>
            <div className="text-sm text-gray-600">Total Users</div>
          </CardBody>
        </Card>
        <Card className="shadow-lg border-0">
          <CardBody className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {users.filter((u) => u.role === "admin").length}
            </div>
            <div className="text-sm text-gray-600">Administrators</div>
          </CardBody>
        </Card>

      </div>

      {/* Filters */}
      <Card className="shadow-lg border-0">
        <CardBody className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Search users..."
              startContent={<Search className="w-4 h-4 text-gray-400" />}
              value={searchTerm}
              onValueChange={setSearchTerm}
              className="flex-1"
            />
            <Select
              placeholder="Filter by role"
              startContent={<Filter className="w-4 h-4 text-gray-400" />}
              selectedKeys={filterRole ? [filterRole] : []}
              onSelectionChange={(keys) =>
                setFilterRole((Array.from(keys)[0] as string) || "all")
              }
              className="w-full sm:w-40"
            >
              <SelectItem key="all">All Roles</SelectItem>
              <SelectItem key="user">Users</SelectItem>
              <SelectItem key="admin">Admins</SelectItem>
            </Select>

          </div>
        </CardBody>
      </Card>

      {/* Users Table */}
      <Card className="shadow-lg border-0">
        <CardBody className="p-0">
          {loading ? (
            <div className="p-8 text-center">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading users...</p>
            </div>
          ) : (
            <Table aria-label="Users table">
              <TableHeader>
                <TableColumn>USER</TableColumn>
                <TableColumn>ROLE</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>SUBSCRIPTIONS</TableColumn>
                <TableColumn>TOTAL SPENT</TableColumn>

              </TableHeader>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar
                          size="sm"
                          name={user.name}
                          className="border-2 border-white shadow-sm"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">
                            {user.name}
                          </p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Chip
                        color={getRoleColor(user.role) as any}
                        variant="flat"
                        size="sm"
                        startContent={
                          user.role === "admin" ? (
                            <Crown className="w-3 h-3" />
                          ) : (
                            <Shield className="w-3 h-3" />
                          )
                        }
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      <Chip
                        color={getStatusColor(user.status) as any}
                        variant="flat"
                        size="sm"
                      >
                        {user.status.charAt(0).toUpperCase() +
                          user.status.slice(1)}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{user.subscriptions}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-green-600">
                        {formatPrice(user.totalSpent)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardBody>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            total={totalPages}
            page={currentPage}
            onChange={setCurrentPage}
            showControls
          />
        </div>
      )}

      {/* User Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          <ModalHeader>
            <h3 className="text-xl font-bold">User Details</h3>
          </ModalHeader>
          <ModalBody>
            {selectedUser && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar
                    size="lg"
                    name={selectedUser.name}
                    className="border-4 border-white shadow-lg"
                  />
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">
                      {selectedUser.name}
                    </h4>
                    <p className="text-gray-600">{selectedUser.email}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Chip
                        color={getRoleColor(selectedUser.role) as any}
                        variant="flat"
                        size="sm"
                      >
                        {selectedUser.role}
                      </Chip>
                      <Chip
                        color={getStatusColor(selectedUser.status) as any}
                        variant="flat"
                        size="sm"
                      >
                        {selectedUser.status}
                      </Chip>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">
                      Account Information
                    </h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Join Date:</span>
                        <span>
                          {new Date(selectedUser.joinDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Active:</span>
                        <span>
                          {new Date(
                            selectedUser.lastActive
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">User ID:</span>
                        <span className="font-mono text-xs">
                          {selectedUser.id}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">
                      Subscription Details
                    </h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Active Subscriptions:
                        </span>
                        <span className="font-semibold">
                          {selectedUser.subscriptions}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Spent:</span>
                        <span className="font-semibold text-green-600">
                          {formatPrice(selectedUser.totalSpent)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="bordered" onPress={onClose}>
              Close
            </Button>
            <Button color="primary">Edit User</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
