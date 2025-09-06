'use client'

import Link from "next/link"
import Image from "next/image"
import { Globe, Menu, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { PrimaryButton } from "@/components/ui/primary-button"
import { ThemeToggle } from "@/components/theme-toggle"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { INavItem } from "@/@types/@header"
import { useState } from "react"

const navItems: INavItem[] = [
  {
    title: "Início",
    href: "#home",
  },
  {
    title: "Benefícios",
    href: "#benefits",
  },
  {
    title: "Planos",
    href: "#plans",
  },
  {
    title: "Blog",
    href: "/blog",
  },
]

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false)
    setOpenDropdown(null)
  }

  return (
    <header className="w-full border-b py-4 bg-background">
      <Container>
        <div className="md:hidden flex items-center justify-between w-full">
          <Link href="/" className="flex items-center" onClick={handleLinkClick}>
            <Image src="/logo.svg" alt="PPPI Logo" width={160} height={24} className="h-8 w-auto" />
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <Accordion type="single" collapsible className="w-full">
                    {navItems.map((item) => (
                      <AccordionItem key={item.title} value={item.title} className="border-0">
                        {item.hasDropdown ? (
                          <>
                            <AccordionTrigger className="text-base font-medium text-foreground hover:text-primary hover:no-underline py-3">
                              {item.icon && <item.icon className="h-5 w-5 mr-2" />}
                              {item.title}
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="flex flex-col gap-2 pl-4">
                                {item.dropdownItems?.map((dropdownItem) => (
                                  <Link
                                    key={dropdownItem.title}
                                    href={dropdownItem.href}
                                    className="text-sm text-muted-foreground hover:text-primary py-2"
                                    onClick={handleLinkClick}
                                  >
                                    {dropdownItem.title}
                                  </Link>
                                ))}
                              </div>
                            </AccordionContent>
                          </>
                        ) : (
                          <Link
                            href={item.href}
                            className="text-base font-medium text-foreground hover:text-primary flex items-center py-3"
                            onClick={handleLinkClick}
                          >
                            {item.icon && <item.icon className="h-5 w-5 mr-2" />}
                            {item.title}
                          </Link>
                        )}
                      </AccordionItem>
                    ))}
                  </Accordion>
                </nav>

                <div className="flex flex-col gap-4 mt-8">
                  <div className="flex items-center border rounded-md px-3 py-2 bg-background">
                    <Globe className="h-5 w-5 mr-2 text-muted-foreground" />
                    <select className="w-full bg-transparent focus:outline-none text-foreground" defaultValue="pt-BR">
                      <option value="pt-BR">Português (Brasil)</option>
                    </select>
                  </div>

                  <Link href="https://api.whatsapp.com/send?phone=48988793250" onClick={handleLinkClick}>
                    <PrimaryButton className="w-full">Fale conosco</PrimaryButton>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <div className="hidden md:flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center" onClick={handleLinkClick}>
              <Image src="/logo.svg" alt="PPPI Logo" width={160} height={24} className="h-8 w-auto" />
            </Link>

            <nav className="hidden md:flex items-center ml-8">
              {navItems.map((item) => (
                <div key={item.title} className="mr-8 last:mr-0">
                  {item.hasDropdown ? (
                    <DropdownMenu open={openDropdown === item.title} onOpenChange={(open) => setOpenDropdown(open ? item.title : null)}>
                      <DropdownMenuTrigger 
                        data-testid={`menu-${item.title.toLowerCase()}`}
                        className="flex items-center text-base font-medium text-foreground hover:text-primary"
                      >
                        {item.icon && <item.icon className="h-5 w-5 mr-2" />}
                        {item.title}
                        <ChevronDown className="h-4 w-4 ml-1" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {item.dropdownItems?.map((dropdownItem) => (
                          <DropdownMenuItem key={dropdownItem.title}>
                            <Link 
                              href={dropdownItem.href}
                              data-testid={`submenu-${dropdownItem.title.toLowerCase().replace(/\s+/g, '-')}`}
                              onClick={handleLinkClick}
                            >
                              {dropdownItem.title}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link
                      href={item.href}
                      data-testid={`menu-${item.title.toLowerCase()}`}
                      className="text-base font-medium text-foreground hover:text-primary flex items-center"
                      onClick={handleLinkClick}
                    >
                      {item.icon && <item.icon className="h-5 w-5 mr-2" />}
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Português Brasil</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="https://api.whatsapp.com/send?phone=48988793250" onClick={handleLinkClick}>
              <PrimaryButton>Fale conosco</PrimaryButton>
            </Link>
          </div>
        </div>
      </Container>
    </header>
  )
}

