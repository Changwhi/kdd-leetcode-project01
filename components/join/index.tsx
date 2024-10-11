'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { Input } from "@/components/ui/input"
import { GROUP } from "@/text/group"
import { GroupCard } from "@/components/group/ui/groupCard"
import { MyGroup, otherGroup } from "@/types/group"

interface JoinComponentProps {
  user: any
  otherGroups: otherGroup[] | MyGroup[]
}

/**
 * The join page component, which displays a list of groups that the user is not
 * already a part of, with a search bar to search for groups. If the user is not
 * logged in, it will also display a login message.
 *
 * @param {object} user - The user object, containing the user's email.
 * @param {array} otherGroups - An array of groups that the user is not a part of.
 * @return {ReactElement} The join page component.
 */
export const JoinComponent: React.FC<JoinComponentProps> = ({ user, otherGroups }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredGroups = useMemo(() => {
    return otherGroups.filter(group => 
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      group.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [otherGroups, searchTerm])

  return (
    <section className="w-full py-12 md:py-24 lg:py-20 border-y">
      <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
        <div className="container mx-auto px-4 sm:px-36 ">
          <div>
            <div className="mb-8">
              <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between mb-4 gap-4">
                <h1 className="text-3xl font-bold mb-2">{GROUP.JOIN_GROUP}</h1>
                  <Input
                    placeholder="Search groups..."
                    className="w-full max-w-xl border-black"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
              </div>
              <p className="text-muted-foreground">
                {GROUP.JOIN_PAGE_SUB_TITLE}
              </p>
              {!user && (
                <p className="mt-2 text-muted-foreground">
                  Login to join a new group!
                </p>
              )}
            </div>
            <div className="flex flex-row flex-wrap gap-6">
              {filteredGroups.map((group) => (
                <GroupCard
                  email={user?.email}
                  isMyCard={false}
                  key={group.group_id}
                  name={group.name}
                  description={group.description}
                  group_id={group.group_id}
                />
              ))}
            </div>
            {filteredGroups.length === 0 && (
              <p className="text-center text-muted-foreground mt-8">
                No groups found matching your search.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}