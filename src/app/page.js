"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ColumnManager from "./components/ColumnManager";
import { DragDropContext } from "react-beautiful-dnd";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    } else {
      router.push("/login");
    }
  }, [router]);

  return user ? (
    <div className="m-8">
      <DragDropContext onDragEnd={ColumnManager.onDragEnd}>
        <ColumnManager />
      </DragDropContext>
    </div>
  ) : null;
}
