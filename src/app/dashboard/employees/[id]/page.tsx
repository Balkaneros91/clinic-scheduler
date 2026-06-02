import { notFound } from "next/navigation";
import { employeeService } from "@/server/services/employee.service";

type EmployeePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EmployeePage({ params }: EmployeePageProps) {
  const { id } = await params;

  const employee = await employeeService.getEmployeeById(id);

  if (!employee) {
    notFound();
  }

  return (
    <main className="p-8">
      <h1 className="mb-6 text-3xl font-bold">
        {employee.firstName} {employee.lastName}
      </h1>

      <div className="rounded-lg border p-4 shadow-sm">
        <p>Role: {employee.role.name}</p>
        <p>Employment type: {employee.employmentType.name}</p>
        <p>Status: {employee.isActive ? "Active" : "Inactive"}</p>
      </div>
    </main>
  );
}
