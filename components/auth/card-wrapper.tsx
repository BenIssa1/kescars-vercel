'use client'

import { cn } from "@/lib/utils"
import { 
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from "../ui/card"
import { BackButton } from "./back-button"
import { Header } from "./header"
import { Social } from "./social"

interface CardWrapperProps {
    children: React.ReactNode
    headerLabel: string
    backButtonLabel: string
    backButtonHref: string
    showSocial?: boolean
    className?: string
}

export const CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial,
    className
}: CardWrapperProps) => {
    return (
        <Card className={cn("w-[600px] shadow-md", className)}>
            <CardHeader>
                <Header label={headerLabel} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocial && (
                <CardFooter>
                    <Social  />
                </CardFooter>
            )}
            {/* <CardFooter>
                <BackButton 
                    label={backButtonLabel}
                    href={backButtonHref}
                />
            </CardFooter> */}
        </Card>
    )
}