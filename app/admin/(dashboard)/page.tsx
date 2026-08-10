import { getAssignments } from "../actions";
import AdminDashboardClient from "./AdminDashboardClient";

export default async function AdminDashboardPage() {
  const initial = await getAssignments({ page: 1 });
  return (
    <AdminDashboardClient
      initialAssignments={initial.assignments}
      initialTotalGroups={initial.totalGroups}
      pageSize={initial.pageSize}
    />
  );
}
