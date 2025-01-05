"use client";

import { getTheme } from "@/redux/slices/user";
import { useTypedDispatch } from "@/redux/typedHooks";
import { useEffect } from "react";

export default function GetTheme() {
  useEffect(() => {
    dispatch(getTheme());
  }, []);
  const dispatch = useTypedDispatch();
  return null;
}
