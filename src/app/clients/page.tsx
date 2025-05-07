"use client";

import DefaultLayout from "@/components/default-layout";
import { Skeleton } from "@/components/ui/skeleton";
import ProtectedRoute from "@/components/user-auth/protected-route";
import useClientsStore from "@/store/clients-store/get-clients-store";
import React from "react";
import { ClientTable } from "@/components/client/client-page";

const Clients = () => {
  const { clients, fetchClients, isLoading } = useClientsStore();
  React.useEffect(() => {
    if (!clients || clients.length === 0) {
      fetchClients();
    }
  }, [clients, fetchClients]);
  console.log(clients);
  return (
    <>
      <ProtectedRoute>
        <DefaultLayout>
          {isLoading ? (
            <Skeleton />
          ) : (
            <div>
              <h1 className="text-2xl font-bold mb-0 dark:text-white pl-6 pt-4 w-full ">
                Clients
              </h1>
              <ClientTable />
            </div>
          )}
        </DefaultLayout>
      </ProtectedRoute>
    </>
  );
};

export default Clients;
