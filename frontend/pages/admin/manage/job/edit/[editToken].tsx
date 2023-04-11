import { Card, CardContent } from "@mui/material";
import UserLayout from "../../../../../layouts/UserLayout";
import EditJob from "../../../../edit/[editToken]";

const EditJobAdmin = () => {
  return <EditJob isAdmin />;
};

export default EditJobAdmin;

EditJobAdmin.getLayout = (page) => {
  return (
    <UserLayout>
      <Card>
        <CardContent>{page}</CardContent>
      </Card>
    </UserLayout>
  );
};
