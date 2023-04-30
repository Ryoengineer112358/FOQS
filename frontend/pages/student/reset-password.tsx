import type {NextPage} from "next";
import * as ResetPasswordComponent from "@/components/Pages/ResetPassword";
import { withTokenRedirect } from "@/utils";

const ResetPassword: NextPage = () => {
  return <ResetPasswordComponent.default userType="student" />
}

export const getServerSideProps = withTokenRedirect("student");

export default ResetPassword
