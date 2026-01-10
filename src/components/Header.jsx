import axios from "axios";
import React from "react";
import { useContext } from "react";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router";
import { AccessContext, MyAccessProvider } from "../context/MyAccessProvider";
import { AccessKeyModal } from "./AccessKeyModal";

export const Header = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const {hasAccess,clearKey} = useContext(AccessContext)

  
  const handleLogin = () => {
    setOpen(true)
    navigate("/")
  }

  const handleLogout = () => {
    clearKey();
    navigate("/");
  };

  return (
    <header className="myHeader">
      <FaHome onClick={() => navigate("/")} className="home-icon" size={40} />
      {hasAccess?<button onClick={handleLogout} className="kilepes">Kilépés admin módból</button>
      : 
      <button onClick={handleLogin} className="belepes">Belépés</button>
      }
      <AccessKeyModal open={open} onClose={()=>setOpen(false)} onSuccess={()=>navigate("/")}/>
    </header>
    
  );
};