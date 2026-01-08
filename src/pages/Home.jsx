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
      <h1>Home</h1>

      <button onClick={() => navigate("/topics")}>
        Topics
      </button>

      {hasAccess ? (
        <button onClick={() => navigate("/addcard")}>
          Új kártya hozzáadása
        </button>
      ) : (
        <button onClick={() => setModalOpen(true)}>
          Admin mód
        </button>
      )}

      <AccessKeyModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={() => alert("Sikeres belépés admin módban!")}
      />
    </div>
  );
};
