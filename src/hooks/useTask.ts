'use client'

import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { fetchTask } from "@/data/tasks";
import { taskProps } from "@/@types/Task";

const useTask = () => {
  const [task, setTask] = useState<taskProps[]>([]);
  const { data, isLoading, isError,refetch } = useQuery({
    queryKey: ["Task"],
    queryFn: () => fetchTask(),
  });
  useEffect(() => {
    setTask(data ?? []);
  }, [data]);

  return { task, isLoading, isError ,refetch };
};

export default useTask;
