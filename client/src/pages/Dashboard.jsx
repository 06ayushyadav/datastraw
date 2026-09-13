import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Ticket,
  CircleDot,
  Clock3,
  CheckCircle2,
  Plus,
  RefreshCw,
} from "lucide-react";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import StatusFilter from "../components/StatusFilter";
import TicketTable from "../components/TicketTable";
import Loading from "../components/Loading";

import { getTickets } from "../services/ticketService";

function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [priority, setPriority] = useState("");

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [total, setTotal] = useState(0);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getTickets({
        search,
        status,
        page,
        limit,
        priority
      });

      setTickets(data.tickets || []);

      setTotal(data.total || 0);

      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Fetch tickets error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load tickets"
      );

      setTickets([]);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    setPage(1);
  }, [search, status,priority]);

 
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTickets();
    }, 300);

    return () => clearTimeout(timer);
  }, [search, status, page]);

  const openCount = tickets.filter(
    (ticket) => ticket.status === "Open"
  ).length;

  const progressCount = tickets.filter(
    (ticket) => ticket.status === "In Progress"
  ).length;

  const closedCount = tickets.filter(
    (ticket) => ticket.status === "Closed"
  ).length;

  const handleRetry = () => {
    fetchTickets();
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}

        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <div>
            <p className="mb-1 text-sm font-medium text-slate-500">
              Customer Support
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Ticket Dashboard
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Manage and track customer support requests.
            </p>
          </div>

          <Link
            to="/tickets/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            <Plus className="text-white" size={18}  />
            <span className="text-white">Create Ticket</span>
          </Link>

        </div>


        {/* Stats */}

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            title="Total Tickets"
            value={total}
            icon={<Ticket size={20} />}
          />

          <StatCard
            title="Open"
            value={openCount}
            icon={<CircleDot size={20} />}
          />

          <StatCard
            title="In Progress"
            value={progressCount}
            icon={<Clock3 size={20} />}
          />

          <StatCard
            title="Closed"
            value={closedCount}
            icon={<CheckCircle2 size={20} />}
          />

        </div>


        <div className="mb-5 flex flex-col gap-3 sm:flex-row">

          <div className="flex-1">
            <SearchBar
              value={search}
              onChange={setSearch}
              onClear={() => setSearch("")}
            />
          </div>

          <StatusFilter
            value={status}
            onChange={setStatus}
          />

        </div>


        {/* Error */}

        {error && (
          <div className="mb-5 flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-sm font-semibold text-red-800">
                Something went wrong
              </p>

              <p className="mt-1 text-sm text-red-700">
                {error}
              </p>
            </div>

            <button
              onClick={handleRetry}
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50"
            >
              <RefreshCw size={15} />
              Retry
            </button>

          </div>
        )}


        {/* Tickets */}

        {loading ? (
          <Loading />
        ) : tickets.length > 0 ? (
          <>
            <TicketTable
              tickets={tickets}
            />

            {/* Pagination */}

            {totalPages > 1 && (
              <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">

                <p className="text-sm text-slate-500">
                  Page{" "}
                  <span className="font-semibold text-slate-800">
                    {page}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-slate-800">
                    {totalPages}
                  </span>
                </p>

                <div className="flex gap-2">

                  <button
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Previous
                  </button>

                  <button
                    onClick={handleNextPage}
                    disabled={page === totalPages}
                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>

                </div>

              </div>
            )}
          </>
        ) : (
          /* Empty State */

          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <Ticket size={26} />
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900">
              No tickets found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              {search || status
                ? "Try changing your search or filter to find tickets."
                : "There are no support tickets yet. Create your first ticket to get started."}
            </p>

            {!search && !status && (
              <Link
                to="/tickets/new"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                <Plus size={18} />
                Create Ticket
              </Link>
            )}

          </div>
        )}

      </main>
    </div>
  );
}


function StatCard({
  title,
  value,
  icon,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">

      <div className="mb-4 flex items-center justify-between">

        <p className="text-sm font-medium text-slate-500">
          {title}
        </p>

        <div className="rounded-xl bg-slate-100 p-2.5 text-slate-700">
          {icon}
        </div>

      </div>

      <p className="text-3xl font-bold text-slate-900">
        {value}
      </p>

    </div>
  );
}

export default Dashboard;

