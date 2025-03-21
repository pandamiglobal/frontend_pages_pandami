import Link from "next/link"
import Image from "next/image"
import { Globe, Menu, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { PrimaryButton } from "@/components/ui/primary-button"
import { ThemeToggle } from "@/components/theme-toggle"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import type { INavItem } from "@/@types/@header"

const navItems: INavItem[] = [
  {
    title: "Principal",
    href: "/",
  },
  {
    title: "Sobre nós",
    href: "/sobre-nos",
  },
  {
    title: "Produtos",
    href: "/produtos",
    hasDropdown: true,
    dropdownItems: [
      {
        title: "Registro de Marca",
        href: "/registro-de-marca",
      },
    ],
  },
  {
    title: "Ferramentas",
    href: "/ferramentas",
    hasDropdown: true,
    dropdownItems: [
      {
        title: "Consulta de Marca",
        href: "/consulta-inpi",
      },
    ],
  },
  {
    title: "Blog",
    href: "/blog",
  },
]

export function Header() {
  return (
    <header className="w-full border-b py-4 bg-background">
      <Container>
        <div className="md:hidden flex items-center justify-between w-full">
          <Link href="/" className="flex items-center">
            <Image src="/logo.svg" alt="PPPI Logo" width={120} height={40} className="h-10 w-auto" />
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="text-base font-medium text-foreground hover:text-primary flex items-center"
                    >
                      {item.icon && <item.icon className="h-5 w-5 mr-2" />}
                      {item.title}
                    </Link>
                  ))}
                </nav>

                <div className="flex flex-col gap-4 mt-8">
                  <div className="flex items-center border rounded-md px-3 py-2 bg-background">
                    <Globe className="h-5 w-5 mr-2 text-muted-foreground" />
                    <select className="w-full bg-transparent focus:outline-none text-foreground" defaultValue="pt-BR">
                      <option value="pt-BR">Português (Brasil)</option>
                    </select>
                  </div>

                  <Link href="https://api.whatsapp.com/send?phone=48988793250">
                    <PrimaryButton className="w-full">Fale conosco</PrimaryButton>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <div className="hidden md:flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image src="/logo.svg" alt="PPPI Logo" width={120} height={40} className="h-10 w-auto" />
            </Link>

            <nav className="hidden md:flex items-center ml-8">
              {navItems.map((item) => (
                <div key={item.title} className="mr-8 last:mr-0">
                  {item.hasDropdown ? (
                    <DropdownMenu>
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

            <Link href="https://api.whatsapp.com/send?phone=48988793250">
              <PrimaryButton>Fale conosco</PrimaryButton>
            </Link>
          </div>
        </div>
      </Container>
    </header>
  )
}

