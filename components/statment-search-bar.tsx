"use client"

import { useRouter } from 'next/navigation'
import React, { useRef, useState, useTransition } from 'react'

import { Loader2, Search } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'

const StatementSearchBar = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [isSearching, startTransition] = useTransition()
    const router = useRouter()
    const [query, setQuery] = useState<string>("")

    const search = () => {
        startTransition(() => {
            router.push(`/statement?query=${query}`)
        })
    }

  return (
    <div className='relative h-14 z-10 rounded-md flex items-center'>
        <Input
            disabled={isSearching}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='rechercher un assuré'
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    search()
                }

                if (e.key === "Escape") {
                    inputRef?.current?.blur()
                }
            }}
            ref={inputRef}
            className='absolute inset-0 w-[250px]'
        />

        <Button 
            disabled={isSearching}
            size={"sm"}
            onClick={search}
            className='absolute left-[260px] mb-5 '
        >
            {isSearching ? (
                    <div className='flex items-center'>
                        <Loader2 className="mr-2 h-6 w-6 animate-spin flex flex-start " />
                        <span className=''>{"En cours de recherche..."}</span>
                    </div>
                ): (
                    <>
                        <Search className='h-4 w-4 mr-2'/>
                        <span>Recherche</span>
                    </>
                )
            }
        </Button>
    </div>
  )
}

export default StatementSearchBar