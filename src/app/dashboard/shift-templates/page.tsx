export default function ShiftTemplatesPage() {
  return (
    <main className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Shift Templates</h1>

      <button className="mb-6 rounded bg-blue-600 px-4 py-2 text-white">
        Add Shift Template
      </button>

      <div className="overflow-hidden rounded-lg border shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Start</th>
              <th className="p-4">End</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              <td className="p-4 font-medium">Morning shift</td>
              <td className="p-4">07:30</td>
              <td className="p-4">17:00</td>
              <td className="flex gap-2 p-4">
                <button className="rounded bg-gray-800 px-3 py-2 text-white">
                  Edit
                </button>

                <button className="rounded bg-red-600 px-3 py-2 text-white">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
