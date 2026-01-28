import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { logout, getCurrentUser, isAuthenticated } from "@/lib/auth";
import { BarChart3, LogOut, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

export const Navbar = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const authenticated = isAuthenticated();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  const toggleDropdown = (name: string) => {
    setOpenDropdown((current) => (current === name ? null : name));
  };

  const closeAll = () => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    closeAll();
  };

  useEffect(() => {
    function handleDocumentClick(e: MouseEvent) {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  const showAdmin = authenticated && user?.email === "admin@gmail.com";

  const onNavigate = (cb?: () => void) => {
    closeAll();
    if (cb) cb();
  };

  return (
    <nav
      ref={navRef}
      className="
        fixed top-0 left-0 right-0 z-50
        bg-white/10 backdrop-blur-2xl
        border-b border-white/10
        shadow-lg text-white
      "
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <Link
            to={authenticated ? "/home" : "/"}
            onClick={() => onNavigate()}
            className="flex items-center gap-2 text-xl font-bold"
          >
            <BarChart3 className="text-white" size={26} />
            <span className="bg-gradient-to-r from-white to-white/70 
              bg-clip-text text-transparent tracking-wide">
              Global Insights
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8 text-white">

            {/* TOP DROPDOWN MENUS */}
            {[
              {
                label: "Data Explorer",
                key: "data",
                links: [
                  ["Overview Dashboard", "/data-explorer/overview"],
                  ["Global Heatmap", "/data-explorer/global-heatmap"],
                  ["Trend & Time Analysis", "/data-explorer/trend-time"],
                  ["Variable Correlations", "/data-explorer/correlations"],
                  ["Upload & Merge Data", "/data-explorer/upload-merge"],
                ],
              },
              {
                label: "Country Profiles",
                key: "country",
                links: [
                  ["Country Overview", "/country-profile/overview"],
                  ["Regional Comparison", "/country-profile/regional-comparison"],
                  ["Country Trends", "/country-profile/country-trends"],
                  ["Policy Insights", "/country-profile/policy-insights"],
                ],
              },
              {
                label: "Compare Countries",
                key: "compare",
                links: [
                  ["Compare Metrics", "/compare-countries/metrics"],
                  ["Multi Timeline", "/compare-countries/multi-timeline"],
                  ["Metric Summary", "/compare-countries/summary"],
                ],
              },
              {
                label: "Insights",
                key: "insights",
                links: [
                  ["Mobility Timeline", "/insights/mobility-timeline"],
                  ["Opportunity Calculator", "/insights/opportunity-calculator"],
                  ["Policy Impact Simulator", "/insights/policy-impact"],
                  ["Factor Breakdown", "/insights/factor-breakdown"],
                ],
              },
              {
                label: "Research",
                key: "research",
                links: [
                  ["Datasets", "/research/datasets"],
                  ["Case Studies", "/research/case-studies"],
                  ["Publications / Reports", "/research/publications"],
                  ["Data Dictionary", "/research/data-dictionary"],
                ],
              },
            ].map((menu) => (
              <div className="relative" key={menu.key}>

                {/* CLEAN LABEL — NO ARROW */}
                <span
                  onClick={() => toggleDropdown(menu.key)}
                  className="
                    cursor-pointer whitespace-nowrap
                    hover:text-white/80 transition
                  "
                >
                  {menu.label}
                </span>

                {/* DROPDOWN */}
                {openDropdown === menu.key && (
                  <div
                    className="
                      absolute left-0 mt-2 w-60
                      bg-black/90 text-white
                      backdrop-blur-2xl
                      border border-white/10
                      rounded-xl shadow-xl p-2
                    "
                  >
                    {menu.links.map(([label, path]) => (
                      <NavLink
                        key={path}
                        to={path}
                        onClick={() => onNavigate()}
                        className="
                          block px-3 py-2 rounded-lg 
                          hover:bg-white/15 transition
                        "
                      >
                        {label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* SIMPLE LINKS */}
            <NavLink to="/timeline" onClick={() => onNavigate()} className="hover:text-white/80">
              Timeline
            </NavLink>

            <NavLink to="/contact" onClick={() => onNavigate()} className="hover:text-white/80">
              Contact
            </NavLink>

            {showAdmin && (
              <NavLink to="/admin" onClick={() => onNavigate()} className="hover:text-white/80">
                Admin
              </NavLink>
            )}

            {/* THEME TOGGLE */}
            <ThemeToggle />

            {/* USER PANEL */}
            {authenticated && (
              <div className="flex items-center gap-4">
                <span className="text-sm text-white/80">
                  Welcome, {user?.name || user?.email}
                </span>

                <Button
                  onClick={handleLogout}
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white rounded-xl px-4"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </Button>
              </div>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen((s) => !s)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/10 p-4">
          <div className="flex flex-col gap-3 text-white">

            {[
              "/data-explorer/overview",
              "/country-profile/overview",
              "/compare-countries/metrics",
              "/insights/mobility-timeline",
              "/research/datasets",
              "/timeline",
              "/contact",
            ].map((path) => (
              <Link key={path} to={path} onClick={() => onNavigate()}>
                {path.split("/")[1].replace("-", " ")}
              </Link>
            ))}

            {showAdmin && (
              <Link to="/admin" onClick={() => onNavigate()}>
                Admin
              </Link>
            )}

            {authenticated && (
              <Button
                onClick={handleLogout}
                className="mt-2 bg-white/20 hover:bg-white/30 text-white rounded-xl"
                size="sm"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
