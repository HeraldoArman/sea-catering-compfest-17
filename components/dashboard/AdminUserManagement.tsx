"use client"

import { useState, useEffect } from "react"
import { Card, CardBody } from "@heroui/card"
import { Button } from "@heroui/button"
import { Input } from "@heroui/input"
import { Select, SelectItem } from "@heroui/select"
import { Chip } from "@heroui/chip"
import { Avatar } from "@heroui/avatar"
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table"
import { Pagination } from "@heroui/pagination"
import { Search, Filter, UserPlus, Crown, Shield } from "lucide-react"
interface User {
  name: string
  email: string
  role: "user" | "admin"
  subscriptions: number
  totalSpent: number
}

export function AdminUserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/dashboard/admin/users");
      if (!res.ok) throw new Error("Failed to fetch");
  
      const data: User[] = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "all" || user.role === filterRole
    return matchesSearch && matchesRole
  })

  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getRoleColor = (role: string) => {
    return role === "admin" ? "warning" : "primary"
  }


  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        <Button color="primary" startContent={<UserPlus className="w-4 h-4" />}>
          Add New User
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="shadow-lg border-0">
          <CardBody className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{users.length}</div>
            <div className="text-sm text-gray-600">Total</div>
          </CardBody>
        </Card>
        <Card className="shadow-lg border-0">
          <CardBody className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{users.filter((u) => u.role === "admin").length}</div>
            <div className="text-sm text-gray-600">Administrators</div>
          </CardBody>
        </Card>
      </div>

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
              onSelectionChange={(keys) => setFilterRole((Array.from(keys)[0] as string) || "all")}
              className="w-full sm:w-40"
            >
              <SelectItem key="all">All Roles</SelectItem>
              <SelectItem key="user">Users</SelectItem>
              <SelectItem key="admin">Admins</SelectItem>
            </Select>
          </div>
        </CardBody>
      </Card>

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
                <TableColumn>SUBSCRIPTIONS</TableColumn>
                <TableColumn>TOTAL SPENT</TableColumn>
              </TableHeader>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar size="sm" name={user.name} className="border-2 border-white shadow-sm" />
                        <div>
                          <p className="font-semibold text-gray-900">{user.name}</p>
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
                          user.role === "admin" ? <Crown className="w-3 h-3" /> : <Shield className="w-3 h-3" />
                        }
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{user.subscriptions}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-green-600">{formatPrice(user.totalSpent)}</span>
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
          <Pagination total={totalPages} page={currentPage} onChange={setCurrentPage} showControls />
        </div>
      )}
    </div>
  )
}
