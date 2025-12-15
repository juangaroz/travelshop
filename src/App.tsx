import { useEffect, useState } from "react";
import { Layout } from "./components/layout";
import { LandingPage } from "./pages/landing";
import { LoginPage } from "./pages/login";
import { DashboardPage } from "./pages/dashboard";
import { ResourcesListPageNew } from "./pages/resources-list-new";
import { ResourceDetailPage } from "./pages/resource-detail";
import { ToursListPage } from "./pages/tours-list";
import { TourDetailPageNew } from "./pages/tour-detail-new";
import { ReservationsListPage } from "./pages/reservations-list";
import { ReservationDetailPageNew } from "./pages/reservation-detail-new";
import { TrainingHubPage } from "./pages/training-hub";
import { TrainingVideoPage } from "./pages/training-video";
import { BookingFormPage } from "./pages/booking-form";
import { Toaster } from "./components/ui/sonner";
import { supabase } from "./lib/supabase";

type Page =
  | "landing"
  | "login"
  | "dashboard"
  | "resources"
  | "resource-detail"
  | "tours"
  | "tour-detail"
  | "bookings"
  | "booking-detail"
  | "booking-form"
  | "training-hub"
  | "training-video";

const PUBLIC_PAGES: Page[] = ["landing", "login"];

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("landing");
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleNavigate = (page: string, id?: string) => {
    setCurrentPage(page as Page);
    setSelectedId(id);
    window.scrollTo(0, 0);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // 1) Inicializa sesión + listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setIsLoggedIn(!!data.session);
      setIsAuthReady(true);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  // 2) Protege páginas privadas (pero NO cambia landing por login)
  useEffect(() => {
    if (!isAuthReady) return;

    const isPublic = PUBLIC_PAGES.includes(currentPage);

    // Si no hay sesión y están intentando ver una página privada -> login
    if (!isLoggedIn && !isPublic) {
      setCurrentPage("login");
      return;
    }

    // Si ya hay sesión y se quedan en login -> dashboard (para evitar login innecesario)
    if (isLoggedIn && currentPage === "login") {
      setCurrentPage("dashboard");
    }
  }, [isAuthReady, isLoggedIn, currentPage]);

  // Mientras carga auth, muestra landing (tu requisito)
  if (!isAuthReady) {
    return <LandingPage onNavigate={handleNavigate} />;
  }

  // Landing y Login sin layout
  if (currentPage === "landing") {
    return <LandingPage onNavigate={handleNavigate} />;
  }

  if (currentPage === "login") {
    return <LoginPage onNavigate={handleNavigate} />;
  }

  // El resto con layout
  return (
    <>
      <Layout currentPage={currentPage} onNavigate={handleNavigate} onSearch={handleSearch}>
        {currentPage === "dashboard" && <DashboardPage onNavigate={handleNavigate} />}
        {currentPage === "resources" && <ResourcesListPageNew onNavigate={handleNavigate} />}
        {currentPage === "resource-detail" && (
          <ResourceDetailPage resourceId={selectedId} onNavigate={handleNavigate} />
        )}
        {currentPage === "tours" && (
          <ToursListPage onNavigate={handleNavigate} searchQuery={searchQuery} />
        )}
        {currentPage === "tour-detail" && (
          <TourDetailPageNew tourId={selectedId} onNavigate={handleNavigate} />
        )}
        {currentPage === "bookings" && <ReservationsListPage onNavigate={handleNavigate} />}
        {currentPage === "booking-detail" && (
          <ReservationDetailPageNew reservationId={selectedId} onNavigate={handleNavigate} />
        )}
        {currentPage === "booking-form" && (
          <BookingFormPage tourId={selectedId} onNavigate={handleNavigate} />
        )}
        {currentPage === "training-hub" && <TrainingHubPage onNavigate={handleNavigate} />}
        {currentPage === "training-video" && (
          <TrainingVideoPage videoId={selectedId} onNavigate={handleNavigate} />
        )}
      </Layout>
      <Toaster />
    </>
  );
}
