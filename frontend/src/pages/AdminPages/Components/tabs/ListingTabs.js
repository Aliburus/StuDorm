import { useEffect, useState } from "react";
import { AdminService } from "../../../../services/AdminService";

function ListingsTab({
  listings,
  refreshListings = () => window.location.reload(),
}) {
  const [selectedType, setSelectedType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredListings, setFilteredListings] = useState(listings);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingListing, setEditingListing] = useState(null);

  useEffect(() => {
    setFilteredListings(
      listings.filter((listing) => {
        const matchesType = selectedType
          ? listing.category === selectedType
          : true;
        const matchesSearch = listing.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        return matchesType && matchesSearch;
      })
    );
  }, [listings, selectedType, searchTerm]);

  const openEditModal = (listing) => {
    setEditingListing(listing);
    setEditModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const fields = {};
    // Collect only non-empty fields
    Array.from(form.elements).forEach((el) => {
      if (el.name && el.value !== undefined) {
        fields[el.name] = el.value;
      }
    });
    try {
      const [source, id] = editingListing.unique_id.split("-");
      await AdminService.updateListingDetails(source, id, fields);
      alert("Listing updated");
      setEditModalOpen(false);
      refreshListings();
    } catch (err) {
      console.error(err);
      alert("Failed to update listing");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Listing Management
          </h2>
          <div className="flex space-x-2">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border rounded-md"
            >
              <option value="">All Types</option>
              <option value="dorm">Dorm</option>
              <option value="interns">Intern</option>
              <option value="parttimeads">Part-time</option>
              <option value="roommate">Roommate</option>
            </select>
            <input
              type="text"
              placeholder="Search listings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded-md"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Title", "Type", "Status", "Date", "Actions"].map((h) => (
                <th
                  key={h}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredListings.length > 0 ? (
              filteredListings.map((listing) => (
                <tr key={listing.unique_id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {listing.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {listing.category}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        listing.status === "active"
                          ? "bg-green-100 text-green-800"
                          : listing.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {listing.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(listing.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => openEditModal(listing)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={async () => {
                        const [source, id] = listing.unique_id.split("-");
                        if (
                          confirm(
                            "Are you sure you want to delete this listing?"
                          )
                        ) {
                          try {
                            await AdminService.deleteListing(source, id);
                            alert("Listing deleted");
                            refreshListings();
                          } catch (e) {
                            console.error(e);
                            alert("Failed to delete listing");
                          }
                        }
                      }}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No listings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editModalOpen && editingListing && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Edit Listing</h3>
            <form onSubmit={handleUpdate} className="space-y-3">
              {/* Common fields */}
              {["yurtads", "parttimeads"].includes(editingListing.source) && (
                <input
                  name="title"
                  defaultValue={editingListing.title}
                  placeholder="Title"
                  className="w-full p-2 border rounded"
                />
              )}
              {editingListing.source === "interns" && (
                <input
                  name="name"
                  defaultValue={editingListing.title}
                  placeholder="Name"
                  className="w-full p-2 border rounded"
                />
              )}
              <textarea
                name="description"
                defaultValue={editingListing.description}
                placeholder="Description"
                className="w-full p-2 border rounded"
              />
              <input
                name="status"
                defaultValue={editingListing.status}
                placeholder="Status"
                className="w-full p-2 border rounded"
              />
              {/* Conditional fields */}
              {["yurtads", "parttimeads"].includes(editingListing.source) && (
                <>
                  <input
                    name="province"
                    defaultValue={editingListing.province}
                    placeholder="Province"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    name="district"
                    defaultValue={editingListing.district}
                    placeholder="District"
                    className="w-full p-2 border rounded"
                  />
                </>
              )}
              {editingListing.source === "parttimeads" && (
                <input
                  name="category"
                  defaultValue={editingListing.category}
                  placeholder="Category"
                  className="w-full p-2 border rounded"
                />
              )}
              {["parttimeads", "interns"].includes(editingListing.source) && (
                <>
                  <input
                    name="contact"
                    defaultValue={editingListing.contact}
                    placeholder="Contact"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    name="duration"
                    defaultValue={editingListing.duration}
                    placeholder="Duration"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    name="requirements"
                    defaultValue={editingListing.requirements}
                    placeholder="Requirements"
                    className="w-full p-2 border rounded"
                  />
                </>
              )}
              {["yurtads", "parttimeads"].includes(editingListing.source) && (
                /*#__PURE__*/
                <input
                  name="price"
                  defaultValue={editingListing.price || ""}
                  placeholder="Price"
                  className="w-full p-2 border rounded"
                />
              )}
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListingsTab;
