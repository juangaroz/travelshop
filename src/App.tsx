import { useState } from "react";
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
import { RequireRole } from "./components/auth/RequireRole";

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

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("landing");
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState("");

  const handleNavigate = (page: string, id?: string) => {
    setCurrentPage(page as Page);
    setSelectedId(id);
    window.scrollTo(0, 0);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Landing y Login sin layout
  if (currentPage === "landing") {
    return <LandingPage onNavigate={handleNavigate} />;
  }

  if (currentPage === "login") {
    return <LoginPage onNavigate={handleNavigate} />;
  }

  return (
    <>
      <Layout
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onSearch={handleSearch}
      >
        {/* ADMIN ONLY */}
        {currentPage === "dashboard" && (
          <RequireRole role="admin" onDeny={() => handleNavigate("tours")}>
            <DashboardPage onNavigate={handleNavigate} />
          </RequireRole>
        )}

        {/* SHARED */}
        {currentPage === "tours" && (
          <ToursListPage
            onNavigate={handleNavigate}
            searchQuery={searchQuery}
          />
        )}

        {currentPage === "tour-detail" && (
          <TourDetailPageNew
            tourId={selectedId}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === "booking-form" && (
          <BookingFormPage
            tourId={selectedId}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === "bookings" && (
          <ReservationsListPage onNavigate={handleNavigate} />
        )}

        {currentPage === "booking-detail" && (
          <ReservationDetailPageNew
            reservationId={selectedId}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === "training-hub" && (
          <TrainingHubPage onNavigate={handleNavigate} />
        )}

        {currentPage === "training-video" && (
          <TrainingVideoPage
            videoId={selectedId}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === "resources" && (
          <ResourcesListPageNew onNavigate={handleNavigate} />
        )}

        {currentPage === "resource-detail" && (
          <ResourceDetailPage
            resourceId={selectedId}
            onNavigate={handleNavigate}
          />
        )}
      </Layout>

      <Toaster />
    </>
  );
}