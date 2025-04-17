"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Bell, X, DollarSign, AlertCircle, Info, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getNotificationsForUser, getUnreadNotificationsCount } from "@/lib/agents"
import type { Notification } from "@/lib/types"

export function NotificationsMenu() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // Get user info
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        const userId = userData.id || "user1" // Default to user1 if no ID

        // Get notifications
        const userNotifications = getNotificationsForUser(userId)
        setNotifications(userNotifications)

        // Get unread count
        const unreadNotificationsCount = getUnreadNotificationsCount(userId)
        setUnreadCount(unreadNotificationsCount)
      } catch (e) {
        console.error("Failed to parse user data", e)
      }
    }
  }, [])

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === notificationId ? { ...notification, read: true } : notification)),
    )
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
    setUnreadCount(0)
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "quote":
        return <DollarSign className="h-4 w-4 text-primary" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-amber-500" />
      case "error":
        return <X className="h-4 w-4 text-red-500" />
      default:
        return <Info className="h-4 w-4 text-blue-500" />
    }
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
          {unreadCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary p-0 text-xs text-white"
              variant="default"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="h-auto p-0 text-xs" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length > 0 ? (
          <>
            <ScrollArea className="h-[300px]">
              <DropdownMenuGroup>
                {notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className={`flex flex-col items-start p-3 ${!notification.read ? "bg-muted/50" : ""}`}
                    onSelect={(e) => {
                      e.preventDefault()
                      markAsRead(notification.id)
                    }}
                  >
                    <div className="flex w-full items-start gap-2">
                      <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{notification.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(notification.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">{notification.message}</p>
                        {notification.actionUrl && (
                          <Link
                            href={notification.actionUrl}
                            className="mt-1 text-xs font-medium text-primary hover:underline"
                            onClick={() => {
                              markAsRead(notification.id)
                              setOpen(false)
                            }}
                          >
                            View Details
                          </Link>
                        )}
                      </div>
                      {!notification.read && (
                        <div className="ml-auto flex h-2 w-2 flex-shrink-0 rounded-full bg-primary"></div>
                      )}
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </ScrollArea>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="justify-center text-center">
              <Link href="/dashboard/notifications" className="w-full text-xs font-medium text-primary">
                View All Notifications
              </Link>
            </DropdownMenuItem>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <Bell className="mb-2 h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No notifications yet</p>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
