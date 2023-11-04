import AdminOrders from "../features/Admin/AdminOrders";
import Navbar from "../features/common/Navbar"
function AdminOrdersPage() {
  return (
    <>
      <Navbar>
        <AdminOrders></AdminOrders>
      </Navbar>
    </>
  );
}

export default AdminOrdersPage;
