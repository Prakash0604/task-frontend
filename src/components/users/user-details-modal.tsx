import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";

const bucketUrl: string = process.env.NEXT_PUBLIC_API_URL || "";
import { formatDateToReadable } from "@/utlis";

interface User {
  profile?: string;
  name: string;
  email: string;
  contact: string;
  address: string;
  created_at: string;
  status: string;
}

interface UserDetailsModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  user,
  isOpen,
  onClose,
}) => {
  if (!user) return null;

  const fullProfileUrl = user.profile?.startsWith("http")
    ? user.profile
    : `${bucketUrl}/${user.profile}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white dark:bg-gray-900 rounded-xl border border-gray-300 dark:border-gray-700 shadow-2xl p-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <DialogHeader className="bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-700 dark:to-purple-800 p-6 text-white">
            <DialogTitle className="text-2xl font-bold">
              User Details
            </DialogTitle>
          </DialogHeader>
          <div className="p-6 space-y-6">
            <div className="flex justify-center">
              {user.profile ? (
                <Image
                  height={100}
                  width={100}
                  src={fullProfileUrl}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-md"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center border-4 border-white dark:border-gray-800 shadow-md">
                  <span className="text-gray-500 dark:text-gray-400 text-lg font-medium">
                    N/A
                  </span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-700 dark:text-gray-300 w-28">
                  Name:
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {user.name}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-700 dark:text-gray-300 w-28">
                  Email:
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {user.email}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-700 dark:text-gray-300 w-28">
                  Contact:
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {user.contact}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-700 dark:text-gray-300 w-28">
                  Address:
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {user.address}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-700 dark:text-gray-300 w-28">
                  Registered:
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {formatDateToReadable(user.created_at)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-700 dark:text-gray-300 w-28">
                  Status:
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {user.status}
                </span>
              </div>
            </div>
          </div>
          <DialogFooter className="p-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Close
            </Button>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsModal;
