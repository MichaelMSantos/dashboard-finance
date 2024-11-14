"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="flex justify-between items-center px-8 py-4 border-b border-solid relative">
      <div className="flex items-center gap-10">
        <Image src="/logo.svg" width={173} height={39} alt="Finance AI" />

        {/* Links para a versão desktop */}
        <div className="hidden md:flex items-center gap-10">
          <Link
            href="/"
            className={
              pathname === "/" ? "text-primary font-bold" : "text-gray-300"
            }
          >
            Dashboard
          </Link>
          <Link
            href="/transactions"
            className={
              pathname === "/transactions"
                ? "text-primary font-bold"
                : "text-gray-300"
            }
          >
            Transações
          </Link>
          <Link
            href="/subscription"
            className={
              pathname === "/subscription"
                ? "text-primary font-bold"
                : "text-gray-300"
            }
          >
            Assinatura
          </Link>
        </div>
      </div>

      {/* Exibe o UserButton em telas grandes */}
      <div className="hidden md:block">
        <UserButton showName />
      </div>

      {/* Botão de menu hambúrguer para telas pequenas */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Overlay (fundo que bloqueia o conteúdo) */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
        ></div>
      )}

      {/* Menu deslizando da esquerda */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-full bg-[#100c0c] shadow-md transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-30`}
      >
        {/* Botão de fechar dentro do menu */}
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="flex flex-col items-center gap-4 py-4">
          <Link
            href="/"
            className={
              pathname === "/" ? "text-primary font-bold" : "text-gray-300"
            }
          >
            Dashboard
          </Link>
          <Link
            href="/transactions"
            className={
              pathname === "/transactions"
                ? "text-primary font-bold"
                : "text-gray-300"
            }
          >
            Transações
          </Link>
          <Link
            href="/subscription"
            className={
              pathname === "/subscription"
                ? "text-primary font-bold"
                : "text-gray-300"
            }
          >
            Assinatura
          </Link>
        </div>

        {/* UserButton para o menu mobile */}
        <div className="flex justify-center px-4 py-2">
          <UserButton showName />
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-10 backdrop-blur-sm"></div>
      )}
    </nav>
  );
};

export default Navbar;
