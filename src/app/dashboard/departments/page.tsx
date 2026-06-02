export default function DepartmentsPage() {
  return (
    <main>
      <h1>Departments</h1>

      <button>Add Department</button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Reception</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}
