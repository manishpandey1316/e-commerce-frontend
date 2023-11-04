import AdminPanel from "../features/Admin/AdminPanel";
import Footer from "../features/common/Footer";
import Navbar from "../features/common/Navbar"
function AdminPanelPage() {
  return (
    <>
      <Navbar>
        <AdminPanel></AdminPanel>
      </Navbar>
      <Footer></Footer>
    </>
  );
}

export default AdminPanelPage;
