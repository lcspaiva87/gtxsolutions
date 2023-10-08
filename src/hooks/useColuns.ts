'use client'
import { Column } from "@/@types/Column";

import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { fetchColumns } from "@/data/columns";


const useColumns = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const { data, isLoading, isError,refetch } = useQuery({
    queryKey: ["Columns"],
    queryFn: () => fetchColumns(),
  });
  useEffect(() => {
    setColumns(data ?? []);
  }, [data]);

  return { columns, isLoading, isError ,refetch };
};

export default useColumns;
