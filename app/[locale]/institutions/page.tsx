"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Search,
  MapPin,
  ChevronRight,
  ExternalLink,
  GraduationCap,
  Users,
  Briefcase,
  Loader2,
} from "lucide-react";

import { getInstitutions } from "@/lib/actions";

const categories = [
  { id: "public", label: "Public", icon: Building2, color: "#0ea5e9" },
  { id: "ngo", label: "ONGs & OSCs", icon: Users, color: "#10b981" },
  { id: "private", label: "Bureaux d\u2019\u00e9tudes", icon: Briefcase, color: "#f59e0b" },
  { id: "edu", label: "Enseignement", icon: GraduationCap, color: "#8b5cf6" },
];

function getCategoryColor(tabId: string): string {
  const cat = categories.find((c) => c.id === tabId);
  return cat ? cat.color : "#0ea5e9";
}

export default function InstitutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [institutions, setInstitutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("public");
  const [search, setSearch] = useState("");
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isFR = locale === "fr";

  useEffect(() => {
    async function loadData() {
      const data = await getInstitutions();
      setInstitutions(data || []);
      setLoading(false);
    }
    loadData();
  }, []);

  const filteredData = useMemo(() => {
    return institutions.filter((inst) => {
      const matchesTab =
        inst.category === activeTab ||
        (activeTab === "public" && !inst.category);
      const q = search.toLowerCase();
      const matchesSearch =
        (inst.nom || "").toLowerCase().includes(q) ||
        (inst.sigle || "").toLowerCase().includes(q) ||
        (inst.siege || "").toLowerCase().includes(q);
      return matchesTab && matchesSearch;
    });
  }, [institutions, activeTab, search]);

  const catColor = getCategoryColor(activeTab);

  return (
    <div className="pb-20">
      {/* PAGE HERO */}
      <div className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="expert-badge mb-4">
              {isFR ? "Acteurs du Secteur" : "Sector Actors"}
            </span>
            <h1 className="page-title">
              {isFR
                ? "R\u00e9pertoire des Institutions"
                : "Institutional Directory"}
            </h1>
            <p className="page-subtitle">
              {isFR
                ? "Retrouvez les minist\u00e8res, ONG, bureaux d\u2019\u00e9tudes et organismes internationaux qui fa\u00e7onnent le secteur de l\u2019eau au Cameroun."
                : "Find the ministries, NGOs, consulting firms and international organizations shaping the water sector in Cameroon."}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container">
        <div
          className="institutions-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "280px 1fr",
            gap: "40px",
          }}
        >
          {/* SIDEBAR TABS */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <h3
              style={{
                fontSize: "14px",
                fontWeight: 700,
                textTransform: "uppercase",
                color: "#64748b",
                letterSpacing: "1px",
                marginBottom: "10px",
                paddingLeft: "8px",
              }}
            >
              {isFR ? "Cat\u00e9gories" : "Categories"}
            </h3>
            {categories.map((cat) => {
              const isActive = activeTab === cat.id;
              const CatIcon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "16px",
                    borderRadius: "12px",
                    border: "1px solid",
                    borderColor: isActive ? "#0a5694" : "#e8ecf0",
                    backgroundColor: isActive ? "#0a5694" : "#fff",
                    color: isActive ? "#fff" : "#1e293b",
                    fontWeight: 700,
                    fontSize: "14px",
                    textAlign: "left" as const,
                    transition: "all 0.2s",
                    cursor: "pointer",
                  }}
                >
                  <CatIcon size={18} />
                  {cat.label}
                  {isActive && (
                    <ChevronRight
                      size={16}
                      style={{ marginLeft: "auto" }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* CONTENT AREA */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            {/* Search */}
            <div style={{ position: "relative" }}>
              <Search
                style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#64748b",
                }}
                size={18}
              />
              <input
                type="text"
                placeholder={
                  isFR
                    ? "Rechercher une institution..."
                    : "Search for an institution..."
                }
                className="search-input"
                style={{
                  width: "100%",
                  padding: "14px 14px 14px 48px",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  backgroundColor: "#fff",
                  fontSize: "15px",
                  outline: "none",
                  transition: "all 0.2s",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Grid */}
            {loading ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "80px 0",
                  gap: "16px",
                }}
              >
                <Loader2
                  className="animate-spin"
                  size={40}
                  color="#0a5694"
                />
                <p style={{ color: "#64748b" }}>
                  {isFR ? "Chargement..." : "Loading..."}
                </p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "16px",
                  }}
                >
                  {filteredData.map((inst, i) => (
                    <div
                      key={inst.id || i}
                      className="premium-card"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "24px",
                        padding: "24px 32px",
                        cursor: "default",
                      }}
                    >
                      <div
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "16px",
                          backgroundColor: catColor + "18",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: catColor,
                          flexShrink: 0,
                        }}
                      >
                        <Building2 size={26} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            marginBottom: "4px",
                          }}
                        >
                          <h3
                            style={{
                              fontSize: "18px",
                              fontWeight: 800,
                              color: "#0f172a",
                              margin: 0,
                            }}
                          >
                            {inst.nom}
                          </h3>
                          {inst.sigle && (
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: 800,
                                backgroundColor: "#f1f5f9",
                                color: "#64748b",
                                padding: "2px 8px",
                                borderRadius: "6px",
                              }}
                            >
                              {inst.sigle}
                            </span>
                          )}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            fontSize: "13px",
                            color: "#64748b",
                            fontWeight: 500,
                          }}
                        >
                          <MapPin size={14} color="#0a5694" />
                          {inst.siege || inst.city || "Cameroun"}
                        </div>
                        <p
                          style={{
                            fontSize: "14px",
                            color: "#4b5563",
                            marginTop: "12px",
                            lineHeight: 1.6,
                          }}
                        >
                          {inst.mandat || inst.mission}
                        </p>
                      </div>
                      {inst.site && (
                        <a
                          href={inst.site}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            width: "44px",
                            height: "44px",
                            borderRadius: "12px",
                            backgroundColor: "#f1f5f9",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#0a5694",
                            transition: "all 0.2s",
                            flexShrink: 0,
                          }}
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  ))}

                  {filteredData.length === 0 && (
                    <div
                      style={{ textAlign: "center", padding: "60px 0" }}
                    >
                      <p
                        style={{
                          color: "#64748b",
                          fontSize: "15px",
                        }}
                      >
                        {isFR
                          ? "Aucune institution trouv\u00e9e dans cette cat\u00e9gorie."
                          : "No institutions found in this category."}
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
