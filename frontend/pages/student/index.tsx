import type { NextPage } from 'next'
import * as React from "react";
import Home from "@/components/Pages/Home";

const Top: NextPage = () => {

  return (
    <>
      <Home middleware={"student"} />
    </>
  )
}

export default Top
