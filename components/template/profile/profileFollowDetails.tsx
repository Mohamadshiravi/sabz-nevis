"use client";

import SabzModal from "@/components/module/sabzModal";
import { UserModelType } from "@/models/user";
import axios from "axios";
import UserFiled from "../../module/userField";
import { useState } from "react";

export default function ProfileFollowDetails({
  followers,
  following,
  userId,
}: {
  followers: string;
  following: string;
  userId: string;
}) {
  const [isFollowerModalOpen, setIsFollowerModalOpen] = useState(false);
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);

  const [userFollowers, setUserFollowers] = useState<[] | UserModelType[]>([]);
  const [userFollowing, setUserFollowing] = useState<[] | UserModelType[]>([]);

  const [loading, setLoading] = useState(true);

  return (
    <>
      <div className="flex items-center mt-3 gap-10 text-sm text-myText-600 dark:text-myText-400">
        <h4
          className="cursor-pointer"
          onClick={() => {
            setIsFollowerModalOpen(true);
            if (userFollowers.length === 0) {
              fetchUserFollowers();
            }
          }}
        >
          توسط
          <span className="text-black dark:text-white px-1">
            {followers.length}
          </span>
          نفر دنبال میشود
        </h4>
        <h4
          className="cursor-pointer"
          onClick={() => {
            setIsFollowingModalOpen(true);
            if (userFollowing.length === 0) {
              fetchUserFollowing();
            }
          }}
        >
          <span className="text-black dark:text-white px-1">
            {following.length}
          </span>
          نفر را دنبال میکند
        </h4>
      </div>
      {isFollowerModalOpen && (
        <SabzModal CloseModal={() => setIsFollowerModalOpen(false)}>
          <div className="flex flex-col gap-0 p-4 overflow-y-scroll no-scrollbar max-h-[500px]">
            {loading ? (
              Array.from({ length: 3 }).map((e, i) => (
                <div key={i} className="flex items-center justify-between py-4">
                  <div className="flex sm:flex-row flex-col items-center gap-4">
                    <div className="w-[60px] h-[60px] rounded-full bg-zinc-200 dark:bg-zinc-800"></div>
                    <div className="w-[120px] h-[30px] bg-zinc-200 dark:bg-zinc-800"></div>
                  </div>
                  <div className="w-[150px] h-[40px] bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
                </div>
              ))
            ) : userFollowers.length === 0 ? (
              <h3 className="text-sm text-center">
                کاربر کسی را دنبال نکرده است
              </h3>
            ) : (
              userFollowers.map((e, i) => (
                <>
                  <UserFiled
                    key={i}
                    userId={e._id}
                    username={e.username}
                    displayName={e.displayName}
                    avatar={e.avatar}
                  />
                </>
              ))
            )}
          </div>
        </SabzModal>
      )}
      {isFollowingModalOpen && (
        <SabzModal CloseModal={() => setIsFollowingModalOpen(false)}>
          <div className="flex flex-col gap-0 p-4 overflow-y-scroll no-scrollbar max-h-[500px]">
            {loading ? (
              Array.from({ length: 3 }).map((e, i) => (
                <div key={i} className="flex items-center justify-between py-4">
                  <div className="flex sm:flex-row flex-col items-center gap-4">
                    <div className="w-[60px] h-[60px] rounded-full bg-zinc-200 dark:bg-zinc-800"></div>
                    <div className="w-[120px] h-[30px] bg-zinc-200 dark:bg-zinc-800"></div>
                  </div>
                  <div className="w-[150px] h-[40px] bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
                </div>
              ))
            ) : userFollowing.length === 0 ? (
              <h3 className="text-sm text-center">
                کاربر کسی را دنبال نکرده است
              </h3>
            ) : (
              userFollowing.map((e, i) => (
                <UserFiled
                  key={i}
                  userId={e._id}
                  username={e.username}
                  displayName={e.displayName}
                  avatar={e.avatar}
                />
              ))
            )}
          </div>
        </SabzModal>
      )}
    </>
  );
  async function fetchUserFollowers() {
    setLoading(true);
    try {
      const res = await axios.get(`/api/user/followers/${userId}`);
      setUserFollowers(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  async function fetchUserFollowing() {
    setLoading(true);
    try {
      const res = await axios.get(`/api/user/following/${userId}`);
      setUserFollowing(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }
}
