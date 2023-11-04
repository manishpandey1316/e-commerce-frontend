import AdminProducts from "../features/Admin/AdminProducts";
import Navbar from "../features/common/Navbar";
function AdminProductsPage() {
  return (
    <>
      <Navbar>
        <AdminProducts></AdminProducts>
      </Navbar>
    </>
  );
}

export default AdminProductsPage;
