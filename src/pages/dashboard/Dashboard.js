import React, { useState } from "react"

import { useCollection } from "../../hooks/useCollection"
import { useAuthContext } from "../../hooks/useAuthContext"

import ProjectList from "../../components/ProjectList"
import ProjectFilter from "./ProjectFilter"

import "./Dashboard.css"

export default function Dashboard() {
  const { user } = useAuthContext()

  const { documents, error } = useCollection("projects")
  const [currentFilter, setCurrentFilter] = useState("all")

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter)
  }

  const projects = documents
    ? documents.filter((doc) => {
        if (currentFilter === "all") return true
        if (currentFilter === "mine") {
          let assignedToMe = false
          doc.assignedUsersList.forEach((u) => {
            if (user.uid === u.id) {
              assignedToMe = true
            }
          })
          return assignedToMe
        }
        return currentFilter === doc.category
      })
    : null

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <div className="error">{error}</div>}
      {documents && (
        <ProjectFilter
          currentFilter={currentFilter}
          changeFilter={changeFilter}
        />
      )}
      {projects && <ProjectList projects={projects} />}
    </div>
  )
}
