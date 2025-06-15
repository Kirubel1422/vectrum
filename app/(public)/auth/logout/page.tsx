"use client";

import { useEffect } from "react";
import { logout } from "../_lib/actions";

export default function page() {
  useEffect(() => {
    (async () => await logout())();
  }, []);
  return <></>;
}
