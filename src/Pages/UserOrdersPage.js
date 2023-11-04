import UserOrders from "../features/User/UserOrders";
import Navbar from "../features/common/Navbar";
function UserOrdersPage() {
  return (
    <>
      <Navbar>
        <UserOrders></UserOrders>
      </Navbar>
    </>
  );
}

export default UserOrdersPage;
