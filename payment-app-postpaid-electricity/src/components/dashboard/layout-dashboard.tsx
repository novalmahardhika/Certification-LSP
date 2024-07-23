'use client'

import Link from 'next/link'

import {
  Bell,
  Home,
  LineChart,
  Menu,
  Package,
  ShoppingCart,
  Users,
  Lightbulb,
  LogOut,
} from 'lucide-react'

import { Button } from '@/components/ui/button'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ReactNode } from 'react'
import Navbar from './navbar'
import { signOut } from 'next-auth/react'

const items = [
  {
    title: 'Dashboard',
    href: '#',
    icon: <Home className='h-4 w-4' />,
  },
  {
    title: 'Customers',
    href: '/dashboard/users',
    icon: <Users className='h-4 w-4' />,
  },
  {
    title: 'Admin',
    href: '#',
    icon: <ShoppingCart className='h-4 w-4' />,
  },
  {
    title: 'Cost Variant',
    href: '#',
    icon: <Package className='h-4 w-4' />,
  },
  {
    title: 'Analytics',
    href: '#',
    icon: <LineChart className='h-4 w-4' />,
  },
]

export default function DashboardLayoutComponent({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      <div className='hidden border-r bg-muted/40 md:block'>
        <div className='flex h-full max-h-screen flex-col gap-2'>
          <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
            <Link href='/' className='flex items-center gap-2 font-semibold'>
              <Lightbulb className='h-6 w-6' />
              <span className=''>Electricy</span>
            </Link>
            <Button variant='outline' size='icon' className='ml-auto h-8 w-8'>
              <Bell className='h-4 w-4' />
              <span className='sr-only'>Toggle notifications</span>
            </Button>
          </div>

          <div className='flex-1'>
            <aside className='grid items-start px-2 text-sm font-medium lg:px-4'>
              {items.map((item, index) => (
                <Link
                  key={`${item.title}-${index}`}
                  href={item.href}
                  className='flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted text-muted-foreground transition-all hover:text-primary'
                >
                  {item.icon}
                  {item.title}
                </Link>
              ))}
            </aside>
          </div>

          <Button
            variant='outline'
            className='my-3 mx-3 hover:bg-red-500'
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            <LogOut className='h-4 w-4 mr-2' />
            Logout
          </Button>
        </div>
      </div>

      <div className='flex flex-col'>
        <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant='outline'
                size='icon'
                className='shrink-0 md:hidden'
              >
                <Menu className='h-5 w-5' />
                <span className='sr-only'>Toggle navigation menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side='left' className='flex flex-col justify-between'>
              <aside className='grid gap-2 text-lg font-medium'>
                <SheetHeader>
                  <SheetTitle>Electricy</SheetTitle>
                  <SheetDescription>
                    {/* only admin can access this page */}
                  </SheetDescription>
                </SheetHeader>

                {items.map((item, index) => (
                  <Link
                    key={`${item.title}-${index}`}
                    href={item.href}
                    className='flex items-center gap-3 hover:bg-muted rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                ))}
              </aside>

              <Button
                variant='outline'
                className='my-3 mx-3 hover:bg-red-500'
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                <LogOut className='h-4 w-4 mr-2' />
                Logout
              </Button>
            </SheetContent>
          </Sheet>

          <Navbar />
        </header>

        {/* content */}
        <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
          {children}
        </main>
      </div>
    </div>
  )
}
