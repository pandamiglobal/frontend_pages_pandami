"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Globe, Menu, ChevronDown, ArrowRight, X } from "lucide-react";
import { Container } from "@/app/_components/atoms/ui/container";
import { BrandedButton } from "@/app/_components/molecules/branded-button";
import { ThemeToggle } from "@/app/_components/molecules/theme-toggle";
import type { INavItem } from "@/common/types/IHeader";
import { useState, useEffect, useRef } from "react";

const navItems: INavItem[] = [
  {
    title: "Início",
    href: "/#home",
  },
  {
    title: "Benefícios",
    href: "/#benefits",
  },
  {
    title: "Planos",
    href: "/#pricing",
  },
  {
    title: "Blog",
    href: "/blog",
  },
];

interface HeaderProps {
  variant?: "default" | "logo-only" | "hidden";
}

export function Header({ variant = "default" }: HeaderProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const activeSectionRef = useRef<string>("");
  const languageButtonRef = useRef<HTMLButtonElement>(null);

  // Atualizar o ref sempre que o state mudar
  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  // Controlar efeito de scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Detectar seção ativa baseado no scroll
  useEffect(() => {
    const sections = navItems
      .map((item) => {
        // Suporta tanto "/#section" (home) quanto "#section" (LP)
        if (item.href.startsWith("/#")) {
          return item.href.substring(2);
        } else if (item.href.startsWith("#")) {
          return item.href.substring(1);
        }
        return null;
      })
      .filter(Boolean) as string[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          } else if (activeSectionRef.current === `#${entry.target.id}`) {
            setActiveSection("");
          }
        });
      },
      {
        rootMargin: "-20% 0px -50% 0px",
        threshold: 0,
      },
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Controlar o body quando o menu mobile está aberto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    if (!activeDropdown) return;
    const handleClickOutside = () => setActiveDropdown(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [activeDropdown]);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleDropdownToggle = (dropdown: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  if (variant === "hidden") {
    return null;
  }

  if (variant === "logo-only") {
    return (
      <header
        className={`w-screen border-b py-4 fixed top-0 left-0 right-0 z-50 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-md"
            : "bg-background/60 backdrop-blur-xs"
        }`}
      >
        <Container>
          <div className="flex items-center justify-center w-full">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="Pandami Logo"
                width={160}
                height={24}
                className="h-6 lg:h-8 w-auto"
                style={{ width: "auto" }}
              />
            </Link>
          </div>
        </Container>
      </header>
    );
  }

  return (
    <>
      {/* Header Principal - Desktop e Mobile */}
      <header
        className={`w-screen border-b py-4 fixed top-0 left-0 right-0 z-50 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-md"
            : "bg-background/60 backdrop-blur-xs"
        }`}
      >
        <Container>
          <div className="flex items-center justify-between w-full">
            {/* Logo */}
            <div className="flex-1">
              <Link
                href="/"
                className="flex items-center"
                onClick={handleLinkClick}
              >
                <Image
                  src="/logo.svg"
                  alt="Pandami Logo"
                  width={160}
                  height={24}
                  className="h-6 lg:h-8 w-auto"
                  style={{ width: "auto" }}
                />
              </Link>
            </div>

            {/* Nav Items - Apenas Desktop */}
            <nav className="hidden lg:flex items-center justify-center flex-1">
              {navItems.map((item) => {
                const isAnchorLink =
                  item.href.startsWith("/#") || item.href.startsWith("#");
                const isActive = isAnchorLink
                  ? activeSection ===
                    (item.href.startsWith("/#")
                      ? item.href.substring(1)
                      : item.href)
                  : pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);

                return (
                  <div key={item.title} className="mr-8 last:mr-0">
                    {item.hasDropdown ? (
                      <button
                        className={`flex items-center text-base font-medium hover:text-primary ${
                          isActive ? "text-primary" : "text-foreground"
                        }`}
                        onClick={(e) => handleDropdownToggle(item.title, e)}
                      >
                        {item.icon && <item.icon className="h-5 w-5 mr-2" />}
                        {item.title}
                        <ChevronDown className="h-4 w-4 ml-1" />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        data-testid={`menu-${item.title.toLowerCase()}`}
                        className={`text-base font-normal hover:text-primary flex items-center transition-colors duration-300 ${
                          isActive ? "text-primary" : "text-foreground"
                        }`}
                        onClick={handleLinkClick}
                      >
                        {item.icon && <item.icon className="h-5 w-5 mr-2" />}
                        {item.title}
                      </Link>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Botões e controles - Desktop */}
            <div className="hidden lg:flex items-center space-x-3 flex-1 justify-end">
              <ThemeToggle />

              <div className="relative">
                <button
                  ref={languageButtonRef}
                  className="rounded-full bg-transparent hover:bg-accent p-2"
                  onClick={(e) => handleDropdownToggle("language", e)}
                  aria-label="Selecionar idioma"
                  aria-expanded={activeDropdown === "language"}
                  aria-haspopup="listbox"
                >
                  <Globe className="h-5 w-5" />
                </button>
              </div>

              <BrandedButton
                href="https://app.pandami.com.br/auth/sign-in/"
                icon={<ArrowRight className="h-4 w-4" />}
                size="sm"
                variant="outline"
                className="px-3 whitespace-nowrap"
                gtmData={{
                  event: "login_button_click",
                  category: "button",
                  action: "click",
                  label: "acessar-painel",
                }}
              >
                ACESSAR PAINEL
              </BrandedButton>

              <BrandedButton
                href="https://app.pandami.com.br/auth/sign-up/"
                icon={<ArrowRight className="h-4 w-4" />}
                size="sm"
                className="px-3 whitespace-nowrap"
                gtmData={{
                  event: "register_button_click",
                  category: "button",
                  action: "click",
                  label: "comecar-agora",
                }}
              >
                COMEÇAR AGORA
              </BrandedButton>
            </div>

            {/* Menu Mobile Toggle */}
            <div className="lg:hidden flex items-center gap-2">
              <ThemeToggle />
              <button
                className="p-2 rounded-md hover:bg-accent"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Menu Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background">
          <Container>
            <div className="flex justify-between items-center py-4 border-b">
              <Link
                href="/"
                className="flex items-center"
                onClick={handleLinkClick}
              >
                <Image
                  src="/logo.svg"
                  alt="Pandami Logo"
                  width={160}
                  height={24}
                  className="h-6 lg:h-8 w-auto"
                  style={{ width: "auto" }}
                  priority
                />
              </Link>
              <div className="flex items-center border rounded-md px-3 py-2 bg-card">
                <Globe className="h-5 w-5 mr-3 text-muted-foreground" />
                <select
                  className="w-full bg-transparent focus:outline-hidden"
                  defaultValue="pt-BR"
                >
                  <option value="pt-BR">Português</option>
                </select>
              </div>
              <button
                className="p-2 rounded-full hover:bg-accent"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Fechar menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="py-8 overflow-y-auto h-[calc(100vh-80px)]">
              <nav className="space-y-6 mb-8">
                {navItems.map((item) => {
                  const isAnchorLink =
                    item.href.startsWith("/#") || item.href.startsWith("#");
                  const isActive = isAnchorLink
                    ? activeSection ===
                      (item.href.startsWith("/#")
                        ? item.href.substring(1)
                        : item.href)
                    : pathname === item.href ||
                      pathname.startsWith(`${item.href}/`);

                  return (
                    <div
                      key={item.title}
                      className="border-b border-border pb-4"
                    >
                      <Link
                        href={item.href}
                        className={`text-xl font-medium flex items-center transition-colors duration-300 ${
                          isActive
                            ? "text-primary"
                            : "text-foreground hover:text-primary"
                        }`}
                        onClick={handleLinkClick}
                      >
                        {item.icon && <item.icon className="h-5 w-5 mr-2" />}
                        {item.title}
                      </Link>
                    </div>
                  );
                })}
              </nav>

              <div className="flex flex-col gap-4 mt-10">
                <BrandedButton
                  href="https://app.pandami.com.br/auth/sign-in/"
                  onClick={handleLinkClick}
                  className="w-full flex"
                  variant="outline"
                  size="lg"
                  icon={<ArrowRight className="h-5 w-5" />}
                >
                  ACESSAR PAINEL
                </BrandedButton>

                <BrandedButton
                  href="https://app.pandami.com.br/auth/sign-up/"
                  onClick={handleLinkClick}
                  icon={<ArrowRight className="h-5 w-5" />}
                  className="w-full flex"
                  size="lg"
                >
                  COMEÇAR AGORA
                </BrandedButton>
              </div>
            </div>
          </Container>
        </div>
      )}

      {/* Mega Dropdown para Desktop */}
      {activeDropdown && activeDropdown !== "language" && (
        <div
          className="fixed top-[72px] left-0 w-full z-40 border-t border-border bg-background/95 backdrop-blur-lg shadow-lg"
          onClick={() => setActiveDropdown(null)}
        >
          <Container>
            <div className="py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Aqui você pode adicionar o conteúdo específico do dropdown ativo */}
              <div className="col-span-1">
                <h3 className="font-medium text-lg mb-4">{activeDropdown}</h3>
                <div className="space-y-3">
                  <Link
                    href="#"
                    className="block text-muted-foreground hover:text-primary"
                    onClick={handleLinkClick}
                  >
                    Item de exemplo 1
                  </Link>
                  <Link
                    href="#"
                    className="block text-muted-foreground hover:text-primary"
                    onClick={handleLinkClick}
                  >
                    Item de exemplo 2
                  </Link>
                  <Link
                    href="#"
                    className="block text-muted-foreground hover:text-primary"
                    onClick={handleLinkClick}
                  >
                    Item de exemplo 3
                  </Link>
                </div>
              </div>
              {/* Adicione mais colunas conforme necessário */}
            </div>
          </Container>
        </div>
      )}

      {/* Dropdown de Idioma */}
      {activeDropdown === "language" && (
        <div
          className="fixed z-50 bg-background/95 backdrop-blur-md border border-border rounded-md shadow-lg w-30"
          onClick={(e) => e.stopPropagation()}
          role="listbox"
          style={{
            top: languageButtonRef.current
              ? languageButtonRef.current.getBoundingClientRect().bottom + 8
              : 82,
            left: languageButtonRef.current
              ? languageButtonRef.current.getBoundingClientRect().left - 16
              : "auto",
          }}
        >
          <div className="py-2 w-full">
            <button
              className="w-full text-center px-2 py-1 hover:bg-accent"
              onClick={() => setActiveDropdown(null)}
              role="option"
              aria-selected="true"
            >
              Português
            </button>
          </div>
        </div>
      )}
    </>
  );
}
