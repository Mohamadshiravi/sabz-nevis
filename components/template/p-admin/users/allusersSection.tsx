"use client";

import { SendErrorToast } from "@/utils/toast-functions";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { UserModelType } from "@/models/user";
import AdminPanelUserField from "./adminPanelUser";
import UserField from "@/components/module/userField";
import { banUserModelType } from "@/models/banuser";
import AdminPanelBanUserField from "./adminPanelBanuser";

export default function AllUsersSection() {
  const [users, setUsers] = useState<[] | UserModelType[]>([]);
  const [banUsers, setBanUsers] = useState<[] | banUserModelType[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchInp, setSearchInp] = useState("");

  useEffect(() => {
    FetchBanUsers();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInp !== "") {
        FetchSearchedUsers();
      }
    }, 800);

    if (searchInp === "") {
      FetchAllUsers();
    }

    return () => clearTimeout(timer);
  }, [searchInp]);

  async function FetchAllUsers() {
    setLoading(true);
    try {
      const res = await axios.get("/api/users");

      setUsers(res.data.users);
      setLoading(false);
    } catch (error) {
      SendErrorToast("مشکلی در هنگام دریافت کاربران پیش امد");
      setLoading(false);
    }
  }

  async function FetchSearchedUsers() {
    setLoading(true);
    try {
      const res = await axios.get(`/api/search?type=users&&vord=${searchInp}`);

      setUsers(res.data.data);
      setLoading(false);
    } catch (error) {
      SendErrorToast("مشکلی در هنگام دریافت کاربران پیش امد");
      setLoading(false);
    }
  }

  async function FetchBanUsers() {
    setLoading(true);
    try {
      const res = await axios.get("/api/user/ban");

      setBanUsers(res.data.banUsers);
      setLoading(false);
    } catch (error) {
      SendErrorToast("مشکلی در هنگام دریافت کاربران پیش امد");
      setLoading(false);
    }
  }

  return (
    <div className="mt-4 sm:p-10 p-0 flex flex-col gap-3">
      <div className="flex items-center gap-3 border-2 text-base vazir-light rounded-md px-3 py-3 border-zinc-200 dark:border-zinc-800">
        <IoIosSearch className="text-2xl text-zinc-500" />
        <input
          onChange={(e) => setSearchInp(e.target.value)}
          value={searchInp}
          placeholder="جستجو در کاربران"
          type="text"
          className="w-full bg-inherit outline-hidden"
        />
      </div>
      {loading ? (
        Array.from({ length: 6 }).map((e, i) => (
          <div
            key={i}
            className="flex border items-center justify-between border-zinc-200 dark:border-zinc-800 p-4 rounded-md"
          >
            <div className="flex sm:flex-row flex-col items-center gap-4">
              <div className="w-[60px] h-[60px] rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse"></div>
              <div className="sm:w-[150px] w-[100px] h-[30px] bg-zinc-200 dark:bg-zinc-800 animate-pulse"></div>
            </div>
            <div className="flex flex-col gap-2 items-center gap-1">
              <div className="w-[150px] h-[35px] rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse"></div>
              <div className="w-[150px] h-[35px] rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse"></div>
            </div>
          </div>
        ))
      ) : users.length === 0 ? (
        <div className="py-10"> کاربری موجود نیست</div>
      ) : (
        users?.map((e, i) => (
          <AdminPanelUserField reRenderUsers={FetchAllUsers} key={i} data={e} />
        ))
      )}
      <div className="border border-zinc-200 dark:border-zinc-800 rounded-md p-4">
        <h3 className="vazir-medium text-lg text-center w-full pb-4">
          کاربران بن شده
        </h3>
        {loading ? (
          Array.from({ length: 6 }).map((e, i) => (
            <div
              key={i}
              className="flex border items-center justify-between border-zinc-200 dark:border-zinc-800 p-4 rounded-md"
            >
              <div className="flex sm:flex-row flex-col items-center gap-4">
                <div className="sm:w-[150px] w-[100px] h-[30px] bg-zinc-200 dark:bg-zinc-800 animate-pulse"></div>
              </div>
              <div className="flex flex-col gap-2 items-center gap-1">
                <div className="w-[150px] h-[35px] rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse"></div>
              </div>
            </div>
          ))
        ) : banUsers.length === 0 ? (
          <div> کاربری بن شده ای موجود نیست</div>
        ) : (
          banUsers?.map((e, i) => (
            <AdminPanelBanUserField
              reRenderUsers={FetchBanUsers}
              key={i}
              data={e}
            />
          ))
        )}
      </div>
    </div>
  );
}
