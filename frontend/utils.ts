import { GetServerSideProps } from "next";

export function convertDateTypeOnObject(obj: any) {
  for (const key in obj) {
    const value = obj[key]
    if (value && typeof value == "string" && key.indexOf("_at") >= 0) {
      obj[key] = new Date(value)
    }
  }
  return obj
}

export const withTokenRedirect = (userType: string): GetServerSideProps => async (context) => {
  const { token } = context.query;

  if (!token) {
    return {
      redirect: {
        destination: `/${userType}/login`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
