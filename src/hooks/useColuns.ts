'use client'
import { Column } from "@/@types/Column";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import { DeleteColumns, fetchColumns, } from "@/data/columns";
import { enqueueSnackbar } from "notistack";


export const useColumns = (id?:Column[]) => {
  const queryClient = useQueryClient();
  const removeMutation = useMutation(DeleteColumns, {
    onError: () => {
      enqueueSnackbar("Erro ao remover coluna, tente novamente", {
        variant: "error",
      });
    },

    onSuccess: (_, id) => {
      queryClient.setQueryData(["column", undefined], (oldData: any) =>
        oldData.filter((item:Column ) => item.id !== id)
      );
      enqueueSnackbar("Coluna removida com sucesso", { variant: "success" });
    },
  });

  const {
    data: column,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["column", id],
    queryFn: () => fetchColumns(),
  });
  return {
    columns: column ?? [],
    isLoading,
    isError,
    removeMutation,

  };
};

