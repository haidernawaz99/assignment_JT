import AdminLayout from "../../../../components/admin/AdminLayout";
import UserLayout from "../../../../layouts/UserLayout";
import BecomeAffiliate from "../../../affiliate/apply";

BecomeAffiliate.getLayout = (page) => {
  return (
    <UserLayout>
      <AdminLayout>{page} </AdminLayout>
    </UserLayout>
  );
};

export default BecomeAffiliate;
