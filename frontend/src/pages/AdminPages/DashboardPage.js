const DashboardPage = () => {
  const totalUsers = 100000;
  const activeUsers = 120;
  const premiumUsers = 50;
  const basicUsers = 125;

  const totalListings = 5000;
  const internListings = 1000;
  const partTimeListings = 1200;
  const dormListings = 1400;
  const roommateListings = 1400;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>
        Welcome to the admin dashboard. Here is an overview of your application.
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <div className="bg-green-100 p-4 rounded shadow">
          <h3 className="font-semibold">Total Users</h3>
          <p>{totalUsers}</p>
        </div>

        <div className="bg-blue-100 p-4 rounded shadow">
          <h3 className="font-semibold">Active Users</h3>
          <p>{activeUsers}</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded shadow">
          <h3 className="font-semibold">Premium Users</h3>
          <p>{premiumUsers}</p>
        </div>

        <div className="bg-purple-100 p-4 rounded shadow">
          <h3 className="font-semibold">Basic Users</h3>
          <p>{basicUsers}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <div className="bg-orange-100 p-4 rounded shadow">
          <h3 className="font-semibold">Total Listings</h3>
          <p>{totalListings}</p>
        </div>

        <div className="bg-teal-100 p-4 rounded shadow">
          <h3 className="font-semibold">Intern Listings</h3>
          <p>{internListings}</p>
        </div>

        <div className="bg-pink-100 p-4 rounded shadow">
          <h3 className="font-semibold">Part Time Listings</h3>
          <p>{partTimeListings}</p>
        </div>

        <div className="bg-indigo-100 p-4 rounded shadow">
          <h3 className="font-semibold">Dorm Listings</h3>
          <p>{dormListings}</p>
        </div>

        <div className="bg-lime-100 p-4 rounded shadow">
          <h3 className="font-semibold">Roommate Listings</h3>
          <p>{roommateListings}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
