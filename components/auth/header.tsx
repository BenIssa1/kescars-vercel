'use client'

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface HeaderProps {
    label: string
}

export const Header = ({
    label
}: HeaderProps) => {
    const pathname = usePathname()
    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <h1 className={cn(
                'text-3xl font-semibold',
            )}>
                {pathname === '/auth/register' ? (<span>👋🏽 Bienvenue</span>) : pathname === '/auth/login' ? (<span>Connexion</span>) : ""}
                
            </h1>
            <p className="text-muted-foreground text-sm">
                {label}
            </p>
        </div>
    )
}