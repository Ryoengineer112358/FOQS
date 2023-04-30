import type { NextPage } from "next";
import * as ResetPasswordComponent from "@/components/Pages/ResetPassword";
import { withTokenRedirect } from "@/utils";

const ResetPassword: NextPage = () => {
  return <ResetPasswordComponent.default userType="tutor" />
}

export const getServerSideProps = withTokenRedirect("tutor");

export default ResetPassword
