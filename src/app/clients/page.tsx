"use client";

import DefaultLayout from "@/components/default-layout";
import ProtectedRoute from "@/components/user-auth/protected-route";
// import React, { useState } from "react";
import { ClientTable } from "@/components/client/client-page";
// import { Button } from "@/components/ui/button";
// import AddClientModal from "@/components/client/client-add";
// import useClientsStore from "@/store/clients-store/get-clients-store"; // Import the store

const Clients = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const { fetchClients } = useClientsStore();

  return (
    <>
      <ProtectedRoute>
        <DefaultLayout>
          <div>
            <div className="flex justify-between items-center mb-4 p-4">
              <h1 className="text-2xl font-bold mb-0 dark:text-white pl-6 pt-4 w-full">
                Clients
              </h1>
              {/* <Button onClick={() => setIsModalOpen(true)}>Add Client</Button> */}
            </div>
            <ClientTable />
          </div>
        </DefaultLayout>
      </ProtectedRoute>
      {/* <AddClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddSuccess={() => fetchClients()} // Pass fetchClients to trigger re-fetch
      /> */}
    </>
  );
};

export default Clients;
