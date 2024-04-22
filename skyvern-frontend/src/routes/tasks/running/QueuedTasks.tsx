import { client } from "@/api/AxiosClient";
import { Status, TaskApiResponse } from "@/api/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { basicTimeFormat } from "@/util/timeFormat";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { StatusBadge } from "@/components/StatusBadge";

function QueuedTasks() {
  const navigate = useNavigate();
  const { data: tasks } = useQuery<Array<TaskApiResponse>>({
    queryKey: ["tasks"],
    queryFn: async () => {
      return client.get("/tasks").then((response) => response.data);
    },
    refetchInterval: 3000,
    placeholderData: keepPreviousData,
  });

  const queuedTasks = tasks
    ?.filter((task) => task.status === Status.Queued)
    .slice(0, 10);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/3">URL</TableHead>
          <TableHead className="w-1/3">Status</TableHead>
          <TableHead className="w-1/3">Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {queuedTasks?.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3}>No queued tasks</TableCell>
          </TableRow>
        ) : (
          queuedTasks?.map((task) => {
            return (
              <TableRow
                key={task.task_id}
                className="cursor-pointer w-4"
                onClick={() => {
                  navigate(task.task_id);
                }}
              >
                <TableCell className="w-1/3">{task.request.url}</TableCell>
                <TableCell className="w-1/3">
                  <StatusBadge status={task.status} />
                </TableCell>
                <TableCell className="w-1/3">
                  {basicTimeFormat(task.created_at)}
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}

export { QueuedTasks };