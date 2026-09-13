
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    User,
    Mail,
    Calendar,
    Clock,
    MessageSquare,
    Save,
    Ticket as TicketIcon,
} from "lucide-react";
import toast from "react-hot-toast";

import {
    getTicketById,
    updateTicket,
} from "../services/ticketService";

const STATUS_OPTIONS = [
    "Open",
    "In Progress",
    "Closed",
];

const getStatusClasses = (status) => {
    switch (status) {
        case "Open":
            return "bg-green-100 text-green-700";

        case "In Progress":
            return "bg-yellow-100 text-yellow-700";

        case "Closed":
            return "bg-slate-200 text-slate-700";

        default:
            return "bg-slate-100 text-slate-600";
    }
};

const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
    });
};

const TicketDetails = () => {
    const { ticketId } = useParams();
    const navigate = useNavigate();

    const [ticket, setTicket] = useState(null);
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [note, setNote] = useState("");

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    const fetchTicket = async () => {
        try {
            setLoading(true);

            const response = await getTicketById(ticketId);

            setTicket(response.ticket);
            setStatus(response.ticket.status);
            setPriority(response.ticket.priority || "Medium");
        } catch (error) {
            console.error("Fetch ticket error:", error);

            const message =
                error.response?.data?.message ||
                "Failed to load ticket";

            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTicket();
    }, [ticketId]);

    const handleUpdate = async () => {
        if (!status) {
            toast.error("Please select a status");
            return;
        }

        if (!note.trim() && status === ticket.status) {
            toast.error("Make a change before updating");
            return;
        }

        try {
            setUpdating(true);

            const payload = {
                status,
                priority
            };

            if (note.trim()) {
                payload.notes = note.trim();
            }

            await updateTicket(ticketId, payload);

            toast.success("Ticket updated successfully");

            setNote("");

            await fetchTicket();
        } catch (error) {
            console.error("Update ticket error:", error);

            const message =
                error.response?.data?.message ||
                "Failed to update ticket";

            toast.error(message);
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

                    <p className="text-sm text-slate-500">
                        Loading ticket...
                    </p>
                </div>
            </div>
        );
    }

    if (!ticket) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-slate-900">
                        Ticket not found
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        The requested ticket could not be found.
                    </p>

                    <button
                        onClick={() => navigate("/")}
                        className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                        Back to Tickets
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-8">
            <div className="mx-auto max-w-5xl">

                {/* Back Button */}
                <button
                    onClick={() => navigate("/")}
                    className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
                >
                    <ArrowLeft size={18} />
                    Back to Tickets
                </button>

                {/* Header */}
                <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                        <div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                                    <TicketIcon size={22} />
                                </div>

                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                        Ticket
                                    </p>

                                    <h1 className="text-xl font-bold text-slate-900">
                                        {ticket.ticket_id}
                                    </h1>
                                </div>
                            </div>

                            <h2 className="mt-5 text-2xl font-bold text-slate-900">
                                {ticket.subject}
                            </h2>
                        </div>

                        <span
                            className={`w-fit rounded-full px-4 py-2 text-sm font-semibold ${getStatusClasses(
                                ticket.status
                            )}`}
                        >
                            {ticket.status}
                        </span>

                    </div>

                    {/* Meta */}
                    <div className="mt-6 grid gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2 lg:grid-cols-4">

                        <div className="flex items-center gap-3">
                            <User className="text-slate-400" size={18} />

                            <div>
                                <p className="text-xs text-slate-400">
                                    Customer
                                </p>

                                <p className="text-sm font-medium text-slate-800">
                                    {ticket.customer_name}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Mail className="text-slate-400" size={18} />

                            <div className="min-w-0">
                                <p className="text-xs text-slate-400">
                                    Email
                                </p>

                                <p className="truncate text-sm font-medium text-slate-800">
                                    {ticket.customer_email}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Calendar className="text-slate-400" size={18} />

                            <div>
                                <p className="text-xs text-slate-400">
                                    Created
                                </p>

                                <p className="text-sm font-medium text-slate-800">
                                    {formatDate(ticket.createdAt || ticket.created_at)}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Clock className="text-slate-400" size={18} />

                            <div>
                                <p className="text-xs text-slate-400">
                                    Last Updated
                                </p>

                                <p className="text-sm font-medium text-slate-800">
                                    {formatDate(ticket.updatedAt || ticket.updated_at)}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Main Content */}
                <div className="grid gap-6 lg:grid-cols-3">

                    {/* Ticket Description */}
                    <div className="lg:col-span-2">
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="mb-5 flex items-center gap-2">
                                <MessageSquare
                                    size={19}
                                    className="text-blue-600"
                                />

                                <h3 className="text-lg font-bold text-slate-900">
                                    Issue Description
                                </h3>
                            </div>

                            <div className="rounded-xl bg-slate-50 p-5">
                                <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
                                    {ticket.description}
                                </p>
                            </div>

                        </div>

                        {/* Notes */}
                        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="mb-5 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <MessageSquare
                                        size={19}
                                        className="text-blue-600"
                                    />

                                    <h3 className="text-lg font-bold text-slate-900">
                                        Notes & Comments
                                    </h3>
                                </div>

                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                                    {ticket.notes?.length || 0}
                                </span>
                            </div>

                            {ticket.notes?.length > 0 ? (
                                <div className="space-y-4">
                                    {ticket.notes.map((item) => (
                                        <div
                                            key={item._id}
                                            className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                                        >
                                            <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
                                                {item.note_text}
                                            </p>

                                            <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                                                <Clock size={14} />

                                                {formatDate(
                                                    item.createdAt || item.created_at
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center">
                                    <MessageSquare
                                        size={28}
                                        className="mx-auto text-slate-300"
                                    />

                                    <p className="mt-3 text-sm text-slate-500">
                                        No notes have been added yet.
                                    </p>
                                </div>
                            )}

                        </div>
                    </div>

                    {/* Update Panel */}
                    <div>
                        <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                            <h3 className="text-lg font-bold text-slate-900">
                                Update Ticket
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                                Change status or add a note.
                            </p>

                            {/* Status */}
                            <div className="mt-6">
                                <label
                                    htmlFor="status"
                                    className="mb-2 block text-sm font-medium text-slate-700"
                                >
                                    Status
                                </label>

                                <select
                                    id="status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                >
                                    {STATUS_OPTIONS.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mt-5">
                                <label
                                    htmlFor="priority"
                                    className="mb-2 block text-sm font-medium text-slate-700"
                                >
                                    Priority
                                </label>

                                <select
                                    id="priority"
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                    <option value="Urgent">Urgent</option>
                                </select>
                            </div>

                            {/* Note */}
                            <div className="mt-5">
                                <label
                                    htmlFor="note"
                                    className="mb-2 block text-sm font-medium text-slate-700"
                                >
                                    Add Note
                                </label>

                                <textarea
                                    id="note"
                                    rows={6}
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    maxLength={2000}
                                    placeholder="Write a note or comment..."
                                    className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />

                                <p className="mt-1 text-right text-xs text-slate-400">
                                    {note.length}/2000
                                </p>
                            </div>

                            {/* Update */}
                            <button
                                onClick={handleUpdate}
                                disabled={updating}
                                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <Save size={17} />

                                {updating ? "Updating..." : "Update Ticket"}
                            </button>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TicketDetails;

