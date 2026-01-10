import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AccessContext } from "../context/MyAccessProvider";
import { AccessKeyModal } from "../components/AccessKeyModal";

export const Home = () => {
  const navigate = useNavigate();
  const { hasAccess } = useContext(AccessContext);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="home">
      <h1 style={{marginBottom:"20px"}}>FlashCards</h1>

      <button onClick={() => navigate("/topics")}>
        Topics
      </button>

      

      <AccessKeyModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={() => alert("Sikeres belépés")}
      />
    </div>
  );
};
